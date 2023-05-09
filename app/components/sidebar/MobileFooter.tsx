"use client";

import useConversation from "@/app/hooks/useConversation";
import useRoutes from "@/app/hooks/useRoutes";
import React from "react";
import MobileItem from "./MobileItem";
import { User } from "@prisma/client";

type Props = {
  currentUser?: User;
};

const MobileFooter = ({ currentUser }: Props) => {
  const routes = useRoutes();
  const { isOpen } = useConversation();

  if (isOpen) {
    return null;
  }

  return (
    <div
      className="
        fixed
        justify-between
        w-full
        bottom-0
        z-40
        flex
        items-center
        bg-white
        border-t-[1px]
        lg:hidden
  "
    >
      {routes.map(({ label, href, icon, onClick, active }) => (
        <MobileItem
          key={`mobile-${label}`}
          label={label}
          href={href}
          icon={icon}
          active={active}
          onClick={onClick}
        />
      ))}
    </div>
  );
};

export default MobileFooter;
