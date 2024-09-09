"use server";

import { NextActionErrorWrapper } from "@/lib/error.handlers";
import { ConfigError, ExternalError, InputError } from "@/lib/errors";
import { contactSchema } from "@/lib/types/contact";

const {
	EMAIL_SENDER,
	EMAIL_DOMAIN,
	EMAIL_APIKEY,
	EMAIL_POSTMAN,
	EMAIL_RECIPIENT,
} = process.env;

export const contact = NextActionErrorWrapper(async (data: any) => {
	if (!EMAIL_SENDER)
		throw new ConfigError("Missing mail service SENDER", {
			missing_env_vars: "EMAIL_SENDER",
		});
	if (!EMAIL_DOMAIN)
		throw new ConfigError("Missing mail service DOMAIN", {
			missing_env_vars: "EMAIL_DOMAIN",
		});
	if (!EMAIL_APIKEY)
		throw new ConfigError("Missing mail service APIKEY", {
			missing_env_vars: "EMAIL_APIKEY",
		});

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
		from: EMAIL_POSTMAN,
		to: EMAIL_RECIPIENT,
		replyto: `${data.name} <${data.email}>`,
		subject: `Message from ${data.name}`,
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
		const response = await fetch(endpoint, payload);
		const result = await response.json();
		//todo: handle different error status from mail service
		if (result.error) {
			const error = result.error || "Mail service failed";
			throw new ExternalError(error, { result });
		}
		return { ok: 1 };
	} catch (error) {
		throw new ExternalError("Mail service error", error);
	}
});
