import { createHash, timingSafeEqual } from "node:crypto";
import {
  KIND,
  listDays,
  readDay,
  countsByDay,
  pruneExpired,
  RETENTION_DAYS,
  dayOf,
} from "./analytics-store.mjs";

// Private analytics dashboard, served straight from this function at /stats
// (see the rewrite in netlify.toml). It is deliberately NOT a React route: the
// HTML only exists after the credential check, so nothing about it ships in the
// public bundle. Rendered server-side with no inline <script>, which keeps it
// inside the site's strict CSP.

const REF_LABELS = {
  "cv-devbg": "CV on dev.bg",
  "cv-jobsbg": "CV on jobs.bg",
  cv: "CV (direct copy)",
  linkedin: "LinkedIn",
  github: "GitHub",
  email: "Email signature",
  qr: "Phone QR code",
};

const EVENT_LABELS = {
  cv_download: "CV downloaded",
  askcv_open: "Opened “Ask about me”",
  case_study_open: "Opened a case study",
  project_open: "Opened a project",
  copy_email: "Copied the email",
  lang_switch: "Switched language",
  theme_switch: "Switched theme",
};

/* ---- auth ---- */

const digest = (value) => createHash("sha256").update(String(value)).digest();

// Hashing first makes both sides the same length, so timingSafeEqual can do its
// job without leaking the credential length via an early throw.
const safeEqual = (a, b) => timingSafeEqual(digest(a), digest(b));

const isAuthed = (req) => {
  const user = process.env.STATS_USER;
  const pass = process.env.STATS_PASS;
  // Unset credentials mean locked, never open.
  if (!user || !pass) return false;

  const [scheme, encoded] = (req.headers.get("authorization") ?? "").split(" ");
  if (scheme !== "Basic" || !encoded) return false;

  let decoded;
  try {
    decoded = Buffer.from(encoded, "base64").toString("utf8");
  } catch {
    return false;
  }

  const sep = decoded.indexOf(":");
  if (sep === -1) return false;

  return (
    safeEqual(decoded.slice(0, sep), user) && safeEqual(decoded.slice(sep + 1), pass)
  );
};

const PRIVATE_HEADERS = {
  "Cache-Control": "no-store, max-age=0",
  "X-Robots-Tag": "noindex, nofollow, noarchive",
};

const unauthorized = () =>
  new Response("Authentication required.", {
    status: 401,
    headers: {
      ...PRIVATE_HEADERS,
      "WWW-Authenticate": 'Basic realm="stats", charset="UTF-8"',
      "Content-Type": "text/plain; charset=utf-8",
    },
  });

/* ---- helpers ---- */

const ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (c) => ESCAPES[c]);

