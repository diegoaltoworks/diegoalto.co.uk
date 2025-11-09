import { createCallerFactory, mergeRouters } from "./app";
import { chatRouter } from "./routers/chat";
import { helloRouter } from "./routers/hello";
import { testRouter } from "./routers/test";

export const appRouter = mergeRouters(helloRouter, testRouter, chatRouter);

export const createCaller = createCallerFactory(appRouter);

// Export only the type!
export type AppRouter = typeof appRouter;
