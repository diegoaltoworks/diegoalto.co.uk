import "cross-fetch/polyfill";
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import Page from "@/app/about/page"

describe("Home Page", () => {
	it("renders a heading", async () => {
		render( await Page())

		const heading = screen.getByTestId("page-title")

		expect(heading).toBeInTheDocument()
	})
})
