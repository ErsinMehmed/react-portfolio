import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Loading from "./components/Loading";

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

// Jump to top on every route change so a new page never inherits the
// previous page's scroll offset.
const ScrollToTop = ({ pathname }: { pathname: string }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
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
            path='/'
            element={<Home />}
          />

          <Route
            path='/resume'
            element={<Resume />}
          />

          <Route
            path='/projects'
            element={<Project />}
          />

          <Route
            path='/projects/:slug'
            element={<CaseStudy />}
          />

          <Route
            path='/certifications'
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
