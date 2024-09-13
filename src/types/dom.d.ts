declare global {
	type CommandMenuQuery = string | undefined;

	interface CommandMenuOpts {
		open: boolean;
		search: CommandMenuQuery;
	}

	type CommandMenuEvent = CustomEvent<CommandMenuOpts>;

	interface GlobalEventHandlersEventMap {
		cmdk: CommandMenuEvent;
	}
}
export {};
