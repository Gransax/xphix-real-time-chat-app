import prisma from "@/app/libs/prismaDB";
import getSession from "./getSession";

export default async function getUsers() {
  const session = await getSession();

  if (!session?.user?.email) {
    return [];
  }

  try {
    const users = await prisma.user.findMany({
      where: {
        NOT: { email: session.user.email },
      },
    });
    return users;
  } catch (error: any) {
    return [];
  }
}
