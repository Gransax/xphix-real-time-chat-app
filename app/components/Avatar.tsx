"use client";

import { User } from "@prisma/client";
import Image from "next/image";
import React from "react";

type Props = {
  user: User;
};

const Avatar = ({ user }: Props) => {
  if (process.env.AVATAR_API && user?.name) {
  }

  const stringAvatar = user?.name
    ? `https://ui-avatars.com/api?name=${user?.name}&background=random&color=fff`
    : null;

  return (
    <div className="relative">
      <div
        className="
            relative
            inline-block
            rounded-full
            overflow-hidden
            h-9
            w-9
            md:h-11
            md:w-11
            "
      >
        <Image
          alt="avatar"
          src={user?.image || stringAvatar || "/images/placeholder.jpg"}
          fill
        />
      </div>
      <span
        className="
        absolute
        block
        rounded-full
        bg-green-500
        ring-2
        ring-white
        top-0
        right-0
        h-2
        w-2
        md:h-3
        md:w-3
      "
      />
    </div>
  );
};

export default Avatar;
