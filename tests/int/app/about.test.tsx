import { describe, it, expect, beforeAll } from "vitest";
import { render, screen } from "@testing-library/react";

import Page from "@/app/about/page";

beforeAll(() => {
	render(<Page />);
});

describe("About page", () => {
	it("renders a heading", () => {
		const heading = screen.getByRole("heading", { level: 1 });
		expect(heading).toBeInTheDocument();
	});
});
