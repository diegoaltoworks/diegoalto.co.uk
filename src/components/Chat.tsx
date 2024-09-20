"use client";
import React, { useState } from "react";

interface Message {
	id: number;
	text: string;
	sender: "user" | "bot";
}

export const Chat: React.FC = () => {
	const [messages, setMessages] = useState<Message[]>([]);
	const [input, setInput] = useState<string>("");

	const handleSend = () => {
		if (input.trim()) {
			const newMessage: Message = {
				id: messages.length + 1,
				text: input,
				sender: "user",
			};
			setMessages([...messages, newMessage]);
			setInput("");
			// Simulate bot response
			setTimeout(() => {
				const botMessage: Message = {
					id: messages.length + 2,
					text: "This is a bot response",
					sender: "bot",
				};
				setMessages((prevMessages) => [...prevMessages, botMessage]);
			}, 1000);
		}
	};

	return (
		<div className="chat-container">
			<h1>Chat with me</h1>
			<div className="messages">
				{messages.map((message) => (
					<div key={message.id} className={`message ${message.sender}`}>
						{message.text}
					</div>
				))}
			</div>
			<div className="input-container">
				<input
					type="text"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onKeyPress={(e) => e.key === "Enter" && handleSend()}
				/>
				<button onClick={handleSend}>Send</button>
			</div>
		</div>
	);
};

export default Chat;
