import { test, expect, Page } from "@playwright/test";
import { metadata } from "@/lib/metadata";

test.describe.configure({ mode: "serial" });

let page: Page;
test.beforeAll(async ({ browser }) => {
	page = await browser.newPage();
	await page.goto("/contact");
});

test.afterAll(async () => {
	await page.close();
});

test("has title", async ({ page }) => {
	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle(new RegExp(`${metadata.title}`));
});

test("renders form", async ({ page }) => {
	// Expects page to have a heading with the name of Installation.
	await expect(page.getByRole("form")).toBeVisible();
});

test("displays error message if form is submitted empty", async ({ page }) => {
	// Expects page to have a heading with the name of Installation.
	await page.getByTestId("submit-button").click();
	await page.waitForSelector(".Mui-error");
	const errorMessages = await page.$$("p.Mui-error");
	const expectedErrorMessages = [
		"Required",
		"Required",
		"Required",
		"Required",
	];
	for (let i = 0; i < expectedErrorMessages.length; i++) {
		const errorMessage = await errorMessages[i].innerText();
		console.log({ i, errorMessage });
		expect(errorMessage).toContain(expectedErrorMessages[i]);
	}
});

test("displays error message if message is too short", async ({ page }) => {
	// Expects page to have a heading with the name of Installation.
	await page.locator('input[name="email"]').fill("email");
	await page.locator('input[name="name"]').fill("name");
	await page.locator('input[name="phone"]').fill("phone");
	await page
		.locator('input[name="message"]')
		.fill("too short, not long enough");
	await page.getByTestId("submit-button").click();
	await page.waitForSelector(".Mui-error");
	const errorMessages = await page.$$("p.Mui-error");
	const expectedErrorMessages = ["Too short"];
	for (let i = 0; i < expectedErrorMessages.length; i++) {
		const errorMessage = await errorMessages[i].innerText();
		console.log({ i, errorMessage });
		expect(errorMessage).toContain(expectedErrorMessages[i]);
	}
});
