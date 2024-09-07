/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
	plugins: [react()],

	test: {
		globals: true,
		browser: {
			provider: "playwright", // or 'webdriverio'
			enabled: true,
			name: "chromium", // browser name is required
		},
		//environment: "jsdom",
		setupFiles: ["./tests/unit/setup.ts", "./tests/int/setup.ts"],
		include: [
			"./tests/unit/**/*.test.{ts,tsx}",
			"./tests/int/**/*.test.{ts,tsx}",
		],
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"@e2e": path.resolve(__dirname, "./tests/e2e"),
			"@int": path.resolve(__dirname, "./tests/int"),
			"@unit": path.resolve(__dirname, "./tests/unit"),
		},
	},
});
