import { faker } from "@faker-js/faker";
import { test, Page, expect } from "@playwright/test";
import { expectClick, fillForm } from "@int/lib/tests";

test.describe.configure({ mode: "serial" });

let page: Page;

test.beforeAll(async ({ browser }) => {
	page = await browser.newPage();
	await page.goto("/contact");
});
test.afterAll(async () => {
	await page.close();
});

const blankData = {
	name: "",
	email: "",
	phone: "",
	message: "",
};
const goodData = {
	name: faker.person.fullName(),
	email: faker.internet.email(),
	phone: faker.phone.imei(),
	message: faker.string.alpha(50),
};

const fillContactForm = async (data: Record<string, string>) => {
	await fillForm(page.getByTestId("contact-form"), data);
};
const submitContactForm = async () => {
	await expectClick(page.getByTestId("submit-button"));
};

test.describe("contact page valid submission", () => {
	test("valid submission", async () => {
		await page.route("https://fwmail.fyneworks.io/send", async (route) => {
			return route.fulfill({
				status: 200,
				body: JSON.stringify({ ok: 1 }),
				headers: {
					"content-type": "application/json",
				},
			});
		});
		await fillContactForm({ ...goodData });
		await submitContactForm();
		await expect(page.getByTestId("success-message")).toBeVisible();
	});
});
