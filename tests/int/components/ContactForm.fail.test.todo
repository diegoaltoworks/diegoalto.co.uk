import { beforeAll, afterAll } from "vitest";
import { describe, it, expect } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { faker } from "@faker-js/faker";
import { expectClick, fillForm } from "@e2e/lib/tests";
import { ContactForm } from "@/components/ContactForm";

// Render the component once before all tests
beforeAll(() => {
	render(<ContactForm />);
});

// Optionally clean up after all tests
afterAll(() => {
	cleanup();
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
	await fillForm(screen.getByTestId("contact-form"), data);
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

describe("contact page error handling", () => {
	it("required fields error", async () => {
		await fillContactForm({ ...blankData });
		await submitContactForm();
		await expectedErrorMessages([
			"Required",
			"Required",
			"Required",
			"Required",
		]);
	});

	it("invalid email error", async () => {
		await fillContactForm({ ...goodData, email: "invalid email" });
		await submitContactForm();
		await expectedErrorMessages(["Invalid email"]);
	});

	it("invalid phone error", async () => {
		await fillContactForm({ ...goodData, phone: "invalid phone" });
		//await submitContactForm();
		await expectedErrorMessages(["Invalid phone"]);
	});
});
