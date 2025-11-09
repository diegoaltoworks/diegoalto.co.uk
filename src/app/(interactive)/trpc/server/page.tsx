import { trpc } from "@/utils/trpc/helpers";

export default async function Page() {
	const helloNoArgs = await trpc.test.fetch();
	console.log({ helloNoArgs });

	return (
		<>
			tRPC says hello (SSR):
			<br />
			{helloNoArgs}
		</>
	);
}
