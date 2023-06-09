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
        likes: true,
      },
      orderBy: {
        createdAt: "desc",
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

  getPostsByUserId: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { userId } = input;
      const { prisma } = ctx;

      const res = await prisma.tweet.findMany({
        where: {
          authorId: userId,
        },
        include: {
          author: true,
          likes: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      const uRes = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      return { res, uRes };
    }),

  deleteTweet: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      const { prisma } = ctx;

      const res = await prisma.tweet.delete({
        where: {
          id,
        },
      });

      return res;
    }),

  getPostByTweetId: publicProcedure
    .input(
      z.object({
        tweetId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { tweetId } = input;
      const { prisma } = ctx;

      const res = await prisma.tweet.findUnique({
        where: {
          id: tweetId,
        },
        include: {
          author: true,
          likes: true,
        },
      });

      return res;
    }),
});
