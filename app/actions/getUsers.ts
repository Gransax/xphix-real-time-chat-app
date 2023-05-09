import prisma from "@/app/libs/prismaDB";
import getSession from "./getSession";

export default async function getUsers() {
  const session = await getSession();

  if (!session?.user?.email) {
    console.log("Error : no email address");
    return [];
  }

  try {
    const users = await prisma.user.findMany({
      where: {
        NOT: { email: session.user.email },
      },
    });
    console.log("users :", users);
    return users;
  } catch (error: any) {
    console.log("Error : ", error?.message);
    return [];
  }
}
