"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton, SwipeableDrawer } from "@mui/material";
import { Menu } from "./Navigation/Menu";
import { useBodyClass } from "@/hooks/useBodyClass";
import { Actions } from "./Navigation/Actions";
import { usePathname } from "next/navigation";

export const Navigation: React.FC = () => {
	const pathname = usePathname();
	const [state, setState] = React.useState<{ open: boolean }>({ open: false });
	useBodyClass(state.open ? ["navigation-is-open"] : []);

	const toggleDrawer =
		(open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
			if (
				event &&
				event.type === "keydown" &&
				((event as React.KeyboardEvent).key === "Tab" ||
					(event as React.KeyboardEvent).key === "Shift")
			) {
				return;
			}

			setState({ ...state, open });
		};
	const closeDrawerIfCurrent = (event: React.SyntheticEvent) => {
		if (
			event.target instanceof HTMLElement &&
			event.target.closest("a")?.getAttribute("href") === pathname
		) {
			toggleDrawer(false);
		}
	};

	return (
		<>
			<Box sx={{ flexGrow: 0 }}>
				<IconButton
					size="large"
					edge="end"
					color="inherit"
					aria-haspopup="true"
					aria-controls="menu"
					aria-expanded={state.open}
					data-testid="open-menu-button"
					sx={{ lf: 2 }}
					onClick={toggleDrawer(true)}
				>
					<MenuIcon />
				</IconButton>
			</Box>

			<SwipeableDrawer
				anchor={"right"}
				open={state.open}
				onClose={() => toggleDrawer(false)}
				onOpen={() => toggleDrawer(true)}
				onClickCapture={closeDrawerIfCurrent}
			>
				<Box
					sx={{
						display: "grid",
						height: "100%",
						gridTemplateRows: "auto 60px",
						width: 300,
					}}
				>
					<Menu />
					<Actions />
				</Box>
			</SwipeableDrawer>
		</>
	);
};
