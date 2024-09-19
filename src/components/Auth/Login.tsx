"use client";
import { SignIn } from "@clerk/nextjs";

export const Login = () => {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				//height: '100vh',
			}}
		>
			<SignIn
				appearance={{
					elements: {
						formButtonPrimary: {
							fontSize: 14,
							textTransform: "none",
							backgroundColor: "#333",
							color: "#fff",
							"&:hover, &:focus, &:active": {
								backgroundColor: "#555",
								color: "#fff",
							},
						},
					},
				}}
			/>
		</div>
	);
};
