"use client";
import { Login } from "@/components/Auth/Login";
import { Dialog } from "@mui/material";

export default async function Page() {
	return (
		<Dialog open>
			<Login />
		</Dialog>
	);
}
