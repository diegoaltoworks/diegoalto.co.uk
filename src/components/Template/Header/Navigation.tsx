"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton, Drawer } from "@mui/material";
import { Menu } from "./Navigation/Menu";
import { useBodyClass } from "@/hooks/useBodyClass";
import { Actions } from "./Navigation/Actions";
import { usePathname } from "next/navigation";

export const Navigation: React.FC = () => {
	const pathname = usePathname();
	const [open, setOpen] = React.useState<boolean>(false);
	useBodyClass(open ? ["navigation-is-open"] : []);

	const toggleDrawer =
		(state: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
			if (
				event &&
				event.type === "keydown" &&
				((event as React.KeyboardEvent).key === "Tab" ||
					(event as React.KeyboardEvent).key === "Shift")
			) {
				return;
			}
			setOpen(state);
		};

	const closeDrawerIfLink = (event: React.SyntheticEvent) => {
		if (!(event.target instanceof HTMLElement)) return;
		const link = event.target.closest("a");
		const href = link?.getAttribute("href");
		const curr = href === pathname;
		const button = !link && event.target.closest("button");
		if (link || button) {
			setOpen(false);
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
					aria-expanded={open}
					data-testid="open-menu-button"
					sx={{ lf: 2 }}
					onClick={toggleDrawer(true)}
				>
					<MenuIcon />
				</IconButton>
			</Box>

			<Drawer
				anchor={"right"}
				open={open}
				onClose={toggleDrawer(false)}
				//onOpen={toggleDrawer(true)}
				//onClickCapture={toggleDrawer(false)}
				//onClickCapture={closeDrawerIfCurrent}
				onClickCapture={closeDrawerIfLink}
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
			</Drawer>
		</>
	);
};
