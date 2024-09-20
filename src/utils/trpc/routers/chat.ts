import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "@/utils/trpc/app";
import { UUID } from "@/lib/uuid";
import { prisma } from "@/utils/prisma/client";

export const chatRouter = router({
	chat: router({
		status: publicProcedure
			.input(z.void())
			.output(z.object({ online: z.boolean() }))
			.query(() => {
				//TODO: online indicator
				return { online: false };
			}),
		start: protectedProcedure
			.input(z.void())
			.output(z.object({ chatId: z.string() }))
			.query(() => {
				return { chatId: UUID() };
			}),
		create: protectedProcedure
			.input(
				z.object({
					title: z.string(),
					userId: z.string(),
				})
			)
			.output(z.object({ chatId: z.string() }))
			.mutation(async (opts) => {
				const { input } = opts;
				const result = await prisma.chat.create({
					data: {
						title: "Chat started at " + new Date().toLocaleString(),
						userId: input.userId,
						// createdAt: new Date(), // Remove this line as it is not a known property
					},
				});
				return { chatId: result.id };
			}),
		load: protectedProcedure
			.input(
				z.object({
					chatId: z.string(),
					userId: z.string(),
				})
			)
			.output(
				z.object({
					messages: z.array(
						z.object({
							id: z.string(),
							text: z.string(),
							sender: z.string(),
							userId: z.string(),
							chatId: z.string(),
							chat: z.any(),
							createdAt: z.date(),
							updatedAt: z.date(),
						})
					),
				})
			)
			.query(async (opts) => {
				const { input } = opts;
				const chat = await prisma.chat.findUnique({
					where: { id: input.chatId, userId: input.userId },
				});
				if (!chat) throw new Error("Chat not found");
				const messages = await prisma.message.findMany({
					where: { chatId: input.chatId },
				});
				return { messages };
			}),
	}),
	message: router({
		send: protectedProcedure
			.input(
				z.object({
					chatId: z.string(),
					userId: z.string(),
					text: z.string(),
					sender: z.string().optional(),
				})
			)
			.mutation(async (opts) => {
				const { input } = opts;
				const result = await prisma.message.create({
					data: {
						text: input.text,
						sender: input.sender || "user",
						userId: input.userId,
						chat: { connect: { id: input.chatId } },
					},
				});
				return { chatId: result.id };
			}),
	}),
});
