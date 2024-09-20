"use client";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase.config"; // Import the Firebase configuration
import { UUID } from "@/lib/uuid";
import {
	collection,
	addDoc,
	getDocs,
	query,
	where,
	orderBy,
} from "firebase/firestore";

interface Message {
	id: string;
	text: string;
	sender: "user" | "bot";
}

export const useChat = () => {
	const [messages, setMessages] = useState<Message[]>([]);
	const [input, setInput] = useState<string>("");
	const [chatId, setChatId] = useState<string | null>(null);

	// Fetch or create a chat ID from local storage
	useEffect(() => {
		let storedChatId = localStorage.getItem("chatId");
		if (!storedChatId) {
			storedChatId = UUID(); // Generate new UUID
			localStorage.setItem("chatId", storedChatId);
		}
		setChatId(storedChatId);
		loadChat(storedChatId);
	}, []);

	// Load chat messages from Firestore
	const loadChat = async (id: string) => {
		const q = query(
			collection(db, "chats"),
			where("chatId", "==", id),
			orderBy("timestamp", "asc")
		);
		const querySnapshot = await getDocs(q);
		const loadedMessages = querySnapshot.docs.map(
			(doc) => doc.data() as Message
		);
		setMessages(loadedMessages);
	};

	// Handle sending a message and storing it in Firestore
	const handleSend = async () => {
		if (input.trim() && chatId) {
			const newMessage: Message = {
				id: UUID(),
				text: input,
				sender: "user",
			};
			setMessages([...messages, newMessage]);
			setInput("");

			// Save the message to Firestore
			await addDoc(collection(db, "chats"), {
				...newMessage,
				chatId: chatId,
				timestamp: new Date(),
			});

			// Simulate bot response
			setTimeout(async () => {
				const botMessage: Message = {
					id: UUID(),
					text: "This is a bot response",
					sender: "bot",
				};
				setMessages((prevMessages) => [...prevMessages, botMessage]);

				// Save bot message to Firestore
				await addDoc(collection(db, "chats"), {
					...botMessage,
					chatId: chatId,
					timestamp: new Date(),
				});
			}, 1000);
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
