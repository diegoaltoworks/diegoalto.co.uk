import { test, Page } from "@playwright/test";
import { expectSee, expectText, expectClick } from "@e2e/lib/tests";

test.describe.configure({ mode: "serial" });

let page: Page;

test.beforeAll(async ({ browser }) => {
	page = await browser.newPage();
	await page.goto("/");
});
test.afterAll(async () => {
	await page.close();
});

test.describe("privacy page navigation", () => {
	test("menu navigate to privacy page", async () => {
		await expectClick(page.getByTestId("open-menu-button"));
		await expectClick(page.getByRole("link", { name: "Contact" }));
		await expectText(page.getByTestId("page-title"), "Contact");
		await expectClick(page.getByTestId("privacy-link"));
		await expectText(page.getByTestId("page-title"), "Privacy");
	});

	test("menu navigate back to homepage", async () => {
		await expectClick(page.getByTestId("open-menu-button"));
		await expectClick(page.getByRole("link", { name: "Home" }));
		await expectSee(page.getByTestId("homepage-hello"));
	});
});
