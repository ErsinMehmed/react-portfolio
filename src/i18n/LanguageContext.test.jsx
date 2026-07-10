import { render, screen, fireEvent } from "@testing-library/react";
import { LanguageProvider, useLanguage } from "./LanguageContext";

const Probe = ({ testKey }) => {
  const { t, lang, setLang } = useLanguage();
  return (
    <div>
      <span data-testid="value">{t(testKey)}</span>
      <span data-testid="lang">{lang}</span>
      <button onClick={() => setLang("bg")}>switch</button>
    </div>
  );
};

const setBrowserLanguage = (value) =>
  Object.defineProperty(window.navigator, "language", {
    value,
    configurable: true,
  });

beforeEach(() => {
  localStorage.clear();
  setBrowserLanguage("en-US");
});

test("resolves a known key to English by default", () => {
  render(
    <LanguageProvider>
      <Probe testKey="nav.about" />
    </LanguageProvider>
  );

  expect(screen.getByTestId("value")).toHaveTextContent("About");
});

test("defaults to Bulgarian on first visit when the browser language is bg", () => {
  setBrowserLanguage("bg-BG");

  render(
    <LanguageProvider>
      <Probe testKey="nav.about" />
    </LanguageProvider>
  );

  expect(screen.getByTestId("lang")).toHaveTextContent("bg");
  expect(screen.getByTestId("value")).toHaveTextContent("За мен");
});

test("a saved choice overrides the browser language", () => {
  localStorage.setItem("lang", "en");
  setBrowserLanguage("bg-BG");

  render(
    <LanguageProvider>
      <Probe testKey="nav.about" />
    </LanguageProvider>
  );

  expect(screen.getByTestId("lang")).toHaveTextContent("en");
});

test("switches to the Bulgarian translation and persists the choice", () => {
  render(
    <LanguageProvider>
      <Probe testKey="nav.about" />
    </LanguageProvider>
  );

  fireEvent.click(screen.getByText("switch"));

  expect(screen.getByTestId("value")).toHaveTextContent("За мен");
  expect(localStorage.getItem("lang")).toBe("bg");
});

test("falls back to the raw key when no translation exists", () => {
  render(
    <LanguageProvider>
      <Probe testKey="not.a.real.key" />
    </LanguageProvider>
  );

  expect(screen.getByTestId("value")).toHaveTextContent("not.a.real.key");
});
