"use client";
import { useState, useEffect } from "react";
import { UUID } from "@/lib/uuid"; // Assuming you're using a UUID library to generate IDs.
import { trpc } from "@/utils/trpc/client";

interface Message {
	chatId: string;
	userId: string;
	id?: string;
	text: string;
	sender: string; //"user" | "bot";
	createdAt?: Date;
	updatedAt?: Date;
}

type UseChatMessageHookProps = {
	chatId: string | null;
	userId: string | null;
};
export const useChatMessage = ({ chatId, userId }: UseChatMessageHookProps) => {
	const [messages, setMessages] = useState<Message[]>([]);
	const [input, setInput] = useState<string>("");

	const messageLoader = trpc.message.load.useQuery(
		{ userId: userId ?? "", chatId: chatId ?? "" },
		{ enabled: !!chatId && !!userId },
	);
	const messageSender = trpc.message.send.useMutation();

	useEffect(() => {
		if (!chatId) return;
		if (!userId) return;
		setMessages(messageLoader.data?.messages ?? []);
	}, [messageLoader.data]);

	// Handle sending a message and storing it in MongoDB via Prisma
	const handleSend = async () => {
		if (!userId) return;
		if (input.trim() && chatId) {
			const newMessage: Message = {
				id: UUID(),
				userId,
				chatId,
				text: input,
				sender: "user",
				createdAt: new Date(),
			};
			setMessages([...messages, newMessage]);
			setInput("");

			// Save the message to MongoDB via Prisma
			try {
				messageSender.mutate({
					userId: userId,
					text: newMessage.text,
					sender: newMessage.sender,
					chatId: chatId,
				});
				/*
				// Simulate bot response
				setTimeout(async () => {
					const botMessage: Message = {
						id: UUID(),
						user: "66edaa84f656a81405c400a7", //userId,
						text: "This is a bot response",
						sender: "bot",
						createdAt: new Date(),
					};
					setMessages((prevMessages) => [...prevMessages, botMessage]);

					// Save bot message to MongoDB via Prisma

					// await prisma.message.create({
					// 	data: {
					// 		id: botMessage.id,
					// 		user: { connect: { id: botMessage.user } },
					// 		text: botMessage.text,
					// 		sender: botMessage.sender,
					// 		createdAt: botMessage.createdAt,
					// 		chat: { connect: { id: chatId } },
					// 	},
					// });
				}, 1000);
				*/
			} catch (error) {
				console.error("Error sending message:", error);
			}
		}
	};

	return {
		messages,
		input,
		setInput,
		handleSend,
	};
};

export default useChatMessage;
