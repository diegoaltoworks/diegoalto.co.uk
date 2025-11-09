import { publicProcedure, router } from "@/utils/trpc/app";

export const testRouter = router({
	test: publicProcedure.query(() => "hello tRPC v11!"),
});
