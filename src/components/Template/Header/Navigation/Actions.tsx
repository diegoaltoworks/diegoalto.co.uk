"use client";
import React from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";

import icons from "@/components/Template/Icons";
import { useAuth, useSignIn } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";

const { LoginIcon, LogoutIcon, ChatIcon, TelegramIcon, BotIcon } = icons;

export const Actions: React.FC = () => {
	const { isSignedIn, signOut } = useAuth();
	const router = useRouter();

	const actions = {
		main: {
			items: [
				{ text: "Bot", link: "bot", icon: <BotIcon /> },
				{ text: "Chat", link: "chat", icon: <ChatIcon /> },
				isSignedIn
					? { text: "Logout", link: "logout", icon: <LogoutIcon /> }
					: { text: "Login", link: "login", icon: <LoginIcon /> },
				//TODO: Implement these
				//{ text: "Telegram", link: "telegram", icon: <TelegramIcon /> },
			],
		},
	};

	const onChange = (event: React.SyntheticEvent, value: string) => {
		switch (value) {
			case "login":
				(window as any).location = "https://accounts.diegoalto.works/sign-in";
				break;
			case "logout":
				signOut();
				break;
			case "chat":
				console.log("chat");
				break;
			case "telegram":
				console.log("telegram");
				break;
			case "bot":
				console.log("bot");
				break;
			default:
				console.error("Unknown action", value);
				break;
		}
	};
	return (
		<BottomNavigation
			showLabels
			sx={{
				background: "primary.main",
				//position: "fixed",
				//bottom: 0,
				width: "100%",
				justifyContent: "center",
				display: "flex",
			}}
			onChange={onChange}
		>
			{actions.main.items.map(({ text, link, icon }, index) => (
				<BottomNavigationAction
					key={text}
					value={link}
					label={text}
					icon={icon}
				/>
			))}
		</BottomNavigation>
	);
};
