"use client";
import useChat from "@/hooks/useChat";
import { useAuth } from "@clerk/nextjs";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";

export const Chat: React.FC = () => {
	const auth = useAuth();
	const userId = auth.userId;
	const { messages, input, setInput, handleSend } = useChat({ userId });

	return (
		<Paper
			elevation={3}
			sx={{ height: "100%", display: "flex", flexDirection: "column" }}
		>
			<Typography variant="h4" component="h1" sx={{ p: 2 }}>
				Chat with me
			</Typography>
			<Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
				{messages.map((message) => (
					<Box
						key={message.id}
						sx={{
							mb: 1,
							textAlign: message.sender === "user" ? "right" : "left",
						}}
					>
						<Typography
							variant="body1"
							component="div"
							sx={{
								display: "inline-block",
								p: 1,
								borderRadius: 1,
								bgcolor:
									message.sender === "user" ? "primary.main" : "grey.300",
								color:
									message.sender === "user"
										? "primary.contrastText"
										: "text.primary",
							}}
						>
							{message.text}
						</Typography>
					</Box>
				))}
			</Box>
			<Box sx={{ p: 2, display: "flex", alignItems: "center" }}>
				<TextField
					fullWidth
					variant="outlined"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onKeyPress={(e) => e.key === "Enter" && handleSend()}
					sx={{ mr: 1 }}
				/>
				<Button variant="contained" color="primary" onClick={handleSend}>
					Send
				</Button>
			</Box>
		</Paper>
	);
};

export default Chat;
