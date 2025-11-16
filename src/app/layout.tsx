import "./layout.scss";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ClerkProvider } from "@clerk/nextjs";
import { CssBaseline } from "@mui/material";
import { DiegoBotButton } from "@/components/DiegoBotButton";
import { Inter } from "next/font/google";
import Metadata from "@/lib/metadata";
import React from "react";
import { TRPCProvider } from "@/utils/trpc/client";
import { Theme } from "@/components/Template/Theme";

const inter = Inter({
	subsets: ["latin"],
	display: "swap",
	adjustFontFallback: false,
});

export const metadata = Metadata;

type RoootLayoutProps = {
	header: React.ReactNode;
	footer: React.ReactNode;
	children: React.ReactNode;
	auth: React.ReactNode;
};

const RootLayout = ({ children, header, footer, auth }: RoootLayoutProps) => {
	const isE2ETest = process.env.NEXT_PUBLIC_E2E_TEST === "true";

	return (
		<html lang="en">
			<head>
				<link
					href="https://fonts.googleapis.com/icon?family=Material+Icons"
					rel="stylesheet"
				></link>
				{!isE2ETest && (
					<>
						<link
							rel="stylesheet"
							href="https://bot.diegoalto.app/chatter.css"
						></link>
						<script src="https://bot.diegoalto.app/chatter.js" async></script>
					</>
				)}
			</head>
			<body className={inter.className}>
				<ClerkProvider>
					<TRPCProvider>
						<AppRouterCacheProvider>
							<CssBaseline />
							<Theme>
								{children}
								{header}
								{footer}
								{auth}
								{!isE2ETest && <DiegoBotButton />}
							</Theme>
						</AppRouterCacheProvider>
					</TRPCProvider>
				</ClerkProvider>
			</body>
		</html>
	);
};

export default RootLayout;
