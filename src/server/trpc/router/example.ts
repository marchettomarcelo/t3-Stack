import { date, z } from "zod";

import { router, publicProcedure } from "../trpc";

export const exampleRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greetings: `Hello ${input?.text ?? "world"}`,
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
  olaMundo: publicProcedure.query(async ({ ctx }) => {
    const nome = await ctx.prisma.teste.findMany();

    return {
      greetings: nome,
    };
  }),
  addMsg: publicProcedure
    .input(z.object({ msg: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const ret = await ctx.prisma.teste.create({
        data: {
          msg: input.msg,
        },
      });

      return ret;
    }),
  allMsgs: publicProcedure.query(async ({ ctx }) => {
    const msgs = await ctx.prisma.teste.findMany();
    return msgs;
  }),

  deleteMsg: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const resp = await ctx.prisma.teste.delete({
        where: {
          id: input.id,
        },
      });
      return resp;
    }),
});
