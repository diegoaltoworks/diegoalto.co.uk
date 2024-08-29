import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { constants } from "@/lib/constants";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	...constants
};


const RootLayout = ({ children }: React.PropsWithChildren) => (
	<html lang="en">
		<body>
			<AntdRegistry><body className={inter.className}>{children}</body></AntdRegistry>
		</body>
	</html>
);

export default RootLayout;
