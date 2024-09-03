"use server";

import {
	ConfigError,
	ExternalError,
	InputError,
	NextActionErrorWrapper,
} from "@/lib/errors";
import { contactSchema } from "@/lib/types/contact";

const EMAIL_SENDER = process.env.EMAIL_SENDER;
const EMAIL_DOMAIN = process.env.EMAIL_DOMAIN;
const EMAIL_APIKEY = process.env.EMAIL_APIKEY;

export const contact = NextActionErrorWrapper(async (data: any) => {
	if (!EMAIL_SENDER) throw new ConfigError("Missing mail service SENDER");
	if (!EMAIL_DOMAIN) throw new ConfigError("Missing mail service DOMAIN");
	if (!EMAIL_APIKEY) throw new ConfigError("Missing mail service APIKEY");

	const validation = contactSchema.safeParse(data);
	if (!validation.success) {
		const errors = Object.fromEntries(
			validation.error?.issues?.map((issue) => [
				issue.path[0],
				issue.message,
			]) || []
		);
		throw new InputError("Invalid input", { errors });
	}

	const message = {
		from: process.env.EMAIL_FROM,
		to: process.env.EMAIL_TO,
		replyto: data.email,
		subject: `Message from ${data.name} - ${process.env.SITE_NAME}`,
		html: [
			data.name ?? `name: ${data.name}`,
			data.phone ?? `phone: ${data.phone}`,
			data.email ?? `email: ${data.email}`,
			data.message ?? `message: ${data.message}`,
		]
			.filter((x) => !!x)
			.join("\n<br/>\n"),
	};

	const endpoint = EMAIL_SENDER;
	const payload = {
		method: "POST",
		body: JSON.stringify(message),
		headers: {
			"Content-Type": "application/json",
			domain: EMAIL_DOMAIN,
			apikey: EMAIL_APIKEY,
		},
	};

	try {
		await fetch(endpoint, payload);
		return { ok: 1 };
	} catch (error) {
		throw new ExternalError("Mail service error", error);
	}
});
