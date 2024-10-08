/// <reference types="vitest" />
import { loadEnv } from "vite";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
	plugins: [react()],

	test: {
		globals: true,

		environment: "jsdom",
		env: loadEnv("", process.cwd(), ""),
		silent: false,

		browser: {
			// browser mode is experimental
			// https://vitest.dev/guide/browser/#browser-mode
			enabled: false,
			provider: "playwright", // or 'webdriverio'
			name: "chromium", // browser name is required
		},

		setupFiles: ["tests/unit/vitest.setup.ts", "tests/int/vitest.setup.ts"],
		include: ["tests/unit/**/*.test.{ts,tsx}", "tests/int/**/*.test.{ts,tsx}"],
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
