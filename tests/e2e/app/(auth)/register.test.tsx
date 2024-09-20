import { test, Page } from "@playwright/test";
import { expectClick, expectSee } from "@e2e/lib/tests";

test.describe.configure({ mode: "serial" });

let page: Page;

test.beforeAll(async ({ browser }) => {
	page = await browser.newPage();
	await page.goto("/");
});
test.afterAll(async () => {
	await page.close();
});

test.describe("register page navigation", () => {
	test("homepage navigate to register page", async () => {
		await expectClick(page.getByText("register"));
		//await expectSee(page.getByRole("form"));
		await expectSee(page.getByRole("button", { name: "Continue" }));
	});
});
