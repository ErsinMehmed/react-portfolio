import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider, getInitialLang } from "./i18n/LanguageContext";
import { ThemeProvider } from "./theme/ThemeContext";
import { logConsoleSignature } from "./lib/consoleSignature";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element #root not found in index.html");
}

logConsoleSignature(getInitialLang());

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <ErrorBoundary>
          <BrowserRouter>
            <Routes>
              <Route
                path='/*'
                element={<App />}
              />
            </Routes>
          </BrowserRouter>
        </ErrorBoundary>
      </LanguageProvider>
    </ThemeProvider>
  </React.StrictMode>
);
