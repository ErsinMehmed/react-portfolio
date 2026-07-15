import { lazy, Suspense, useLayoutEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Loading from "./components/Loading";
import { routes, routePatterns } from "./routes";

// Lazy so framer-motion (pulled in by these) stays out of the entry chunk.
// They self-load right after first paint and render nothing until opened, so
// their global key/event listeners attach without bloating LCP.
const CommandPalette = lazy(() => import("./components/CommandPalette"));
const AskCvModal = lazy(() => import("./components/AskCvModal"));

const Home = lazy(() => import("./pages/Home"));
const Resume = lazy(() => import("./pages/Resume"));
const Project = lazy(() => import("./pages/Project"));
const CaseStudy = lazy(() => import("./pages/CaseStudy"));
const Certification = lazy(() => import("./pages/Certification"));
const NotFound = lazy(() => import("./pages/NotFound"));

const SCROLL_KEY_PREFIX = "scroll:";

// Remembers each path's scroll offset (sessionStorage, so it survives the
// route subtree's remount below) and restores it on return — e.g. back from
// a case study lands where /projects was left, instead of always at the top.
// Two layoutEffects, in this order: React runs all of one render's cleanups
// before any of the next render's setups, so the outgoing path's offset is
// always captured (first effect's cleanup) before the incoming path's
// restore runs (second effect) — and both fire before paint, so there's no
// flash at y=0 first.
const ScrollToTop = ({ pathname }: { pathname: string }) => {
  useLayoutEffect(() => {
    return () => {
      sessionStorage.setItem(`${SCROLL_KEY_PREFIX}${pathname}`, String(window.scrollY));
    };
  }, [pathname]);

  useLayoutEffect(() => {
    const saved = sessionStorage.getItem(`${SCROLL_KEY_PREFIX}${pathname}`);
    window.scrollTo(0, saved ? Number(saved) : 0);
  }, [pathname]);

  return null;
};

function App() {
  const location = useLocation();

  // Key the route subtree by path so each navigation remounts the page and its
  // in-view reveals replay — the transition lives entirely in those section
  // reveals (like sokobeauty.bg), with no page-level cross-fade to flicker.
  return (
    <>
      <Suspense fallback={null}>
        <CommandPalette />
        <AskCvModal />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <ScrollToTop pathname={location.pathname} />
        <Routes
          location={location}
          key={location.pathname}>
          <Route
            path={routes.home}
            element={<Home />}
          />

          <Route
            path={routes.resume}
            element={<Resume />}
          />

          <Route
            path={routes.projects}
            element={<Project />}
          />

          <Route
            path={routePatterns.caseStudy}
            element={<CaseStudy />}
          />

          <Route
            path={routes.certifications}
            element={<Certification />}
          />

          <Route
            path='*'
            element={<NotFound />}
          />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
