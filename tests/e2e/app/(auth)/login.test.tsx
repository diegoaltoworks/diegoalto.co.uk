import { test, Page } from "@playwright/test";
import { expectSee, expectText, expectClick } from "@e2e/lib/tests";

test.describe.configure({ mode: "serial" });

let page: Page;

test.beforeAll(async ({ browser }) => {
	page = await browser.newPage();
});
test.afterAll(async () => {
	await page.close();
});

test.describe("login page navigation", () => {
	test("navigate to login page via menu", async () => {
		await page.goto("/");
		await expectClick(page.getByTestId("open-menu-button"));
		await expectClick(page.getByTestId("action-login"));
		//await expectSee(page.getByRole("form"));
		await expectSee(page.getByRole("button", { name: "Continue" }));
	});
	test("open login page directly", async () => {
		await page.goto("/login");
		//await expectSee(page.getByRole("form"));
		await expectSee(page.getByRole("button", { name: "Continue" }));
	});
});
