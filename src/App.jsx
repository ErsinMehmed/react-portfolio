import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Loading from "./components/Loading";

const Home = lazy(() => import("./pages/Home"));
const Resume = lazy(() => import("./pages/Resume"));
const Project = lazy(() => import("./pages/Project"));
const Certification = lazy(() => import("./pages/Certification"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Jump to top on every route change so a new page never inherits the
// previous page's scroll offset.
const ScrollToTop = ({ pathname }) => {
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
          path='/certifications'
          element={<Certification />}
        />

        <Route
          path='*'
          element={<NotFound />}
        />
      </Routes>
    </Suspense>
  );
}

export default App;
