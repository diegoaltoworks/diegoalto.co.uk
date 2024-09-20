"use client";
import { SignUp } from "@clerk/nextjs";

export const Register = () => {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				//height: '100vh',
			}}
		>
			<SignUp
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
