const { cleanEnv, str } = require("envalid");

const env = cleanEnv(process.env, {
	SITE_NAME: str(),
	NEXT_PUBLIC_GITHUB_USERNAME: str(),
	NEW_RELIC_PASSKEY: str(),
	NEW_RELIC_APP_NAME: str(),
	NEW_RELIC_LICENSE_KEY: str(),
	NEXT_PUBLIC_NEW_RELIC_BROWSER_KEY: str(),
	NEXT_PUBLIC_SENTRY_DSN: str(),
	SENTRY_ORG: str(),
	SENTRY_PROJECT: str(),
	VERCEL_TOKEN: str(),
	VERCEL_ORG_ID: str(),
	VERCEL_PROJECT_ID: str(),
	EMAIL_SENDER: str(),
	EMAIL_DOMAIN: str(),
	EMAIL_APIKEY: str(),
	EMAIL_POSTMAN: str(),
	EMAIL_RECIPIENT: str(),
	DAGGER_CLOUD_TOKEN: str(),
});

//TODO:
// add dev defaults
//	const env = cleanEnv(process.env, {
//		SOME_VAR: envalid.str({ devDefault: testOnly("myTestValue") }),
//	});

module.exports = { env };
