import { faker } from "@faker-js/faker";
import { test, Page, expect } from "@playwright/test";
import { expectSee, expectClick, expectNot, fillForm } from "@e2e/lib/tests";

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

const blankData = {
	name: "",
	email: "",
	phone: "",
	message: "",
};
const goodData = {
	name: faker.person.fullName(),
	email: faker.internet.email(),
	phone: faker.phone.number({
		style: Math.random() < 0.5 ? "national" : "international",
	}),
	message: faker.string.alpha(50),
};

const fillContactForm = async (data: Record<string, string>) => {
	const pathname = await page.evaluate(() => window.location.pathname);
	if (pathname !== "/contact") await page.goto("/contact");
	await fillForm(page.getByTestId("contact-form"), data);
};
const submitContactForm = async () => {
	await expectClick(page.getByTestId("submit-button"));
	await expectSee(page.getByTestId("contact-form"));
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
	test("but network failure", async () => {
		await page.route("**/contact", async (route) => {
			if (route.request().method() !== "POST") return route.continue();
			return route.abort("failed");
		});
		await fillContactForm({ ...goodData });
		await submitContactForm();
		await expectSee(page.getByTestId("server-error-message"));
		await expectNot(page.getByTestId("success-message"));
		await expectSee(page.getByTestId("contact-form"));
	});
	test("but fails with bad 500", async () => {
		await page.route("**/contact", async (route) => {
			if (route.request().method() !== "POST") return route.continue();
			return route.fulfill({
				status: 500,
				body: "Internal Server Error",
			});
		});
		await fillContactForm({ ...goodData });
		await submitContactForm();
		await expectSee(page.getByTestId("server-error-message"));
		await expectNot(page.getByTestId("success-message"));
		await expectSee(page.getByTestId("contact-form"));
	});
	test("but fails with greaceful 500", async () => {
		await page.route("**/contact", async (route) => {
			if (route.request().method() !== "POST") return route.continue();
			return route.fulfill({
				status: 500,
				body: JSON.stringify({ error: "Some Mock Server Error" }),
			});
		});
		await fillContactForm({ ...goodData });
		await submitContactForm();
		await expectSee(page.getByTestId("server-error-message"));
		await expectNot(page.getByTestId("success-message"));
		await expectSee(page.getByTestId("contact-form"));
	});
	test("but fails with soft 200 error (nextjs actions!)", async () => {
		//TODO: figure out how to mock nextjs actionn response
		return;
		await page.route("**/contact", async (route) => {
			if (route.request().method() !== "POST") return route.continue();
			return route.fulfill({
				status: 200,
				body: JSON.stringify({ error: "Soft Error, gently does it" }),
			});
		});
		await fillContactForm({ ...goodData });
		await submitContactForm();
		await expectSee(page.getByTestId("server-error-message"));
		await expectNot(page.getByTestId("success-message"));
		await expectSee(page.getByTestId("contact-form"));
	});
});

test.describe("contact page valid submission", () => {
	test("mocked success response", async () => {
		//TODO: figure out how to mock nextjs actionn response
		return;
		await page.route("**/contact", async (route) => {
			if (route.request().method() !== "POST") return route.continue();
			return route.fulfill({
				status: 200,
				body: [`0:["$@1",["development",null]]`, `1:{"ok":1}`].join("\n"),
				headers: {
					"x-action-revalidated": "[[],0,0]",
				},
			});
		});
		await fillContactForm({ ...goodData });
		await submitContactForm();
		await expectNot(page.getByTestId("server-error-message"));
		await expectSee(page.getByTestId("success-message"));
	});
	test("actual sumission is successful", async () => {
		await page.route("**/contact", async (route) => route.continue());
		await fillContactForm({ ...goodData });
		await submitContactForm();
		await expectNot(page.getByTestId("server-error-message"));
		await expectSee(page.getByTestId("success-message"));
	});
});
