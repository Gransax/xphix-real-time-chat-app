import { User } from "@prisma/client";
import { useRouter } from "next/router";
import React, { useState } from "react";

type Props = {
  isOpen: boolean;
  currentUser?: User;
  onClose: () => void;
};

const SettingsModal = ({ isOpen, currentUser, onClose }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  return <div>SettingsModal</div>;
};

export default SettingsModal;
