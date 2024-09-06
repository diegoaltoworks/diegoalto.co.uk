import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { logger } from "./logger";

export const NextAPIHandlerErrorWrapper = (
	handler: NextApiHandler
): NextApiHandler => {
	return async (req: NextApiRequest, res: NextApiResponse) => {
		// our own error boundary
		try {
			const result = res.json(await handler(req, res));
			res.status(200).json(result);
		} catch (error: Error | any) {
			if (error?.isOperationalError) {
				logger.error(error);
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
			result = await handler(data);
			return result;
		} catch (error: Error | any) {
			if (error?.isOperationalError) {
				logger.error(error);
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
