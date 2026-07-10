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

test("resolves a known key to English by default", () => {
  render(
    <LanguageProvider>
      <Probe testKey="nav.about" />
    </LanguageProvider>
  );

  expect(screen.getByTestId("value")).toHaveTextContent("About");
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
