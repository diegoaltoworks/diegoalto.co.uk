"use client";
import { trpc } from "@/utils/trpc/client";

export default function Page() {
	const helloNoArgs = trpc.test.useQuery();
	console.log({ helloNoArgs });

	return (
		<>
			tRPC says hello (CSR):
			<br />
			{helloNoArgs.data}
		</>
	);
}
