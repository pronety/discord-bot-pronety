import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createNewVerification(email: string, discord_id: string) {
  const key = crypto.randomUUID();
  await prisma.verifying.create({
    data: {
      key,
      email,
      discord_id,
    },
  });
  return key;
}

export async function getVerification(key: string) {
  const data = await prisma.verifying.findUnique({
    where: {
      key,
    },
  });

  if (data) {
    prisma.verifying.delete({
      where: {
        key,
      },
    });
  }

  return data;
}
