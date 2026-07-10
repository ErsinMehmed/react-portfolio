import { render, screen } from "@testing-library/react";
import { LanguageProvider } from "../../i18n/LanguageContext";
import ExperienceBox from "./ExperienceBox";

const renderExperience = (period) =>
  render(
    <LanguageProvider>
      <ExperienceBox
        item={{
          title: "Backend web developer",
          period,
          location: "Varna",
          company: "Acme",
        }}
        isLast
      />
    </LanguageProvider>
  );

test("computes a multi-year, multi-month duration from a date range", () => {
  renderExperience("01.2020 - 06.2021");
  expect(screen.getByText("1 yr 6 mo")).toBeInTheDocument();
});

test("computes an exact one-year duration with no leftover months", () => {
  renderExperience("01.2020 - 12.2020");
  expect(screen.getByText("1 yr")).toBeInTheDocument();
});

test("treats a single month range as 1 mo", () => {
  renderExperience("03.2022 - 03.2022");
  expect(screen.getByText("1 mo")).toBeInTheDocument();
});

test("keeps the 'Present' label and still computes an ongoing duration", () => {
  renderExperience("07.2023 - Present");
  // The badge shows the (English) present label rather than a raw date.
  expect(screen.getByText("07.2023 - Present")).toBeInTheDocument();
  // Duration runs to today, so it must be a non-empty yr/mo string.
  expect(screen.getByText(/\d+ (yr|mo)/)).toBeInTheDocument();
});
