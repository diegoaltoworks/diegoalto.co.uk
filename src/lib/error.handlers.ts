import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { logger } from "./logger";
import { NextResponse } from "next/server";
import { BaseError, ErrorJSON } from "./errors";

type ApiHandler<T> = (req: NextApiRequest) => Promise<T>;

export const NextAPIHandlerErrorWrapper = <T extends Record<string, unknown>>(
	handler: ApiHandler<T>
): NextApiHandler<T | BaseError> => {
	return async (req: NextApiRequest, res: NextApiResponse) => {
		// our own error boundary
		try {
			const result = await handler(req);
			return Response.json(result);
		} catch (error: Error | any) {
			if (error?.isOperationalError) {
				logger.error(error);
			}
			return new Response(error, { status: error.statusCode });
		}
	};
};

export const NextActionErrorWrapper = (handler: Function): Function => {
	return async (data: any) => {
		let result;
		// our own error boundary
		try {
			result = await handler(data);
			return result;
		} catch (error: Error | any) {
			if (error?.isOperationalError) {
				logger.error(error);
			}
			return error.toJSON();
		}
	};
};
