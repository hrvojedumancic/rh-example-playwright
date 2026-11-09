import { test, expect } from "@playwright/test";

test.describe("Practice Dashboard heading", () => {
  test("home page shows the renamed heading", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Practice Dashboard", level: 4 })).toBeVisible();
  });

  test("old heading text is no longer shown as a heading", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Dashboard", exact: true })).toHaveCount(0);
  });

  test("sidebar nav link is still labelled Dashboard", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: "Dashboard" })).toBeVisible();
  });

  test("dashboard content still renders under the new heading", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Total Patients")).toBeVisible();
    await expect(page.getByText("Monthly Collection Goal")).toBeVisible();
    await expect(page.getByText("Recent Activity")).toBeVisible();
  });

  test("navigating back to Dashboard shows the new heading", async ({ page }) => {
    await page.goto("/patients");
    await page.getByRole("link", { name: "Dashboard" }).click();
    await expect(page).toHaveURL("/");
    await expect(page.getByRole("heading", { name: "Practice Dashboard" })).toBeVisible();
  });
});
