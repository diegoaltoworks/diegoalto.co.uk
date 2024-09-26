"use client";
import { useState, useEffect } from "react";
import { trpc } from "@/utils/trpc/client";
import ObjectID from "bson-objectid";
import { useLocalStorage } from "usehooks-ts";

type UseChatHookProps = { userId: string | null };
export const useChat = ({ userId }: UseChatHookProps) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [chatId, setChatId, clearChatId] = useLocalStorage<string | null>(
		"chatId",
		null,
	);

	const chatCreateMutation = trpc.chat.create.useMutation();

	const client = {
		chat: {
			create: chatCreateMutation,
		},
	};
	// Fetch or create a chat ID from local storage
	useEffect(() => {
		if (!userId) return;
		if (chatId) return;
		if (loading) return;
		setLoading(true);
		client.chat.create.mutate({
			id: ObjectID().toHexString(),
			userId,
			title: "Chat started at " + new Date().toLocaleString(),
		});
	}, [userId]);

	useEffect(() => {
		const chatId = client.chat.create.data?.chatId;
		if (!chatId) return;
		setChatId(chatId);
		setLoading(false);
	}, [client.chat.create.data?.chatId]);

	return { chatId, loading };
};

export default useChat;
