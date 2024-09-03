"use client";
import React from "react";
import Link from "next/link";
import { metadata } from "@/lib/metadata";
import { Navigation } from "@/components/Navigation";

const App: React.FC = ({ children }: React.PropsWithChildren) => {
	return (
		<div>
			<header>
				<Navigation />
			</header>
			<main>{children}</main>
			<footer>
				<p>&copy; {metadata.title}</p>
			</footer>
		</div>
	);
};

export default App;
