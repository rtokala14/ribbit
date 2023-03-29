import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const usersRouter = createTRPCRouter({
  updateFirstTime: protectedProcedure
    .input(
      z.object({
        username: z.string().min(3).max(20),
        displayName: z.string().min(3).max(24),
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { username, displayName, id } = input;
      const { prisma } = ctx;

      const res = await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          name: username,
          displayName: displayName,
        },
      });

      console.log(res);

      return res;
    }),
});
