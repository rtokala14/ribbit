import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const tweetRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const { prisma } = ctx;

    const res = await prisma.tweet.findMany({
      include: {
        author: true,
      },
    });

    return res;
  }),

  createTweet: protectedProcedure
    .input(
      z.object({
        text: z.string().min(1).max(300),
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
