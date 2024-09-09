import {
	contactSchema,
	cleanContact,
	IContact,
	KContact,
} from "@/lib/types/contact";
import { faker } from "@faker-js/faker";
import { describe, expect, it } from "vitest";

const blankData: IContact = {
	name: "",
	email: "",
	phone: "",
	message: "",
};
const goodData: IContact = {
	...blankData,
	name: faker.person.fullName(),
	email: faker.internet.email(),
	phone: faker.phone.number({
		style: Math.random() < 0.5 ? "national" : "international",
	}),
	message: faker.string.alpha(50),
};
const badData: IContact = {
	...blankData,
	name: "", // missing, because any value is OK
	email: "invalid email",
	phone: "invalid phone",
	message: "invalid message (too short)",
};
const dirtyData: IContact = {
	...goodData,
	email: "  JohnDoe@example.com  ",
	phone: "+1 (123) 456-7890  ",
};
describe("Contact Schema", () => {
	it("should validate a valid contact object", () => {
		const validContact: IContact = { ...goodData };
		const result = contactSchema.safeParse(validContact);
		expect(result.success).toBe(true);
		expect(result.data).toEqual(cleanContact(validContact));
	});

	it("should not validate a contact object with missing required fields", () => {
		const invalidContact: Partial<IContact> = {
			name: goodData.name,
			email: goodData.email,
			// Missing phone and message fields
		};
		const result = contactSchema.safeParse(invalidContact);
		expect(result).toBeDefined();
		expect(result).toHaveProperty("success");
		expect(result).toBeDefined();
		expect(result).toHaveProperty("success");
		expect(result.success).toBe(false);
		expect(result).toHaveProperty("error");
		if (!result.error) return;
		expect(result).toHaveProperty("error");
		if (!result.error) return;
		expect(result.error.issues).toHaveLength(2);
		expect(result.error.issues[0].message).toBe("Required"); // phone
		expect(result.error.issues[1].message).toBe("Required"); // message
	});

	it("should not validate a contact object with invalid email address", () => {
		const invalidContact: IContact = { ...goodData, email: badData.email };
		const result = contactSchema.safeParse(invalidContact);
		expect(result).toBeDefined();
		expect(result).toHaveProperty("success");
		expect(result.success).toBe(false);
		expect(result).toHaveProperty("error");
		if (!result.error) return;
		expect(result.error.issues).toHaveLength(1);
		expect(result.error.issues[0].message).toBe("Invalid email address");
	});

	it("should not validate a contact object with invalid phone number", () => {
		const invalidContact: IContact = { ...goodData, phone: badData.phone };
		const result = contactSchema.safeParse(invalidContact);
		expect(result).toBeDefined();
		expect(result).toHaveProperty("success");
		expect(result.success).toBe(false);
		expect(result).toHaveProperty("error");
		if (!result.error) return;
		expect(result.error.issues).toHaveLength(1);
		expect(result.error.issues[0].message).toBe("Invalid phone number");
	});

	it("should not validate a contact object with a name longer than 30 characters", () => {
		const invalidContact: IContact = {
			...goodData,
			name: `Long name ${faker.string.alpha(50)}`, // Name is longer than 30 characters
		};
		const result = contactSchema.safeParse(invalidContact);
		expect(result).toBeDefined();
		expect(result).toHaveProperty("success");
		expect(result.success).toBe(false);
		expect(result).toHaveProperty("error");
		if (!result.error) return;
		expect(result.error.issues).toHaveLength(1);
		expect(result.error.issues[0].message).toBe(
			"Name should be less than 30 characters"
		);
	});

	it("should not validate a contact object with a message shorter than 30 characters", () => {
		const invalidContact: IContact = {
			...goodData,
			message: "Short message",
		};
		const result = contactSchema.safeParse(invalidContact);
		expect(result).toBeDefined();
		expect(result).toHaveProperty("success");
		expect(result.success).toBe(false);
		expect(result).toHaveProperty("error");
		if (!result.error) return;
		expect(result.error.issues).toHaveLength(1);
		expect(result.error.issues[0].message).toBe(
			"Message should be at least 30 characters"
		);
	});

	it("should not validate a contact object with a message longer than 500 characters", () => {
		const invalidContact: IContact = {
			...goodData,
			message: `Message too long ${faker.string.alpha(999)}`, // Name is longer than 30 characters
		};
		const result = contactSchema.safeParse(invalidContact);
		expect(result).toBeDefined();
		expect(result).toHaveProperty("success");
		expect(result.success).toBe(false);
		expect(result).toHaveProperty("error");
		if (!result.error) return;
		expect(result.error.issues).toHaveLength(1);
		expect(result.error.issues[0].message).toBe(
			"Message should be less than 500 characters"
		);
	});

	it("should transform the email and phone fields to their cleaned versions", () => {
		const contact: IContact = { ...dirtyData };
		const cleanData = cleanContact(contact);
		const result = contactSchema.safeParse(contact);
		expect(result.success).toBe(true);
		expect(result.data.email).toBe(cleanData.email);
		expect(result.data.phone).toBe(cleanData.phone);
	});

	it("should have the correct type for KContact", () => {
		const keys: KContact[] = ["name", "email", "phone", "message"];

		expect(keys).toHaveLength(4);
		expect(keys).toContain("name");
		expect(keys).toContain("email");
		expect(keys).toContain("phone");
		expect(keys).toContain("message");
	});
});
