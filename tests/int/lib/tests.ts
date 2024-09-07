import { expect } from "vitest";

export const expectSee = async (locator: HTMLElement) => {
	await expect(locator).toBeVisible();
};

export const expectText = async (locator: HTMLElement, text: string) => {
	await expect(locator).toBeVisible();
};

export const expectClick = async (locator: HTMLElement) => {
	await expect(locator).toBeVisible();
	await locator.click();
};

export const fillForm = async (
	locator: HTMLElement,
	data: Record<string, string>
) => {
	expect(locator).toBeVisible();
	for (var name in data) {
		const field = locator.querySelector(`input[name="${name}"]`);
		if (!field) throw new Error(`Field with name ${name} not found`);
		expect(field).toBeVisible();
		field.value = data[name];
	}
};
