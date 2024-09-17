"use client";
import React from "react";
import { metadata } from "@/lib/metadata";
import { Box } from "@mui/material";

export const Copyright: React.FC = () => {
	return (
		<Box
			sx={(theme) => ({
				width: "100%",
				height: ["1rem", "100%"],
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				borderTop: "solid 1px",
				borderColor: theme.palette.primary.main,
				textAlign: "center",
				bottom: ["1rem", "0"],
				position: ["relative"],
				color: [theme.palette.primary.contrastText, theme.palette.primary.main],
				background: [theme.palette.primary.light, "none"],
				fontSize: ["0.5rem", "0.75rem"],
			})}
		>
			&copy; {new Date().getFullYear()} {`${metadata.title}`}
		</Box>
	);
};
