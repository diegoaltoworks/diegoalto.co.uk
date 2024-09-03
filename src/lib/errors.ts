import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

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

export const NextAPIHandlerErrorWrapper = (
	handler: NextApiHandler
): NextApiHandler => {
	return async (req: NextApiRequest, res: NextApiResponse) => {
		// our own error boundary
		try {
			//console.error("NextAPIHandlerErrorWrapper Exec:", {req});
			const result = res.json(await handler(req, res));
			res.status(200).json(result);
		} catch (error: Error | any) {
			if (error?.isOperationalError) {
				//console.error("NextAPIHandlerErrorWrapper Caught Error:", error);
				res
					.status(error.statusCode || 500)
					.json({ error: error.message, type: error.type, info: error.info });
			} else {
				res
					.status(error.statusCode || 400)
					.json({ error: error.message, type: error.type, info: error.info });
			}
		}
	};
};

export const NextActionErrorWrapper = (handler: Function): Function => {
	return async (data: any) => {
		let result;
		// our own error boundary
		try {
			//console.error("NextActionErrorWrapper Exec:", data);
			result = await handler(data);
		} catch (error: Error | any) {
			//console.error("NextActionErrorWrapper Caught Error:", error);
			if (error?.isOperationalError) {
				result = {
					status: error.statusCode || 500,
					error: error.message,
					type: error.type,
					info: error.info,
				};
			} else {
				result = {
					status: error.statusCode || 400,
					error: error.message,
					type: error.type,
					info: error.info,
				};
			}
			return result;
		}
	};
};
