import { faker } from "@faker-js/faker";
import { test, Page, expect } from "@playwright/test";
import { expectClick, fillForm } from "@e2e/lib/tests";

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

const expectedErrorMessages = async (expectedErrorMessages: string[]) => {
	const errorMessages = await page.$$("p.Mui-error");
	debugger;
	for (let i = 0; i < expectedErrorMessages.length; i++) {
		const errorMessage = await errorMessages[i].innerText();
		expect(errorMessage).toContain(expectedErrorMessages[i]);
	}
};

test.describe("contact page error handling", () => {
	test("required fields error", async () => {
		await fillContactForm({ ...blankData });
		await submitContactForm();
		await expectedErrorMessages([
			"Required",
			"Required",
			"Required",
			"Required",
		]);
	});

	test("invalid email error", async () => {
		await fillContactForm({ ...goodData, email: "invalid email" });
		await submitContactForm();
		await expectedErrorMessages(["Invalid email"]);
	});

	test("invalid phone error", async () => {
		await fillContactForm({ ...goodData, phone: "invalid phone" });
		//await submitContactForm();
		await expectedErrorMessages(["Invalid phone"]);
	});
});

test.describe("contact page valid submission but fails on server", () => {
	test("valid submission fails with 500", async () => {
		await page.route("https://fwmail.fyneworks.io/send", async (route) => {
			return route.fulfill({
				status: 500,
				body: JSON.stringify({ error: 1 }),
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
