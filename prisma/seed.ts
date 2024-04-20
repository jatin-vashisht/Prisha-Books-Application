import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: {
      email: "abc@gmail.com",
    },
    update: {},
    create: {
      email: "abc@gmail.com",
      name: "abc",
      username: "abc",
      bio: "Hey",
      image: "",
      onboarded: true,
    },
  });

  console.log({ user });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
