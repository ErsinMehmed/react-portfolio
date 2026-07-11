import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}>
    {children}
  </motion.div>
);

function App() {
  const location = useLocation();

  return (
    <Suspense fallback={<Loading />}>
      <ScrollToTop pathname={location.pathname} />
      <AnimatePresence mode='wait'>
        <Routes
          location={location}
          key={location.pathname}>
          <Route
            path='/'
            element={
              <PageTransition>
                <Home />
              </PageTransition>
            }
          />

          <Route
            path='/resume'
            element={
              <PageTransition>
                <Resume />
              </PageTransition>
            }
          />

          <Route
            path='/projects'
            element={
              <PageTransition>
                <Project />
              </PageTransition>
            }
          />

          <Route
            path='/certifications'
            element={
              <PageTransition>
                <Certification />
              </PageTransition>
            }
          />

          <Route
            path='*'
            element={
              <PageTransition>
                <NotFound />
              </PageTransition>
            }
          />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
}

export default App;
