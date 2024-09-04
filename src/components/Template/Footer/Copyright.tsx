"use client";
import React from "react";
import { metadata } from "@/lib/metadata";
import { Box } from "@mui/material";

export const Copyright: React.FC = () => {
	return (
		<Box
			sx={{
				width: "100%",
				height: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				borderTop: "solid 1px",
				borderColor: "divider",
				textAlign: "center",
			}}
		>
			&copy; {new Date().getFullYear()} {`${metadata.title}`}
		</Box>
	);
};
