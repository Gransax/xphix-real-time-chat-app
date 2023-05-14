"use client";

import Modal from "@/app/components/Modal";
import Image from "next/image";
import React from "react";

type Props = {
  src?: string | null;
  isOpen?: boolean;
  onClose: () => void;
};

const ImageModal = ({ src, isOpen, onClose }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex items-center justify-center ">
        <Image
          src={src!}
          alt="image"
          className="object-cover rounded-lg"
          width={500}
          height={500}
        />
      </div>
    </Modal>
  );
};

export default ImageModal;
