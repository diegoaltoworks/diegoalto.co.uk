import { faker } from "@faker-js/faker";
import { test, Page, expect } from "@playwright/test";
import { expectSee, expectText, expectClick, fillForm } from "@e2e/lib/tests";

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
		await expectClick(page.getByTestId("open-menu-button"));
		await expectClick(page.getByRole("link", { name: "Contact" }));
		await expectText(page.getByTestId("page-title"), "Contact");
	});

	test("menu navigate back to homepage", async () => {
		await expectClick(page.getByTestId("open-menu-button"));
		await expectClick(page.getByRole("link", { name: "Home" }));
		await expectSee(page.getByTestId("homepage-hello"));
	});
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
	test.beforeAll(async () => {
		await page.goto("/contact");
	});

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

test.describe("contact page valid submission", () => {
	test.beforeAll(async () => {
		await page.goto("/contact");
	});

	test("valid submission", async () => {
		/*
		await page.route("/contact", async (route) => {
			if (
				!(await route.request().headersArray()).some(
					({ name }) => name === "Next-Action"
				)
			) {
				return route.continue();
			}

			route.fulfill({
				status: 200,
				body: JSON.stringify({ ok: 1 }),
			});
		});
		*/
		await fillContactForm({ ...goodData });
		await submitContactForm();
		await expect(page.getByTestId("success-message")).toBeVisible();
	});
});
