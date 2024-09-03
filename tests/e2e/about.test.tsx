import { test, expect } from "@playwright/test";
import { metadata } from "@/lib/metadata";

test("has title", async ({ page }) => {
	await page.goto("/about");

	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle(new RegExp(`${metadata.title}`));
});

test("renders content", async ({ page }) => {
	await page.goto("/about");

	// Expects page to have a heading with the name of Installation.
	await expect(page.getByTestId("page-body")).toBeVisible();
});
