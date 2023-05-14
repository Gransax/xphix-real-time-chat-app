"use client";
import { User } from "@prisma/client";
import React from "react";
import Image from "next/image";

type Props = {
  users?: Array<User>;
};

const AvatarGroup = ({ users = [] }: Props) => {
  const slicedUsers = users.slice(0, 3);
  const positionMap = {
    0: "top-0 left-[12px]",
    1: "bottom-0",
    2: "bottom-0 right-0",
  };

  return (
    <div
      className="
        relative
        h-11
        w-11
      "
    >
      {slicedUsers.map((user, index) => {
        const stringAvatar = user?.name
          ? `https://ui-avatars.com/api?name=${user?.name}&background=random&color=fff`
          : null;
        return (
          <div
            key={user.id}
            className={`
            absolute 
            inline-block 
            rounded-full 
            overflow-hidden
            h-[21px]
            w-[21px]
            ${positionMap[index as keyof typeof positionMap]}
          `}
          >
            <Image
              alt="avatar"
              src={user?.image || stringAvatar || "/images/placeholder.jpg"}
              fill
            />
          </div>
        );
      })}
    </div>
  );
};

export default AvatarGroup;
