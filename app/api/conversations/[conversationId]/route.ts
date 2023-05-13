import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismaDB";
import { useFieldArray } from "react-hook-form";

interface IParams {
  conversationId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { conversationId } = params;

    console.log("conversation id : ", conversationId);

    const existingConversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      include: {
        users: true,
      },
    });

    if (!existingConversation) {
      return new NextResponse("Conversation not found", { status: 404 });
    }

    const deletedConversation = await prisma.conversation.deleteMany({
      where: {
        id: conversationId,
        usersIds: { hasSome: [currentUser.id] },
      },
    });

    return NextResponse.json(deletedConversation);
  } catch (error: any) {
    console.log("DELETING_CONVERSATION_ERROR : ", error);
    return new NextResponse("Internal error!", { status: 500 });
  }
}
