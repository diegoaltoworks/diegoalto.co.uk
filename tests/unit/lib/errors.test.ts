import { expect, test } from "vitest";
import {
	BaseError,
	AppError,
	ExternalError,
	ConfigError,
	UserError,
	InputError,
	AuthError,
	NotFoundError,
} from "@/lib/errors";

const assertErrorProps = (
	error: BaseError,
	type: string,
	errorMessage: string,
	statusCode: number
) => {
	expect(error).toBeInstanceOf(BaseError);
	expect(typeof error.toJSON).toBe("function");
	expect(typeof error.toString).toBe("function");

	const json = error.toJSON();
	expect(json).toHaveProperty("type", type);
	expect(json).toHaveProperty("error", errorMessage);
	expect(json).toHaveProperty("statusCode", statusCode);

	const text = error.toString();
	expect(text).toEqual(`${json.type}: ${errorMessage}`);
};
test("throw BaseError with the given message", () => {
	const errorMessage = "BaseError error";
	try {
		throw new BaseError(
			"BaseError",
			500,
			errorMessage,
			{ info: "hello" },
			false
		);
	} catch (e: unknown) {
		const error = e as BaseError;
		expect(error).toBeInstanceOf(BaseError);
		assertErrorProps(error, "BaseError", errorMessage, 500);
	}
});
test("throw AppError with the given message", () => {
	const errorMessage = "AppError error";
	try {
		throw new AppError("AppError", errorMessage);
	} catch (e: unknown) {
		const error = e as AppError;
		expect(error).toBeInstanceOf(AppError);
		assertErrorProps(error, "AppError", errorMessage, 500);
	}
});
test("throw ExternalError with the given message", () => {
	const errorMessage = "ExternalError error";
	try {
		throw new ExternalError(errorMessage);
	} catch (e: unknown) {
		const error = e as ExternalError;
		expect(error).toBeInstanceOf(ExternalError);
		assertErrorProps(error, "ExternalError", errorMessage, 500);
	}
});
test("throw ConfigError with the given message", () => {
	const errorMessage = "ConfigError error";
	try {
		throw new ConfigError(errorMessage);
	} catch (e: unknown) {
		const error = e as ConfigError;
		expect(error).toBeInstanceOf(ConfigError);
		assertErrorProps(error, "ConfigError", errorMessage, 500);
	}
});
test("throw UserError with the given message", () => {
	const errorMessage = "UserError error";
	try {
		throw new UserError("UserError", errorMessage, {
			info: "hello",
		});
	} catch (e: unknown) {
		const error = e as UserError;
		expect(error).toBeInstanceOf(UserError);
		assertErrorProps(error, "UserError", errorMessage, 400);
	}
});
test("throw InputError with the given message", () => {
	const errorMessage = "InputError error";
	try {
		throw new InputError(errorMessage);
	} catch (e: unknown) {
		const error = e as InputError;
		expect(error).toBeInstanceOf(InputError);
		expect(error).toBeInstanceOf(UserError);
		assertErrorProps(error, "InputError", errorMessage, 401);
	}
});
test("throw AuthError with the given message", () => {
	const errorMessage = "AuthError error";
	try {
		throw new AuthError(errorMessage);
	} catch (e: unknown) {
		const error = e as AuthError;
		expect(error).toBeInstanceOf(AuthError);
		expect(error).toBeInstanceOf(UserError);
		assertErrorProps(error, "AuthError", errorMessage, 403);
	}
});
test("throw NotFoundError with the given message", () => {
	const errorMessage = "NotFoundError error";
	try {
		throw new NotFoundError(errorMessage);
	} catch (e: unknown) {
		const error = e as NotFoundError;
		expect(error).toBeInstanceOf(NotFoundError);
		expect(error).toBeInstanceOf(UserError);
		assertErrorProps(error, "NotFoundError", errorMessage, 404);
	}
});
