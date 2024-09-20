import { describe, it, expect, beforeAll } from "vitest";
import { render, screen } from "@testing-library/react";

import Page from "@/app/(homepage)/page";

beforeAll(() => {
	render(<Page />);
});

describe("Home page", () => {
	it("renders slides", () => {
		const container = screen.getByTestId("homepage-slides");
		expect(container).toBeInTheDocument();
		const slides = screen.getAllByTestId("homepage-slide");
		expect(slides).to.be.length(3);
	});
});
