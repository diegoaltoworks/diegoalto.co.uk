import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { SwipeableDrawer } from "@mui/material";
import { Menu } from "./Navigation/Menu";
import { useBodyClass } from "@/hooks/useBodyClass";

export const Navigation: React.FC = () => {
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

	return (
		<>
			<Box sx={{ flexGrow: 0 }}>
				<IconButton
					size="large"
					edge="end"
					color="inherit"
					aria-label="open drawer"
					sx={{ lf: 2 }}
					onClick={toggleDrawer(true)}
				>
					<MenuIcon />
				</IconButton>
			</Box>

			<SwipeableDrawer
				anchor={"right"}
				open={state.open}
				onClose={toggleDrawer(false)}
				onOpen={toggleDrawer(true)}
			>
				<Menu />
			</SwipeableDrawer>
		</>
	);
};
