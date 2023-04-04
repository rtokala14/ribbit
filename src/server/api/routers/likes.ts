import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const likesRouter = createTRPCRouter({
  likeTweet: protectedProcedure
    .input(
      z.object({
        tweetId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { tweetId } = input;
      const { prisma, session } = ctx;

      const userId = session.user.id;

      const res = await prisma.like.create({
        data: {
          tweet: {
            connect: {
              id: tweetId,
            },
          },
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });

      // const tweet = await prisma.tweet.findUnique({
      //   where: {
      //     id: tweetId,
      //   },
      //   include: {
      //     author: true,
      //     likes: true,
      //   },
      // });

      return res;
    }),

  unlikeTweet: protectedProcedure
    .input(
      z.object({
        tweetId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { tweetId } = input;
      const { prisma, session } = ctx;

      const userId = session.user.id;

      const res = await prisma.like.deleteMany({
        where: {
          tweetId,
          userId,
        },
      });

      return res;
    }),
});
