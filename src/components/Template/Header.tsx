import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Logo } from "./Header/Logo";
import { Search } from "./Header/Search";
import { Navigation } from "./Header/Navigation";
import { CommandMenu } from "./Header/Command";

export const Header: React.FC = () => {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<Logo />
					<Search />
					<CommandMenu />
					<Navigation />
				</Toolbar>
			</AppBar>
		</Box>
	);
};
