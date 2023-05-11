import prisma from "@/app/libs/prismaDB";
import getCurrentUser from "./getCurrentUser";

export default async function getConversationById(id: string) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.email || !currentUser?.id) {
      return null;
    }

    const conversations = await prisma.conversation.findMany({
      where: {
        id: id,
        usersIds: {
          has: currentUser.id,
        },
      },
      include: {
        users: true,
      },
    });

    return conversations[0];
  } catch (error: any) {
    return null;
  }
}
