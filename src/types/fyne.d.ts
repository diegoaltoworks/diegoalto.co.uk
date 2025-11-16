// Type definitions for Fyne chatbot library
// Loaded via CDN: https://bot.diegoalto.app/chatter.js

export interface ChatMessage {
	role: "user" | "assistant";
	content: string;
}

export interface ChatBotConfig {
	host: string;
	mode: "public" | "private";
	apiKey?: string;
	token?: string;
}

export interface ChatConfig extends ChatBotConfig {
	container: HTMLElement | string;
	title?: string;
	subtitle?: string;
	placeholder?: string;
	initialMessages?: ChatMessage[];
}

export interface ChatButtonConfig extends ChatBotConfig {
	position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
	label?: string;
	styles?: Partial<CSSStyleDeclaration>;
	chatConfig?: {
		title?: string;
		subtitle?: string;
		placeholder?: string;
	};
}

export interface ChatBotInstance {
	sendMessage: (message: string) => Promise<string>;
	sendConversation: (messages: ChatMessage[]) => Promise<string>;
	streamMessage: (
		message: string,
		callbacks: {
			onChunk: (delta: string) => void;
			onEnd?: () => void;
			onError?: (error: Error) => void;
		},
	) => Promise<void>;
	streamConversation: (
		messages: ChatMessage[],
		callbacks: {
			onChunk: (delta: string) => void;
			onEnd?: () => void;
			onError?: (error: Error) => void;
		},
	) => Promise<void>;
}

export interface ChatInstance {
	clear: () => void;
	getMessages: () => ChatMessage[];
	destroy: () => void;
}

export interface ChatButtonInstance {
	open: () => void;
	close: () => void;
	isOpened: () => boolean;
	destroy: () => void;
}

declare global {
	interface Window {
		Chatter?: {
			ChatBot: new (config: ChatBotConfig) => ChatBotInstance;
			Chat: new (config: ChatConfig) => ChatInstance;
			ChatButton: new (config: ChatButtonConfig) => ChatButtonInstance;
		};
	}
}

export {};
