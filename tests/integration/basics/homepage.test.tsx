import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import Page from "@/app/page";

describe("Homepage", () => {
	it("renders a heading", () => {
		render(<Page />);

		const heading = screen.getByRole("heading", { level: 1 });

		expect(heading).toBeInTheDocument();
	});
});
