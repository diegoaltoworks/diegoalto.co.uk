const { cleanEnv, str } = require("envalid");

const env = cleanEnv(process.env, {
	SITE_NAME: str(),
	EMAIL_SENDER: str(),
	EMAIL_DOMAIN: str(),
	EMAIL_APIKEY: str(),
	EMAIL_POSTMAN: str(),
	EMAIL_RECIPIENT: str(),
	NEXT_PUBLIC_GITHUB_USERNAME: str(),
	NEXT_PUBLIC_SENTRY_DSN: str(),
	SENTRY_ORG: str(),
	SENTRY_PROJECT: str(),
	VERCEL_TOKEN: str(),
	VERCEL_ORG_ID: str(),
	VERCEL_PROJECT_ID: str(),
});

//TODO:
// add dev defaults
//	const env = cleanEnv(process.env, {
//		SOME_VAR: envalid.str({ devDefault: testOnly("myTestValue") }),
//	});

module.exports = { env };
