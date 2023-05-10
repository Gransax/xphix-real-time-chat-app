import { useSession } from "next-auth/react";

import { useMemo } from "react";
import { FullConversationType } from "../types";
import { User } from "@prisma/client";

const useOtherUser = (
  conversation:
    | FullConversationType
    | {
        users: User[];
      }
) => {
  const session = useSession();

  const currentUserEmail = session?.data?.user?.email;

  const otherUser = useMemo(() => {
    const otherUser = conversation.users.filter(
      (user) => user.email !== currentUserEmail
    );
    return otherUser[0];
  }, [currentUserEmail, conversation.users]);

  return otherUser;
};

export default useOtherUser;
