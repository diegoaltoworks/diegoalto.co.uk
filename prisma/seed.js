const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
	await prisma.user.create({
		data: {
			name: "Diego",
			email: "diego@diegoalto.co.uk",
		},
	});
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
