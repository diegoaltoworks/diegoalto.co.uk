import { describe, it, expect, beforeAll } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { ContactForm } from "@/components/ContactForm";

beforeAll(() => {
	render(<ContactForm />);
});

describe("ContactForm component", () => {
	it("renders component", () => {
		const form = screen.getByTestId("contact-form");
		expect(form).toBeInTheDocument();
	});

	it("shows errors", () => {
		const button = screen.getAllByRole("submit")?.[0];
		fireEvent.click(button);

		const errorText = screen.getByText("Required");
		expect(errorText).toBeInTheDocument();
	});

	it("shows MUI-error if submit button is clicked without filling any fields", () => {
		const button = screen.getAllByRole("submit")?.[0];

		fireEvent.click(button);

		const errorText = screen.getByText("Required");

		expect(errorText).toBeInTheDocument();
	});
});
