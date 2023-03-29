import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const tweetRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  createTweet: protectedProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { text } = input;
      const { prisma, session } = ctx;

      const userId = session.user.id;

      const res = await prisma.tweet.create({
        data: {
          content: text,
          author: {
            connect: {
              id: userId,
            },
          },
        },
      });

      return res.id;
    }),
});
