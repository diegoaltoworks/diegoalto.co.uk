import { z } from "zod";

const isPhone = (s: string) => /^[+]?[0-9\(\)\-\s]+$/.test(s.trim());
const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());

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
	.transform((data) => ({
		...data,
		email: data.email.trim().toLowerCase(),
		phone: data.phone.trim().replace(/[^0-9]+/g, ""),
	}));

export interface IContact extends z.infer<typeof contactSchema> {}
