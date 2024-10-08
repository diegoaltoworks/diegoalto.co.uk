import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
	testDir: "./tests/e2e",
	/* Run tests in files in parallel */
	fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	/* Retry on CI only */
	retries: process.env.CI ? 2 : 0,
	/* Opt out of parallel tests on CI. */
	workers: process.env.CI ? 1 : undefined,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: "line",
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		/* Base URL to use in actions like `await page.goto('/')`. */
		baseURL: "http://127.0.0.1:3000",

		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: "on",

		actionTimeout: 5 * 1000 * 5,
		navigationTimeout: 3 * 1000 * 5,
	},

	expect: {
		// Maximum time expect() should wait for the condition to be met.
		timeout: 9 * 1000 * 5,

		toHaveScreenshot: {
			// An acceptable amount of pixels that could be different, unset by default.
			maxDiffPixels: 10,
		},

		toMatchSnapshot: {
			// An acceptable ratio of pixels that are different to the
			// total amount of pixels, between 0 and 1.
			maxDiffPixelRatio: 0.1,
		},
	},

	/* Configure projects for major browsers */
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},

		{
			name: "firefox",
			use: { ...devices["Desktop Firefox"] },
		},

		//{
		//	name: "webkit",
		//	use: { ...devices["Desktop Safari"] },
		//},

		/* Test against mobile viewports. */
		{
			name: "Mobile Chrome",
			use: { ...devices["Pixel 5"] },
		},
		//{
		//	name: "Mobile Safari",
		//	use: { ...devices["iPhone 12"] },
		//},

		/* Test against branded browsers. */
		{
			name: "Microsoft Edge",
			use: { ...devices["Desktop Edge"], channel: "msedge" },
		},
		{
			name: "Google Chrome",
			use: { ...devices["Desktop Chrome"], channel: "chrome" },
		},
	],

	/* Run your local dev server before starting the tests */
	webServer: {
		command: "npm run dev",
		url: "http://127.0.0.1:3000",
		reuseExistingServer: true,
		stdout: "ignore",
		stderr: "pipe",
		timeout: 30 * 1000,
	},
});
