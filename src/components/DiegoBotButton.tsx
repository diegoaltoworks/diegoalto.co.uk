"use client";

import { useEffect, useRef } from "react";

import type { ChatButtonInstance } from "@/types/fyne";

export const DiegoBotButton: React.FC = () => {
	const chatButtonRef = useRef<ChatButtonInstance | null>(null);

	useEffect(() => {
		// Function to initialize the chat button
		const initChatButton = () => {
			if (typeof window !== "undefined" && window.Fyne?.ChatButton) {
				// Only initialize if not already done
				if (!chatButtonRef.current) {
					const apiKey = process.env.NEXT_PUBLIC_DIEGOBOT_API_KEY;
					chatButtonRef.current = new window.Fyne.ChatButton({
						host: "bot.diegoalto.app",
						mode: "public",
						...(apiKey && { apiKey }),
						position: "bottom-right",
						label: "💬",
						chatConfig: {
							title: "Chat with Diego",
							subtitle: "Ask me anything!",
							placeholder: "Type your message...",
						},
					});
				}
			}
		};

		// Check if Fyne is already loaded
		if (window.Fyne) {
			initChatButton();
		} else {
			// Wait for script to load
			const checkInterval = setInterval(() => {
				if (window.Fyne) {
					clearInterval(checkInterval);
					initChatButton();
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
			if (chatButtonRef.current) {
				try {
					chatButtonRef.current.destroy();
				} catch (error) {
					console.error("Error destroying chat button:", error);
				}
				chatButtonRef.current = null;
			}
		};
	}, []);

	// This component doesn't render anything visible
	// The Fyne.ChatButton handles its own rendering
	return null;
};

export default DiegoBotButton;
