import { z } from "zod";

export const isPhone = (s: string) => /^[+]?[0-9\(\)\-\s]+$/.test(s.trim());
export const isEmail = (s: string) =>
	/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());

export const cleanPhone = (s: string) => s.trim().replace(/[^0-9]+/g, "");
export const cleanEmail = (s: string) => s.trim().toLowerCase();

export const cleanContact = (data: any) => ({
	...data,
	email: cleanEmail(data.email),
	phone: cleanPhone(data.phone),
});

export const contactSchema = z
	.object({
		name: z
			.string()
			.min(1, { message: "Required" })
			.max(30, { message: "Name should be less than 30 characters" }),

		email: z
			.string()
			.min(1, { message: "Required" })
			.refine(isEmail, { message: "Invalid email address" }),

		phone: z
			.string()
			.min(1, { message: "Required" })
			.refine(isPhone, { message: "Invalid phone number" }),

		message: z
			.string()
			.min(1, { message: "Required" })
			.min(30, { message: "Message should be at least 30 characters" })
			.max(500, { message: "Message should be less than 500 characters" }),
	})
	.transform(cleanContact);

export interface IContact extends z.infer<typeof contactSchema> {}

// TODO: why can't I just do this? urgh
// export type KContact = keyof IContact;
export type KContact = "name" | "email" | "phone" | "message";
