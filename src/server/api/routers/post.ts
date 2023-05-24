import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ content: z.string() }))
    .mutation(async ({ input: { content }, ctx }) => {
      return await ctx.prisma.post.create({
        data: { content, userId: ctx.session.user.id },
      });
    }),

  toggleLike: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input: { id }, ctx }) => {
      const userIdWithPostId = { userId: ctx.session.user.id, postId: id };
      const existingLike = await ctx.prisma.like.findUnique({
        where: { userId_postId: userIdWithPostId },
      });

      if (!existingLike) {
        await ctx.prisma.like.create({ data: userIdWithPostId });
        return { addedLike: true };
      }

      await ctx.prisma.like.delete({
        where: { userId_postId: userIdWithPostId },
      });
      return { addedLike: false };
    }),

  // Allows to get posts infinitely based on post cursor
  latestPosts: publicProcedure
    .input(
      z.object({
        limit: z.number().optional(),
        cursor: z.object({ id: z.string(), createdAt: z.date() }).optional(),
      })
    )
    .query(async ({ input: { limit = 10, cursor }, ctx }) => {
      const currentUserId = ctx.session?.user?.id;

      const posts = await ctx.prisma.post.findMany({
        // Take next item after the cursor
        take: limit + 1,
        cursor: cursor ? { createdAt_id: cursor } : undefined,
        // ID is specified here in case there are posts with same createdAt value
        orderBy: [{ createdAt: "desc" }, { id: "desc" }],
        select: {
          id: true,
          content: true,
          createdAt: true,
          _count: { select: { likes: true } },
          likes: currentUserId ? { where: { userId: currentUserId } } : false,
          user: { select: { id: true, name: true, image: true } },
        },
      });

      let nextCursor: typeof cursor | undefined;
      const databaseHasMorePosts = posts.length > limit;
      if (databaseHasMorePosts) {
        const nextPost = posts.pop();
        nextCursor = nextPost
          ? { id: nextPost.id, createdAt: nextPost.createdAt }
          : undefined;
      }

      return {
        posts: posts.map((post) => ({
          ...post,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          likedByMe: !!post?.likes?.length,
        })),
        nextCursor,
      };
    }),
});
