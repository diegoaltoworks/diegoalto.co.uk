import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import BackgroundSlide from "@/components/Template/Homepage/BackgroundSlide";

describe("BackgroundSlide", () => {
	it("renders children content", () => {
		render(
			<BackgroundSlide
				slideNumber={1}
				imageSrc="/backgrounds/japan.jpg"
				imageAlt="Test image"
			>
				<div>Test Content</div>
			</BackgroundSlide>,
		);

		expect(screen.getByText("Test Content")).toBeInTheDocument();
	});

	it("applies correct data-slide attribute", () => {
		render(
			<BackgroundSlide
				slideNumber={2}
				imageSrc="/backgrounds/rio.jpg"
				imageAlt="Test image"
			>
				<div>Content</div>
			</BackgroundSlide>,
		);

		expect(screen.getByTestId("homepage-slide")).toHaveAttribute(
			"data-slide",
			"2",
		);
	});

	it("renders Next.js Image with correct alt text", () => {
		const { container } = render(
			<BackgroundSlide
				slideNumber={1}
				imageSrc="/backgrounds/japan.jpg"
				imageAlt="Tokyo skyline"
				priority={true}
			>
				<div>Content</div>
			</BackgroundSlide>,
		);

		const image = container.querySelector("img");
		expect(image).toHaveAttribute("alt", "Tokyo skyline");
	});

	it("renders overlay and content divs", () => {
		const { container } = render(
			<BackgroundSlide
				slideNumber={1}
				imageSrc="/backgrounds/swiss.jpg"
				imageAlt="Swiss Alps"
			>
				<div data-testid="test-content">Test</div>
			</BackgroundSlide>,
		);

		const overlayDiv = container.querySelector('[class*="overlay"]');
		const contentDiv = container.querySelector('[class*="content"]');

		expect(overlayDiv).toBeInTheDocument();
		expect(contentDiv).toBeInTheDocument();
		expect(screen.getByTestId("test-content")).toBeInTheDocument();
	});

	it("applies priority prop to first slide", () => {
		const { container: container1 } = render(
			<BackgroundSlide
				slideNumber={1}
				imageSrc="/backgrounds/swiss.jpg"
				imageAlt="Swiss Alps"
				priority={true}
			>
				<div>First Slide</div>
			</BackgroundSlide>,
		);

		const image1 = container1.querySelector("img");
		// Priority images should not have loading="lazy"
		expect(image1).not.toHaveAttribute("loading", "lazy");
	});

	it("does not apply priority to subsequent slides", () => {
		const { container: container2 } = render(
			<BackgroundSlide
				slideNumber={2}
				imageSrc="/backgrounds/japan.jpg"
				imageAlt="Japan"
				priority={false}
			>
				<div>Second Slide</div>
			</BackgroundSlide>,
		);

		const image2 = container2.querySelector("img");
		// Non-priority images should have loading="lazy"
		expect(image2).toHaveAttribute("loading", "lazy");
	});
});
