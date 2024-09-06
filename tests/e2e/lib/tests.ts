import { expect, Locator } from "@playwright/test";

export const expectSee = async (locator: Locator) => {
	await expect(locator).toBeVisible();
};

export const expectText = async (locator: Locator, text: string) => {
	await expect(locator).toBeVisible();
	await expect(locator).toHaveText(text);
};

export const expectClick = async (locator: Locator) => {
	await expect(locator).toBeVisible();
	await locator.click();
};

export const fillForm = async (
	locator: Locator,
	data: Record<string, string>
) => {
	expect(locator).toBeVisible();
	for (var name in data) {
		const field = await locator.locator(`input[name="${name}"]`);
		expect(field).toBeVisible();
		await field.fill(data[name]);
	}
};
