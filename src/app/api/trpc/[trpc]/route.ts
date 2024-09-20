// TRPC API endpoint
// src/app/api/trpc/[trpc]/route.ts

import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { type NextRequest } from "next/server";

import { appRouter } from "@/utils/trpc/appRouter";
import { createTRPCContext } from "@/utils/trpc/context";
import { getAuth } from "@clerk/nextjs/server";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a HTTP request (e.g. when you make requests from Client Components).
 */

const createContext = async (req: NextRequest) => {
	return createTRPCContext({
		headers: req.headers,
		auth: getAuth(req),
	});
};

const handler = (req: NextRequest) =>
	fetchRequestHandler({
		endpoint: "/api/trpc",
		req,
		router: appRouter,
		createContext: () => createContext(req),
		onError:
			process.env.NODE_ENV === "development"
				? ({ path, error }: any) => {
						console.error(
							`❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
						);
				  }
				: undefined,
	});

export { handler as GET, handler as POST };
