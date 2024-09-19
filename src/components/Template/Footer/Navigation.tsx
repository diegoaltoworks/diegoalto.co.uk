"use client";
import React from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useRouter, usePathname } from "next/navigation";

import Icons from "@/components/Template/Icons";
const { ContactIcon, ProjectsIcon, AboutIcon } = Icons;

export const Navigation: React.FC = () => {
	const pathname = usePathname();
	const router = useRouter();
	const onChange = (event: React.SyntheticEvent, newValue: string) => {
		console.log(newValue);
		router.push(`${newValue}`);
	};
	return (
		<BottomNavigation
			showLabels
			sx={{
				background: "primary.main",
				position: "fixed",
				bottom: 0,
				width: "100%",
				justifyContent: "center",
				display: {
					xs: "flex",
					sm: "none",
				},
			}}
			value={pathname}
			onChange={onChange}
		>
			<BottomNavigationAction
				value="/about"
				label="About"
				icon={<AboutIcon />}
			/>
			<BottomNavigationAction
				value="/projects"
				label="Projects"
				icon={<ProjectsIcon />}
			/>
			<BottomNavigationAction
				value="/contact"
				label="Contact"
				icon={<ContactIcon />}
			/>
		</BottomNavigation>
	);
};
