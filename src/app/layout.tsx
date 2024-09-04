import React from "react";
import Metadata from "@/lib/metadata";
import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { Theme } from "@/components/Template/Theme";
const inter = Inter({ subsets: ["latin"] });
import "./layout.scss";
import { CssBaseline } from "@mui/material";

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
			<AppRouterCacheProvider>
				<CssBaseline />
				<Theme>{children}</Theme>
			</AppRouterCacheProvider>
		</body>
	</html>
);

export default RootLayout;
