"use client";
import { Login } from "@/components/Auth/Login";
import { Dialog } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Page() {
	const router = useRouter();

	return (
		<Dialog open onClose={() => router.back()}>
			<Login />
		</Dialog>
	);
}
