import { ContactForm } from "@/components/ContactForm";
import { faker } from "@faker-js/faker";
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const user = userEvent.setup();
interface FormData {
	name?: string;
	email?: string;
	phone?: string;
	message?: string;
}
interface ErrorData {
	name: string | RegExp;
	email: string | RegExp;
	phone: string | RegExp;
	message: string | RegExp;
}
const blankData: FormData = {
	name: "",
	email: "",
	phone: "",
	message: "",
};
const goodData: FormData = {
	name: faker.person.fullName(),
	email: faker.internet.email(),
	phone: faker.phone.imei(),
	message: faker.string.alpha(50),
};
const badData: FormData = {
	name: "", // missing, because any value is OK
	email: "invalid email",
	phone: "invalid phone",
	message: "invalid message (too short)",
};
const errors: ErrorData = {
	name: /required/i,
	email: /invalid/i,
	phone: /invalid/i,
	message: /too short/i,
};

export const fillForm = async (data: FormData) => {
	for (var name in data) {
		const value = data[name as keyof FormData];
		if (!value) continue;
		const field = screen.getByTestId(name);
		const input = within(field).getByRole("textbox");
		await user.type(input, value);
		expect(input).toHaveValue(value);
	}
};
export const expectErrors = async (errors: ErrorData) => {
	for (var name in errors) {
		const error = errors[name as keyof ErrorData];
		const field = screen.getByTestId(name);
		if (!!error) {
			expect(field).toHaveTextContent(error);
		} else {
			expect(field).not.toHaveTextContent(error);
		}
	}
};

beforeEach(() => {
	render(<ContactForm />);
});

describe("ContactForm component", () => {
	it("renders component", () => {
		const form = screen.getByTestId("contact-form");
		expect(form).toBeInTheDocument();
	});

	it("shows errors if all inputs blank", async () => {
		await user.click(screen.getByRole("submit"));
		const errors = screen.getAllByText("Required");
		await expect(errors.length).toBe(4);
	});

	it("shows invalid email error", async () => {
		const input = screen.getByLabelText(/email/i);
		await user.clear(input);
		await user.type(input, badData.email);
		await user.tab();
		expect(input).toHaveValue("invalid email");
		const error = screen.getByText(/invalid email/gi);
		expect(error).toBeInTheDocument();
	});

	it("shows invalid phone error", async () => {
		const input = screen.getByLabelText(/phone/i);
		await user.clear(input);
		await user.type(input, badData.phone);
		await user.tab();
		expect(input).toHaveValue("invalid phone");
		const error = screen.getByText(/invalid phone/gi);
		expect(error).toBeInTheDocument();
	});

	it("shows invalid message error", async () => {
		const input = screen.getByLabelText(/message/i);
		await user.clear(input);
		await user.type(input, badData.message);
		await user.tab();
		expect(input).toHaveValue("invalid message (too short)");
		const error = screen.getByText(/at least/gi);
		expect(error).toBeInTheDocument();
	});

	it("shows wait then success with good data", async () => {
		await fillForm(goodData);
		await user.click(screen.getByRole("submit"));
		await expectErrors(blankData as ErrorData);
	});

	it("bad email", async () => {
		await fillForm({ ...goodData, email: badData.email });
		await user.click(screen.getByRole("submit"));
		await expectErrors({ ...blankData, email: errors.email } as ErrorData);
	});

	it("bad phone", async () => {
		await fillForm({ ...goodData, phone: badData.phone });
		await user.click(screen.getByRole("submit"));
		await expectErrors({ ...blankData, phone: errors.phone } as ErrorData);
	});

	it("bad message", async () => {
		await fillForm({ ...goodData, message: badData.message });
		await user.click(screen.getByRole("submit"));
		await expectErrors({
			...blankData,
			message: errors.message,
		} as ErrorData);
	});
});
