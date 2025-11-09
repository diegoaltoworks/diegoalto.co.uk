import "server-only";

import { createServerSideHelpers } from "@trpc/react-query/server";
import { createTRPCContext, TRPCContextInput } from "./context";
import { appRouter } from "./appRouter";
import superjson from "superjson";

export const makeHelper = (context: TRPCContextInput) => {
	return createServerSideHelpers({
		router: appRouter,
		ctx: createTRPCContext(context),
		transformer: superjson,
	});
};

export const trpc = makeHelper({});
