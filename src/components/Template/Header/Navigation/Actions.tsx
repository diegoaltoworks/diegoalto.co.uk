"use client";
import React from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";

import icons from "@/components/Template/Icons";
const { LoginIcon, LogoutIcon, ChatIcon, TelegramIcon, BotIcon } = icons;

const actions = {
	main: {
		items: [
			{ text: "Bot", link: "bot", icon: <BotIcon /> },
			{ text: "Chat", link: "chat", icon: <ChatIcon /> },
			//TODO: Implement these
			//{ text: "Telegram", link: "telegram", icon: <TelegramIcon /> },
			//{ text: "Logout", link: "logout", icon: <LogoutIcon /> },
			{ text: "Login", link: "login", icon: <LoginIcon /> },
		],
	},
};

export const Actions: React.FC = () => {
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
			//value={pathname}
			//onChange={onChange}
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
