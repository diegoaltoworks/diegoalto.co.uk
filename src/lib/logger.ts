import winston from "winston";
import Sentry from "winston-transport-sentry-node";

const { combine, timestamp, json } = winston.format;

const sentry = new Sentry({
	sentry: {
		dsn: process.env.SENTRY_DSN,
	},
	level: "info",
});

const logger = winston.createLogger({
	level: "info",
	format: combine(timestamp(), json()),
	transports: [new winston.transports.Console(), sentry],
});

export { logger };
