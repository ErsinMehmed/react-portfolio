/**
 * Tiny first-party analytics beacon feeding the private /stats dashboard.
 * No cookies, no third party, no IP — the function only adds the country
 * Netlify already resolved at the edge.
 *
 * Attribution: append `?ref=<source>` to any link pointing here and the first
 * page of the visit records where it came from. The ref is then remembered for
 * the rest of the session, so later events stay attributed to the same source,
 * and stripped from the address bar so a shared URL never carries it onward.
 *
 * Canonical refs (keep in sync with the labels in netlify/functions/stats.mjs):
 *   cv-devbg   — the CV uploaded to dev.bg
 *   cv-jobsbg  — the CV uploaded to jobs.bg
 *   cv         — the CV handed out directly / any other copy
 *   linkedin   — LinkedIn profile + posts
 *   github     — GitHub profile
 *   email      — email signature
 *   qr         — the phone QR code
 */

const ENDPOINT = "/.netlify/functions/track";
const REF_KEY = "ref";
const UTM_KEY = "utm";
const SID_KEY = "sid";

/**
 * Per-tab random id, used only to count one visit as one visit instead of N
 * pageviews. It lives in sessionStorage, so it dies with the tab and can never
 * link two visits — not a cookie, not an identity.
 */
const sessionId = (): string | undefined => {
  try {
    let sid = sessionStorage.getItem(SID_KEY);
    if (!sid) {
      sid = Math.random().toString(36).slice(2, 12);
      sessionStorage.setItem(SID_KEY, sid);
    }
    return sid;
  } catch {
    return undefined;
  }
};

export type TrackEvent =
  | "pageview"
  | "cv_download"
  | "askcv_open"
  | "case_study_open"
  | "project_open"
  | "copy_email"
  | "lang_switch"
  | "theme_switch";

interface Utm {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

const slug = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9-_]/g, "")
    .slice(0, 40);

/**
 * Reads `?ref` / `?utm_*` off the first URL of the visit, stores them for the
 * session and scrubs them from the address bar. Safe to call on every render:
 * once stored, the stored value wins.
 */
export const captureAttribution = (): void => {
  try {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref && !sessionStorage.getItem(REF_KEY)) {
      sessionStorage.setItem(REF_KEY, slug(ref));
    }

    const utm: Utm = {};
    const source = params.get("utm_source");
    const medium = params.get("utm_medium");
    const campaign = params.get("utm_campaign");
    if (source) utm.utmSource = slug(source);
    if (medium) utm.utmMedium = slug(medium);
    if (campaign) utm.utmCampaign = slug(campaign);
    if (Object.keys(utm).length && !sessionStorage.getItem(UTM_KEY)) {
      sessionStorage.setItem(UTM_KEY, JSON.stringify(utm));
    }

    // Drop the tracking params from the visible URL without a navigation.
    if (ref || source || medium || campaign) {
      ["ref", "utm_source", "utm_medium", "utm_campaign"].forEach((k) =>
        params.delete(k)
      );
      const query = params.toString();
      window.history.replaceState(
        null,
        "",
        window.location.pathname + (query ? `?${query}` : "") + window.location.hash
      );
    }
  } catch {
    /* private mode / storage disabled — attribution is optional */
  }
};

const storedUtm = (): Utm => {
  try {
    return JSON.parse(sessionStorage.getItem(UTM_KEY) ?? "{}") as Utm;
  } catch {
    return {};
  }
};

/** Fire-and-forget; never awaited and never allowed to throw at a caller. */
export const track = (type: TrackEvent, meta?: string): void => {
  try {
    const body = JSON.stringify({
      type,
      sid: sessionId(),
      path: window.location.pathname,
      ref: sessionStorage.getItem(REF_KEY) ?? undefined,
      // Only meaningful on the entry page, which is exactly when it matters.
      referrer: document.referrer || undefined,
      ...storedUtm(),
      meta,
      lang: document.documentElement.lang || undefined,
    });

    // keepalive so the beacon still leaves during an unload/navigation.
    void fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => undefined);
  } catch {
    /* analytics must never break the page */
  }
};
