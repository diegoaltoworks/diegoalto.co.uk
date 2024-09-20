"use client";
import { useState, useEffect, useMemo } from "react";
import { UUID } from "@/lib/uuid"; // Assuming you're using a UUID library to generate IDs.
import { trpc } from "@/utils/trpc/client";

interface Message {
	id: string;
	user: string;
	text: string;
	sender: "user" | "bot";
	createdAt: Date;
}

type UseChatHookProps = { userId: string };
export const useChat = ({ userId }: UseChatHookProps) => {
	const [messages, setMessages] = useState<Message[]>([]);
	const [input, setInput] = useState<string>("");
	const [chatId, setChatId] = useState<string | null>(null);

	const chatLoadQuery = null;
	const chatCreateMutation = trpc.chat.create.useMutation();
	const messageSendMutation = trpc.message.send.useMutation();

	const client = {
		chat: {
			load: chatLoadQuery,
			create: chatCreateMutation,
		},
		message: {
			send: messageSendMutation,
		},
	};
	// Fetch or create a chat ID from local storage
	useEffect(() => {
		if (chatId) return;
		let storedChatId = localStorage.getItem("chatId");
		if (storedChatId) {
			loadChat(storedChatId);
			return;
		}
		console.log("Creating chat...", { messages, input, chatId });
		client.chat.create.mutate({
			userId,
			title: "Chat started at " + new Date().toLocaleString(),
		});
	}, []);

	useEffect(() => {
		const chatId = client.chat.create.data?.chatId;
		if (!chatId) return;
		localStorage.setItem("chatId", chatId);
		setChatId(chatId);
	}, [client.chat.create.data?.chatId]);

	// Load chat messages from Prisma
	const loadChat = async (id: string) => {
		try {
			let chat = { messages: [] };

			if (chat) {
				setMessages(chat.messages as unknown[] as Message[]);
			}
		} catch (error) {
			console.error("Error loading chat:", error);
		}
	};

	// Handle sending a message and storing it in MongoDB via Prisma
	const handleSend = async () => {
		if (input.trim() && chatId) {
			const newMessage: Message = {
				id: UUID(),
				user: userId,
				text: input,
				sender: "user",
				createdAt: new Date(),
			};
			setMessages([...messages, newMessage]);
			setInput("");

			// Save the message to MongoDB via Prisma
			try {
				client.message.send.mutate({
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

export default useChat;
