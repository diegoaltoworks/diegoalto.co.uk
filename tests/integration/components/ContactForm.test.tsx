import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactForm } from "@/components/ContactForm";

describe("Contact page", () => {
	it("displays form validation error messages", async () => {
		await render(<ContactForm />);

		await screen.getByTestId("submit-button").click();

		const errorMessages = await screen.getByRole(".Mui-error");
	});
});
