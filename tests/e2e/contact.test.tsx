import { test, expect, Page } from "@playwright/test";
import { metadata } from "@/lib/metadata";
import { faker } from "@faker-js/faker";

test.describe.configure({ mode: "serial" });

let page: Page;
test.beforeAll(async ({ browser }) => {
	page = await browser.newPage();
	await page.goto("/contact");
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

const fillForm = async (data: any) => {
	for (var name in data) {
		await page.locator(`input[name="${name}"]`).fill(data[name]);
	}
};
const submitForm = async () => {
	await page.getByTestId("submit-button").click();
};

const expectedErrorMessages = async (expectedErrorMessages: string[]) => {
	const errorMessages = await page.$$("p.Mui-error");
	for (let i = 0; i < expectedErrorMessages.length; i++) {
		const errorMessage = await errorMessages[i].innerText();
		console.log({ i, errorMessage });
		expect(errorMessage).toContain(expectedErrorMessages[i]);
	}
};

test.afterAll(async () => {
	await page.close();
});

test("has title", async () => {
	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle(new RegExp(`${metadata.title}`));
});

test("renders form", async () => {
	// Expects page to have a heading with the name of Installation.
	await expect(page.getByTestId("contact-form")).toBeVisible();
});

test("required fieldsa error", async () => {
	await fillForm({ ...blankData });
	await submitForm();
	await expectedErrorMessages(["Required", "Required", "Required", "Required"]);
});

test("invalid email error", async () => {
	await fillForm({ ...goodData, email: "invalid email" });
	await submitForm();
	await expectedErrorMessages(["Invalid email"]);
});

test("invalid phone error", async () => {
	await fillForm({ ...goodData, phone: "invalid phone" });
	await submitForm();
	await expectedErrorMessages(["Invalid phone"]);
});

test("valid submission", async () => {
	await fillForm({ ...goodData });
	await submitForm();
	await expect(page.getByTestId("success-message")).toBeVisible();
});
