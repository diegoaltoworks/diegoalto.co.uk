import React from "react";
import Metadata from "@/lib/metadata";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
const inter = Inter({ subsets: ["latin"] });

export const metadata = Metadata;

const RootLayout = ({ children }: React.PropsWithChildren) => (
	<html lang="en">
		<head>
			<link
				href="https://fonts.googleapis.com/icon?family=Material+Icons"
				rel="stylesheet"
			></link>
		</head>
		<body className={inter.className}>
			<AppRouterCacheProvider>{children}</AppRouterCacheProvider>
		</body>
	</html>
);

export default RootLayout;
