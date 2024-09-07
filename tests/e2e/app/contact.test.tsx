import { faker } from "@faker-js/faker";
import { test, Page, expect } from "@playwright/test";
import { expectSee, expectClick } from "@e2e/lib/tests";

test.describe.configure({ mode: "serial" });

let page: Page;

test.beforeAll(async ({ browser }) => {
	page = await browser.newPage();
	await page.goto("/");
});
test.afterAll(async () => {
	await page.close();
});

test.describe("contact page navigation", () => {
	test("menu navigate to contact page", async () => {
		//await expectClick(page.getByTestId("open-menu-button"));
		const button = page.getByTestId("open-menu-button");
		await expect(button).toBeVisible();
		await button.click();

		//await expectClick(page.getByRole("link", { name: "Contact" }));
		const link = page.getByRole("link", { name: "Contact" });
		await expect(link).toBeVisible();
		await link.click();

		//await expectText(page.getByTestId("page-title"), "Contact");
		const heading = page.getByRole("link", { name: "Contact" });
		await expect(heading).toBeVisible();
		await expect(heading).toHaveText("Contact");
	});

	test("menu navigate back to homepage", async () => {
		await expectClick(page.getByTestId("open-menu-button"));
		await expectClick(page.getByRole("link", { name: "Home" }));
		await expectSee(page.getByTestId("homepage-hello"));
	});
});
