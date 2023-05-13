"use client";

import useConversation from "@/app/hooks/useConversation";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiPhoto } from "react-icons/hi2";
import * as Yup from "yup";
import MessageInput from "./MessageInput";
import { HiPaperAirplane } from "react-icons/hi2";
import { CldUploadButton } from "next-cloudinary";

const validationSchema = Yup.object().shape({
  message: Yup.string().optional(),
});

type Props = {};

const ConversationForm = (props: Props) => {
  const { conversationId } = useConversation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    axios.post("/api/messages", {
      ...data,
      conversationId: conversationId,
    });
    setValue("message", "", { shouldValidate: true });
  };

  const handleUpload = (result: any) => {
    axios.post("/api/messages", {
      image: result?.info?.secure_url,
      conversationId: conversationId,
    });
  };
  return (
    <div
      className="
      py-4
      px-4
      bg-white 
      border-t
      flex
      items-center
      gap-2
      lg:gap-4
      w-full
        "
    >
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={handleUpload}
        uploadPreset="icpgvd2h"
      >
        <HiPhoto size={30} className="text-sky-500" />
      </CldUploadButton>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          placeholder="Write a message"
          required
        />
        <button
          type="submit"
          className="
            rounded-full
            p-2
            bg-sky-500
            cursor-pointer
            hover:bg-sky-600
            transition
          "
        >
          <HiPaperAirplane size={18} className="text-white" />
        </button>
      </form>
    </div>
  );
};

export default ConversationForm;
