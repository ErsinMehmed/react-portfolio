import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LanguageProvider } from "../i18n/LanguageContext";
import SkillsFilterSection from "../components/Resume/SkillsFilterSection";
import { techSkills } from "../Data";

const renderSection = () =>
  render(
    <LanguageProvider>
      <SkillsFilterSection />
    </LanguageProvider>
  );

const countByKind = (kind: string) =>
  techSkills.filter((s) => s.kind === kind).length;

// Every rendered skill card carries its title in a data attribute (see
// SkillBox), so tests can read "what's on screen, in what order" without
// depending on styling class names or on the tooltip duplicating the title
// text (each skill's title also appears a second time in its hover card).
const cardTitles = (): string[] =>
  screen
    .getAllByTestId("skill-card")
    // SkillBox always sets this attribute (see data-skill-title={item.title}).
    .map((el) => el.getAttribute("data-skill-title") as string);

test("shows every skill under the default 'All' filter", () => {
  renderSection();
  expect(cardTitles()).toHaveLength(techSkills.length);
});

test("marks the 'All' button pressed by default", () => {
  renderSection();

  expect(screen.getByRole("button", { name: "All" })).toHaveAttribute(
    "aria-pressed",
    "true"
  );
});

test("clicking a category filters the grid down to that kind only", async () => {
  const user = userEvent.setup();
  renderSection();

  await user.click(screen.getByRole("button", { name: "Database" }));

  expect(screen.getByRole("button", { name: "Database" })).toHaveAttribute(
    "aria-pressed",
    "true"
  );
  expect(screen.getByRole("button", { name: "All" })).toHaveAttribute(
    "aria-pressed",
    "false"
  );

  const shown = cardTitles();
  expect(shown).toHaveLength(countByKind("Database"));
  techSkills
    .filter((s) => s.kind === "Database")
    .forEach((skill) => expect(shown).toContain(skill.title));

  // A Frontend-only skill must no longer be present.
  expect(shown).not.toContain("React.js");
});

test("switching between two categories replaces the grid rather than accumulating", async () => {
  const user = userEvent.setup();
  renderSection();

  await user.click(screen.getByRole("button", { name: "AI" }));
  expect(cardTitles()).toHaveLength(countByKind("AI"));
  expect(cardTitles()).toContain("Claude Code");

  await user.click(screen.getByRole("button", { name: "Backend" }));
  const shown = cardTitles();
  expect(shown).toHaveLength(countByKind("Backend"));
  expect(shown).toContain("PHP");
  expect(shown).not.toContain("Claude Code");
});

test("clicking 'All' after filtering restores every skill", async () => {
  const user = userEvent.setup();
  renderSection();

  await user.click(screen.getByRole("button", { name: "Frontend" }));
  expect(cardTitles()).toHaveLength(countByKind("Frontend"));

  await user.click(screen.getByRole("button", { name: "All" }));
  expect(cardTitles()).toHaveLength(techSkills.length);
});

test("sorts filtered results by years of experience, then project count", async () => {
  const user = userEvent.setup();
  renderSection();

  await user.click(screen.getByRole("button", { name: "Frontend" }));

  const expectedOrder = techSkills
    .filter((s) => s.kind === "Frontend")
    .slice()
    .sort((a, b) => b.years - a.years || b.projects - a.projects)
    .map((s) => s.title);

  expect(cardTitles()).toEqual(expectedOrder);
});

test("groups 'All' results Frontend -> Backend -> Database -> AI -> Other", () => {
  renderSection();

  const kindOrder = ["Frontend", "Backend", "Database", "AI", "Other"];
  const titleToKind = new Map(techSkills.map((s) => [s.title, s.kind]));
  const shownKinds = cardTitles().map((title) => titleToKind.get(title));

  const ranks = shownKinds.map((kind) => kindOrder.indexOf(kind as string));
  const sortedRanks = [...ranks].sort((a, b) => a - b);
  expect(ranks).toEqual(sortedRanks);
});
