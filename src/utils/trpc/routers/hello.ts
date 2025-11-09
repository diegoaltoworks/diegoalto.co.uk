import { z } from "zod";
import { publicProcedure, router } from "@/utils/trpc/app";

export const helloRouter = router({
	hello: publicProcedure
		.input(
			z.object({
				name: z.string(),
			})
		)
		.query((opts) => {
			return {
				greeting: `hello ${opts.input.name}`,
			};
		}),
});
