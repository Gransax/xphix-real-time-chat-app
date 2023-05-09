import { useMemo } from "react";
import { HiChat } from "react-icons/hi";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import useConversation from "./useConversation";
import { HiArrowLeftOnRectangle, HiUser } from "react-icons/hi2";

const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();
  const routes = useMemo(
    () => [
      {
        label: "Chat",
        href: "/conversations",
        icon: HiChat,
        active: pathname === "/conversations" || !!conversationId,
      },
      {
        label: "Users",
        href: "/users",
        icon: HiUser,
        active: pathname === "/users",
      },
      {
        label: "Logout",
        href: "#",
        onClick: () => signOut(),
        icon: HiArrowLeftOnRectangle,
      },
    ],
    [pathname, conversationId]
  );

  return routes;
};

export default useRoutes;
