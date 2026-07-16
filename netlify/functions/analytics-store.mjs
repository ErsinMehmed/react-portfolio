import { getStore } from "@netlify/blobs";

// Shared persistence for the private /stats dashboard. Netlify Blobs is part of
// the free plan, so this needs no third-party analytics service.
//
// One blob per event (never one growing JSON): writes are then atomic and two
// concurrent visitors can't clobber each other via read-modify-write. Keys are
// namespaced by kind and day — `ev/2026-07-16/<ts>-<rand>.json` — so the
// dashboard can list days cheaply and read exactly one day at a time.
const STORE_NAME = "analytics";

/** Days of history kept; older blobs are swept on dashboard load. */
export const RETENTION_DAYS = 90;

export const KIND = { event: "ev", qa: "qa" };

// Blobs only resolves against a real Netlify runtime. The Vite dev middleware
// has none, so fall back to an in-memory map there: local dev keeps working and
// the data simply doesn't outlive the process.
const memory = new Map();

const store = () => {
  try {
    return getStore(STORE_NAME);
  } catch {
    return null;
  }
};

export const dayOf = (date = new Date()) => date.toISOString().slice(0, 10);

const rand = () => Math.random().toString(36).slice(2, 10);

/** Append one record. Never throws — analytics must not break a live request. */
export const putRecord = async (kind, data) => {
  try {
    const now = new Date();
    const key = `${kind}/${dayOf(now)}/${now.getTime()}-${rand()}.json`;
    const record = { ts: now.toISOString(), ...data };

    const s = store();
    if (!s) {
      memory.set(key, record);
      return;
    }
    await s.setJSON(key, record);
  } catch {
    /* dropping a metric is always better than failing the request */
  }
};

const allKeys = async (kind) => {
  const s = store();
  if (!s) {
    return [...memory.keys()].filter((k) => k.startsWith(`${kind}/`));
  }
  const { blobs } = await s.list({ prefix: `${kind}/` });
  return blobs.map((b) => b.key);
};

/** Day part of a `kind/day/file` key. */
const keyDay = (key) => key.split("/")[1] ?? "";

/** Every day that has data for `kind`, newest first. */
export const listDays = async (kind) => {
  const keys = await allKeys(kind);
  return [...new Set(keys.map(keyDay))].filter(Boolean).sort().reverse();
};

/** All records for one kind on one day, oldest first. */
export const readDay = async (kind, day) => {
  const keys = (await allKeys(kind)).filter((k) => keyDay(k) === day);
  const s = store();

  const records = await Promise.all(
    keys.map(async (key) => {
      try {
        return s ? await s.get(key, { type: "json" }) : memory.get(key);
      } catch {
        return null;
      }
    })
  );

  return records
    .filter(Boolean)
    .sort((a, b) => String(a.ts).localeCompare(String(b.ts)));
};

/** Total record count per day, for the dashboard's day index. */
export const countsByDay = async (kind) => {
  const keys = await allKeys(kind);
  const counts = {};
  for (const key of keys) {
    const day = keyDay(key);
    if (day) counts[day] = (counts[day] ?? 0) + 1;
  }
  return counts;
};

/** Drop anything past the retention window. Called on dashboard load. */
export const pruneExpired = async () => {
  const cutoff = dayOf(new Date(Date.now() - RETENTION_DAYS * 86_400_000));
  const s = store();

  for (const kind of Object.values(KIND)) {
    const keys = await allKeys(kind);
    const stale = keys.filter((k) => keyDay(k) < cutoff);
    for (const key of stale) {
      try {
        if (s) await s.delete(key);
        else memory.delete(key);
      } catch {
        /* best effort */
      }
    }
  }
};
