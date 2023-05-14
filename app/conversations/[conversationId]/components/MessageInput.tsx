"use client";
import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

type Props = {
  id: string;
  type?: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  placeholder?: string;
  required?: boolean;
};

const MessageInput = ({
  id,
  type,
  register,
  errors,
  placeholder,
  required,
}: Props) => {
  return (
    <div className="relative w-full">
      <input
        id={id}
        type={type}
        {...register(id, { required })}
        placeholder={placeholder}
        className="
            text-black 
            font-light
            py-2
            px-4
            bg-neutral-100
            w-full
            rounded-full
            focus:outline-none
        "
      />
    </div>
  );
};

export default MessageInput;
