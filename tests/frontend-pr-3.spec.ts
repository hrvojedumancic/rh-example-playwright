import { test, expect } from "@playwright/test";

test.describe("Third Practice Dashboard heading", () => {
  test("home page shows the new heading", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Karlo Dashboard", level: 4 })).toBeVisible();
  });

  test("previous heading text is gone", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Fourth and I hope final Practice Dashboard" })).toHaveCount(0);
  });

  test("sidebar nav link is still labelled Dashboard", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: "Dashboard" })).toBeVisible();
  });

  test("stat cards still render", async ({ page }) => {
    await page.goto("/");
    for (const label of ["Total Patients", "Active Patients", "Outstanding Balance", "Appointments Today"]) {
      await expect(page.getByText(label)).toBeVisible();
    }
    await expect(page.getByText("12", { exact: true })).toBeVisible();
  });

  test("collection goal and activity list still render", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Monthly Collection Goal")).toBeVisible();
    await expect(page.getByText("72% of $50,000")).toBeVisible();
    await expect(page.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "72");
    await expect(page.getByText("Recent Activity")).toBeVisible();
    for (const a of [
      "Payment received from Mary Johnson",
      "New patient registered: Emma Davis",
      "Appointment rescheduled: John Brown",
      "Invoice #1042 sent",
    ]) {
      await expect(page.getByText(a)).toBeVisible();
    }
  });

  test("navigating back to Dashboard shows the new heading", async ({ page }) => {
    await page.goto("/patients");
    await page.getByRole("link", { name: "Dashboard" }).click();
    await expect(page).toHaveURL("/");
    await expect(page.getByRole("heading", { name: "Karlo Dashboard" })).toBeVisible();
  });
});
