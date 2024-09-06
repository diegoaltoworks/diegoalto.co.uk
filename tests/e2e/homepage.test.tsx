import { test, expect, Locator } from "@playwright/test";
import { metadata } from "@/lib/metadata";
import { expectClick, expectText } from "@e2e/lib/tests";

test("has title", async ({ page }) => {
	await page.goto("/");
	await expect(page).toHaveTitle(new RegExp(`${metadata.title}`));
});

test("navigate to about page", async ({ page }) => {
	await page.goto("/");
	await expectClick(page.getByTestId("open-menu-button"));
	await expectClick(page.getByRole("link", { name: "About" }));
	await expectText(page.getByTestId("page-title"), "About");
});
