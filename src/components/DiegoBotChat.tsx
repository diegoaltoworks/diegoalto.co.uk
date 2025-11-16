"use client";

import { useEffect, useRef } from "react";

import { Box } from "@mui/material";
import type { ChatInstance } from "@/types/fyne";

export const DiegoBotChat: React.FC = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const chatRef = useRef<ChatInstance | null>(null);

	useEffect(() => {
		// Function to initialize the chat
		const initChat = () => {
			if (
				typeof window !== "undefined" &&
				window.Chatter?.Chat &&
				containerRef.current
			) {
				// Only initialize if not already done
				if (!chatRef.current) {
					const apiKey = process.env.NEXT_PUBLIC_DIEGOBOT_API_KEY;
					chatRef.current = new window.Chatter.Chat({
						host: "bot.diegoalto.app",
						mode: "public",
						...(apiKey && { apiKey }),
						container: containerRef.current,
						title: "Chat with Diego",
						subtitle: "Ask me anything about my work, projects, or experience!",
						placeholder: "Type your message here...",
					});
				}
			}
		};

		// Check if Chatter is already loaded
		if (window.Chatter) {
			initChat();
		} else {
			// Wait for script to load
			const checkInterval = setInterval(() => {
				if (window.Chatter) {
					clearInterval(checkInterval);
					initChat();
				}
			}, 100);

			// Cleanup interval after 10 seconds
			const timeout = setTimeout(() => {
				clearInterval(checkInterval);
			}, 10000);

			return () => {
				clearInterval(checkInterval);
				clearTimeout(timeout);
			};
		}

		// Cleanup on unmount
		return () => {
			if (chatRef.current) {
				try {
					chatRef.current.destroy();
				} catch (error) {
					console.error("Error destroying chat:", error);
				}
				chatRef.current = null;
			}
		};
	}, []);

	return (
		<Box
			ref={containerRef}
			sx={{
				width: "100%",
				height: "100%",
				minHeight: "600px",
				display: "flex",
				flexDirection: "column",
			}}
		/>
	);
};

export default DiegoBotChat;
