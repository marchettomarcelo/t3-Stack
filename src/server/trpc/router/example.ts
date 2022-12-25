import { z } from "zod";

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
});
