import { z } from "zod";

export const schema = z.object({
	name: z
		.string()
		.min(1, { message: "Required" }) // Equivalent to required: true
		.max(30, { message: "Name should be less than 30 characters" }),

	email: z
		.string()
		.min(1, { message: "Required" }) // Equivalent to required: true
		.regex(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, { message: "Invalid email address" }),

	phone: z
		.string()
		.min(1, { message: "Required" }) // Equivalent to required: true
		.regex(/^[0-9]+$/i, { message: "Invalid phone number" }),

	message: z
		.string()
		.min(1, { message: "Required" }) // Equivalent to required: true
		.min(30, { message: "Message should be at least 30 characters" })
		.max(500, { message: "Message should be less than 500 characters" }), // Ensuring max length for the TextArea
});
