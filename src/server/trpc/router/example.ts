import { z } from "zod";

import { router } from "../trpc";
import { protectedProcedure } from "../trpc";

export const exampleRouter = router({
  addMsg: protectedProcedure
    .input(z.object({ msg: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const ret = await ctx.prisma.notas.create({
        data: {
          msg: input.msg,
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });

      return ret;
    }),
  allMsgs: protectedProcedure.query(async ({ ctx }) => {
    const msgs = await ctx.prisma.notas.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
    return msgs;
  }),

  deleteMsg: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const resp = await ctx.prisma.notas.delete({
        where: {
          id: input.id,
        },
      });
      return resp;
    }),
});
