import * as React from "react";
import icons from "@/components/Template/Icons";
const { HomeIcon, ContactIcon, ProjectsIcon, AboutIcon } = icons;
import {
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import Link from "next/link";

const menu = {
	main: {
		items: [
			{
				text: "Home",
				link: "home",
				icon: <HomeIcon />,
			},
			{
				text: "About",
				link: "about",
				icon: <AboutIcon />,
			},
			{
				text: "Projects",
				link: "projects",
				icon: <ProjectsIcon />,
			},
			{
				text: "Contact",
				link: "contact",
				icon: <ContactIcon />,
			},
		],
	},
};

export const Menu: React.FC = () => {
	return (
		<List sx={{ width: "100%" }}>
			{menu.main.items.map(({ text, link, icon }, index) => (
				<ListItem key={text} disablePadding>
					<ListItemButton component={Link} href={link}>
						<ListItemIcon>{icon}</ListItemIcon>
						<ListItemText primary={text} />
					</ListItemButton>
				</ListItem>
			))}
		</List>
	);
};
