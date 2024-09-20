import { initTRPC, TRPCError } from "@trpc/server";
import { createTRPCContext } from "@/utils/trpc/context";
import { ZodError } from "zod";
import superjson from "superjson";

const t = initTRPC.context<typeof createTRPCContext>().create({
	transformer: superjson,
	errorFormatter({ shape, error }) {
		return {
			...shape,
			data: {
				...shape.data,
				zodError:
					error.cause instanceof ZodError ? error.cause.flatten() : null,
			},
		};
	},
});

export const createCallerFactory = t.createCallerFactory;
export const mergeRouters = t.mergeRouters;
export const router = t.router;

export const publicProcedure = t.procedure;

const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
	console.log("enforceUserIsAuthed", ctx.auth);
	if (!ctx.auth?.userId) {
		throw new TRPCError({ code: "UNAUTHORIZED" });
	}
	// Make ctx.userId non-nullable in protected procedures
	return next({ ctx: { auth: ctx.auth } });
});

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);
