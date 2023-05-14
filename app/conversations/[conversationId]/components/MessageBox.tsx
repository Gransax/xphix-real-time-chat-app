"use client";
import Avatar from "@/app/components/Avatar";
import { FullMessageType } from "@/app/types";
import { data } from "autoprefixer";
import clsx from "clsx";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import ImageModal from "./ImageModal";

type Props = {
  message: FullMessageType;
  isLast?: boolean;
};

const MessageBox = ({ isLast, message }: Props) => {
  const session = useSession();
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const isOwn = session?.data?.user?.email === message?.sender?.email;
  const seenList = (message.seen || [])
    .filter((user) => user.email !== message?.sender?.email)
    .map((user) => user.name)
    .join(",");

  const container = clsx("flex gap-3 p-4", isOwn && "justify-end");
  const avatar = clsx(isOwn && "order-2");
  const body = clsx("flex flex-col gap-2", isOwn && "items-end");
  const messageCls = clsx(
    "text-sm w-fit overflow-hidden",
    isOwn ? "bg-sky-500 text-white" : "bg-gray-100",
    message.image ? "rounded-md p-0" : "rounded-full py-2 px-3"
  );

  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar user={message.sender} />
      </div>
      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500">{message.sender.name}</div>
          <div className="text-xs text-gray-400">
            {format(new Date(message.createdAt), "p")}
          </div>
        </div>
        <div className={messageCls}>
          <ImageModal
            src={message.image}
            isOpen={isImageModalOpen}
            onClose={() => setIsImageModalOpen(false)}
          />
          {message.image ? (
            <Image
              onClick={() => setIsImageModalOpen(true)}
              src={message.image}
              alt="messageImg"
              width={288}
              height={288}
              className="
                cursor-pointer
                object-cover 
                hover:scale-110
                transition
                translate
              "
            />
          ) : (
            <div>{message.body}</div>
          )}
        </div>
        {isLast && isOwn && seenList.length > 0 && (
          <div
            className="
              text-xs
              font-light
              text-gray-500
            "
          >{`Seen by ${seenList}`}</div>
        )}
      </div>
    </div>
  );
};

export default MessageBox;
