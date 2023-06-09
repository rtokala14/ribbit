import { createTRPCRouter } from "~/server/api/trpc";
import { tweetRouter } from "~/server/api/routers/tweets";
import { usersRouter } from "./routers/users";
import { likesRouter } from "./routers/likes";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  tweets: tweetRouter,
  users: usersRouter,
  likes: likesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
