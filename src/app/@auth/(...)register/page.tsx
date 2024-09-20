"use client";
import { Register } from "@/components/Auth/Register";
import { Dialog } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Page() {
	const router = useRouter();

	return (
		<Dialog open onClose={() => router.back()}>
			<Register />
		</Dialog>
	);
}
