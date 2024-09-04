import { test, expect } from "@playwright/test";
import { metadata } from "@/lib/metadata";

test("has title", async ({ page }) => {
	await page.goto("/");

	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle(new RegExp(`${metadata.title}`));
});

test("navigate to about page", async ({ page }) => {
	await page.goto("/");

	// Click the get started link.
	await page.getByRole("link", { name: "About" }).click();

	// Expects page to have a heading with the name of Installation.
	await expect(page.getByTestId("page-title")).toBeVisible();
});
