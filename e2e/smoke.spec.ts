import { test, expect } from "@playwright/test";

// Chromium's default locale (en-US) boots the app in English, so the
// assertions below match the English copy.

const CASE_STUDY = "mypos-partner-portal";
const ROUTES = [
  "/",
  "/resume",
  "/projects",
  "/certifications",
  `/projects/${CASE_STUDY}`,
];

// Each top-level route paints its own content, not the 404 and not the root
// ErrorBoundary fallback.
for (const path of ROUTES) {
  test(`route opens without error: ${path}`, async ({ page }) => {
    await page.goto(path);
    await expect(page.getByRole("heading").first()).toBeVisible();
    await expect(page.getByText("Something went wrong")).toHaveCount(0);
    await expect(page.getByText("Page not found")).toHaveCount(0);
  });
}

test("command palette opens on Ctrl+K and navigates", async ({ page }) => {
  await page.goto("/");
  // Wait for the lazy palette chunk to mount so its keydown listener is live.
  await page.waitForLoadState("networkidle");
  await page.keyboard.press("Control+k");

  const palette = page.getByRole("dialog");
  await expect(palette).toBeVisible();

  const input = palette.getByRole("combobox");
  await input.fill("Resume");
  await input.press("Enter");
  await expect(page).toHaveURL(/\/resume$/);
});

test("resume category filter narrows the skill grid", async ({ page }) => {
  await page.goto("/resume");
  const cards = page.getByTestId("skill-card");
  // Wait for the lazy route + skill grid to render before counting.
  await expect(cards.first()).toBeVisible();
  const total = await cards.count();
  expect(total).toBeGreaterThan(0);

  await page.getByRole("button", { name: "Backend", exact: true }).click();
  await expect.poll(() => cards.count()).toBeLessThan(total);
});

test("resume has no horizontal overflow at 320px", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto("/resume");
  await expect(page.getByTestId("skill-card").first()).toBeVisible();
  // The skill tooltip used to stretch scrollWidth past the viewport here.
  const overflow = await page.evaluate(
    () =>
      document.documentElement.scrollWidth -
      document.documentElement.clientWidth
  );
  expect(overflow).toBeLessThanOrEqual(1);
});

test("an unknown route renders the 404 page", async ({ page }) => {
  await page.goto("/this-route-does-not-exist");
  await expect(page.getByText("Page not found")).toBeVisible();
});
