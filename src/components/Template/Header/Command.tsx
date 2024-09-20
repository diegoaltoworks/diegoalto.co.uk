import { Command } from "cmdk";
import { useEffect, useState } from "react";
import { Box, Button, Link } from "@mui/material";
import "./Command.scss";
import { useBodyClass } from "@/hooks/useBodyClass";
import Icons from "@/components/Template/Icons";
import { groups } from "@/components/Template/Header/Command.links";
import { useRouter } from "next/navigation";
const { HomeIcon, ContactIcon, ProjectsIcon, AboutIcon } = Icons;

export const toggleCommandMenu = (opts: CommandMenuOpts) => {
	const event = new CustomEvent("cmdk", {
		detail: opts,
	});
	document.dispatchEvent(event);
};
export const CommandMenu = () => {
	const [state, setState] = useState<CommandMenuOpts>({
		search: "",
		open: false,
	});
	useBodyClass(state.open ? ["cmdk-is-open"] : []);
	const router = useRouter();

	const onSelect = (value: any) => {
		switch (true) {
			case value.startsWith("http"):
				window.open(value, "_blank");
				break;

			case value.startsWith("/"):
				router.push(value);
				break;

			case value.startsWith("tel:"):
				window.open(value);
				break;

			default:
				console.error("Unknown command", value);
				return;
		}

		setState((state) => ({ ...state, open: false }));
	};

	const setSearch = (search: CommandMenuQuery) =>
		setState((state) => ({ ...state, search }));

	const setCommandMenu = (opts?: CommandMenuOpts) => {
		setState(
			(state) =>
				({
					...state,
					open: !state.open,
					...(opts || {}),
				} as CommandMenuOpts)
		);
	};

	// Toggle the menu when ⌘K is pressed
	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setCommandMenu();
			}
		};

		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, []);

	// Register event for other components to invoke this
	useEffect(() => {
		const open = (event: CommandMenuEvent) => {
			setCommandMenu(event.detail as CommandMenuOpts);
		};

		document.addEventListener("cmdk", open);
		return () => document.removeEventListener("cmdk", open);
	}, []);

	return (
		<Command.Dialog
			open={state.open}
			onOpenChange={(open) => setState((state) => ({ ...state, open }))}
			label="Global Command Menu"
		>
			<Command.Input value={state.search} onValueChange={setSearch} />
			<Command.List onSelect={onSelect}>
				<Command.Empty>
					<Box>
						<Box>No results found.</Box>
						<Box>
							<Button href="/contact">Contact me</Button>
						</Box>
					</Box>
				</Command.Empty>

				{Object.entries(groups).map(([group, items]) => (
					<Command.Group key={group} heading={group} title={group}>
						{Object.entries(items).map(([item, { text, link }]) => (
							<Command.Item
								key={item}
								value={link}
								keywords={text.split(" ")}
								onSelect={onSelect}
							>
								{text}
							</Command.Item>
						))}
					</Command.Group>
				))}
			</Command.List>
		</Command.Dialog>
	);
};
