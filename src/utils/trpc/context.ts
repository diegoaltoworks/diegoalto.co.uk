import { type getAuth } from "@clerk/nextjs/server";

type AuthObject = ReturnType<typeof getAuth>;

export type TRPCContextInput = {
	headers?: Headers;
	auth?: AuthObject;
};

export const createTRPCContext = (opts: TRPCContextInput) => {
	return {
		...opts,
		auth: opts.auth,
	};
};
