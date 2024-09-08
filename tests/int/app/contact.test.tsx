import { describe, it, expect, beforeAll } from "vitest";
import { render, screen } from "@testing-library/react";

import Page from "@/app/contact/page";

beforeAll(() => {
	render(<Page />);
});

describe("Contact page", () => {
	it("renders a heading", () => {
		const heading = screen.getByRole("heading", { level: 1 });
		expect(heading).toBeInTheDocument();
	});
});
