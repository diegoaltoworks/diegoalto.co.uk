"use client";
import React from "react";
import { Copyright } from "./Footer/Copyright";
import { Navigation } from "./Footer/Navigation";

export const Footer: React.FC = () => {
	return (
		<footer style={{ width: "100%" }}>
			<Copyright />
			<Navigation />
		</footer>
	);
};
