import { test, expect } from "@playwright/test";

// Chromium's default locale (en-US) makes the app boot in English, so the
// assertions below match the English copy.

test("home renders the profile card", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Ersin/i })).toBeVisible();
});

test("resume lists skills and the category filter narrows them", async ({ page }) => {
  await page.goto("/resume");
  await expect(
    page.getByRole("heading", { name: "Professional Skills" })
  ).toBeVisible();

  const cards = page.getByTestId("skill-card");
  const total = await cards.count();
  expect(total).toBeGreaterThan(0);

  await page.getByRole("button", { name: "Backend", exact: true }).click();
  await expect.poll(() => cards.count()).toBeLessThan(total);
});

test("resume has no horizontal overflow at 320px", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto("/resume");
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
