class BaseError extends Error {
	public isOperationalError: boolean;
	public statusCode: number;
	public type: string;
	public info: any;

	constructor(
		type: string,
		statusCode: number,
		message: string,
		info?: any,
		isOperationalError = false
	) {
		super(message);
		this.statusCode = statusCode;
		this.name = this.constructor.name;
		this.type = type;
		this.info = info;
		this.isOperationalError = isOperationalError;
		Error.captureStackTrace(this, this.constructor);
	}
}

export class AppError extends BaseError {
	constructor(
		type: string,
		message: string,
		info?: any,
		statusCode: number | undefined | null = 500
	) {
		super(type, statusCode || 500, message, info, true);
	}
}
export class ExternalError extends AppError {
	constructor(message: string, info?: any) {
		super("ExternalError", message, info);
	}
}
export class ConfigError extends AppError {
	constructor(message: string, info?: any) {
		super("ConfigError", message, info);
	}
}

export class UserError extends BaseError {
	constructor(
		type: string,
		message: string,
		info?: any,
		statusCode: number | undefined | null = 400
	) {
		super(type, statusCode || 400, message, info);
	}
}
export class InputError extends UserError {
	constructor(message: string, info?: any) {
		super("InvalidInput", message, info);
	}
}
export class AuthError extends UserError {
	constructor(message: string, info?: any) {
		super("NotAuthorized", message, info);
	}
}
export class NotFoundError extends UserError {
	constructor(message: string, info?: any) {
		super("NotFound", message, info, 404);
	}
}
