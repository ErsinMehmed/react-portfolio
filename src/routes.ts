/**
 * Single source for every in-app path. Use `routes.*` when building a URL to
 * navigate/link to, and `routePatterns.*` only for `<Route path>` (they carry
 * the `:param` placeholders). Keeping the builder and the pattern side by side
 * means the URL segment can change in exactly one place.
 */
export const routes = {
  home: "/",
  resume: "/resume",
  projects: "/projects",
  /** Deep case-study page for a single project. */
  caseStudy: (slug: string) => `/projects/${slug}`,
  certifications: "/certifications",
} as const;

/** Placeholder forms for the router — mirror the `routes` builders above. */
export const routePatterns = {
  caseStudy: "/projects/:slug",
} as const;
