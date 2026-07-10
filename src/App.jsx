import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const Loading = lazy(() => import("./components/Loading"));
const Home = lazy(() => import("./pages/Home"));
const Resume = lazy(() => import("./pages/Resume"));
const Project = lazy(() => import("./pages/Project"));
const Certification = lazy(() => import("./pages/Certification"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
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