/** Count occurrences of `pick(row)`, most frequent first. */
const tally = (rows, pick) => {
  const counts = new Map();
  for (const row of rows) {
    const value = pick(row);
    if (value) counts.set(value, (counts.get(value) ?? 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1]);
};

const time = (ts) => String(ts ?? "").slice(11, 19);

const table = (title, rows, label = (k) => k) => {
  if (!rows.length) return `<section><h2>${esc(title)}</h2><p class="empty">No data.</p></section>`;
  const body = rows
    .map(
      ([key, count]) =>
        `<tr><td>${esc(label(key))}</td><td class="num">${count}</td></tr>`
    )
    .join("");
  return `<section><h2>${esc(title)}</h2><table>${body}</table></section>`;
};

const STYLE = `
:root{color-scheme:light dark;--bg:#0f172a;--card:#1e293b;--line:#334155;--text:#e2e8f0;--muted:#94a3b8;--brand:#60a5fa}
*{box-sizing:border-box}
body{margin:0;padding:24px;background:var(--bg);color:var(--text);font:14px/1.5 ui-sans-serif,system-ui,sans-serif}
h1{margin:0;font-size:20px}
h2{margin:0 0 10px;font-size:13px;text-transform:uppercase;letter-spacing:.06em;color:var(--muted)}
a{color:var(--brand)}
header{display:flex;flex-wrap:wrap;gap:12px;align-items:baseline;justify-content:space-between;margin-bottom:18px}
.note{color:var(--muted);font-size:12px}
.days{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:20px}
.days a{display:inline-block;padding:4px 9px;border:1px solid var(--line);border-radius:999px;text-decoration:none;font-variant-numeric:tabular-nums}
.days a.on{background:var(--brand);border-color:var(--brand);color:#0b1220;font-weight:600}
.grid{display:grid;gap:14px;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));margin-bottom:22px}
.kpi{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:14px}
.kpi b{display:block;font-size:26px;font-variant-numeric:tabular-nums}
.kpi span{color:var(--muted);font-size:12px}
.cols{display:grid;gap:14px;grid-template-columns:repeat(auto-fit,minmax(260px,1fr))}
section{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:14px;margin-bottom:14px}
table{width:100%;border-collapse:collapse}
td{padding:5px 0;border-bottom:1px solid var(--line);vertical-align:top}
tr:last-child td{border-bottom:0}
.num{text-align:right;color:var(--muted);font-variant-numeric:tabular-nums;width:60px}
.empty{color:var(--muted);margin:0}
.qa{border-bottom:1px solid var(--line);padding:12px 0}
.qa:last-child{border-bottom:0}
.qa .meta{color:var(--muted);font-size:11px;margin-bottom:4px}
.qa .q{font-weight:600;margin:0 0 6px}
.qa .a{margin:0;color:var(--muted);white-space:pre-wrap}
`;

/* ---- render ---- */

const render = ({ day, days, dayCounts, events, qa }) => {
  const pageviews = events.filter((e) => e.type === "pageview");
  const visits = new Set(pageviews.map((e) => e.sid).filter(Boolean)).size;
  const actions = events.filter((e) => e.type !== "pageview");

  const dayLinks = days
    .map(
      (d) =>
        `<a class="${d === day ? "on" : ""}" href="?day=${esc(d)}">${esc(d)} <span class="note">${
          dayCounts[d] ?? 0
        }</span></a>`
    )
    .join("");

  const qaList = qa.length
    ? qa
        .map(
          (r) => `<div class="qa">
            <div class="meta">${esc(time(r.ts))} · ${esc(r.mode ?? "ask")} · ${esc(
              r.lang ?? ""
            )}${r.country ? ` · ${esc(r.country)}` : ""}</div>
            <p class="q">${esc(r.question)}</p>
            <p class="a">${esc(r.answer)}</p>
          </div>`
        )
        .join("")
    : '<p class="empty">No questions this day.</p>';

  return `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>Stats · ${esc(day)}</title>
<style>${STYLE}</style>
</head><body>
<header>
  <h1>Site stats</h1>
  <p class="note">Day ${esc(day)} · kept ${RETENTION_DAYS} days · no IPs stored</p>
</header>

<nav class="days">${dayLinks || '<span class="note">No data yet.</span>'}</nav>

<div class="grid">
  <div class="kpi"><b>${visits}</b><span>Visits (unique tabs)</span></div>
  <div class="kpi"><b>${pageviews.length}</b><span>Pageviews</span></div>
  <div class="kpi"><b>${actions.length}</b><span>Actions</span></div>
  <div class="kpi"><b>${qa.length}</b><span>AI questions</span></div>
</div>

<div class="cols">
  ${table("Came from (ref link)", tally(pageviews, (e) => e.ref), (k) => REF_LABELS[k] ?? k)}
  ${table("Referrer", tally(pageviews, (e) => e.referrer))}
  ${table("Country", tally(events, (e) => e.country))}
  ${table("Pages", tally(pageviews, (e) => e.path))}
  ${table("Actions", tally(actions, (e) => e.type), (k) => EVENT_LABELS[k] ?? k)}
  ${table("Campaign (utm_source)", tally(pageviews, (e) => e.utmSource))}
</div>

<section><h2>AI questions &amp; answers</h2>${qaList}</section>
</body></html>`;
};

export default async (req) => {
  if (!isAuthed(req)) return unauthorized();

  // Only ever triggered by an authenticated view, so retention costs no
  // visitor-facing latency.
  await pruneExpired();

  const [eventDays, qaDays] = await Promise.all([
    listDays(KIND.event),
    listDays(KIND.qa),
  ]);
  const days = [...new Set([...eventDays, ...qaDays])].sort().reverse();

  const requested = new URL(req.url).searchParams.get("day");
  const day = days.includes(requested) ? requested : (days[0] ?? dayOf());

  const [events, qa, dayCounts] = await Promise.all([
    readDay(KIND.event, day),
    readDay(KIND.qa, day),
    countsByDay(KIND.event),
  ]);

  return new Response(render({ day, days, dayCounts, events, qa }), {
    status: 200,
    headers: {
      ...PRIVATE_HEADERS,
      "Content-Type": "text/html; charset=utf-8",
    },
  });
};
