import { expect, Locator } from "@playwright/test";

export const expectSee = async (locator: Locator) => {
	await expect(locator).toBeVisible();
};
export const expectNot = async (locator: Locator) => {
	await expect(await locator.count()).toBe(0);
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
	await expect(locator).toBeVisible();
	for (var name in data) {
		const field = await locator.locator(
			`input[name="${name}"], textarea[name="${name}"]`
		);
		const count = await field.count();
		await expect(count).toBe(1);
		await expect(field).toBeVisible();
		await field.fill(data[name]);
	}
};
