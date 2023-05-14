"use client";

import useActiveChannel from "../hooks/useActiveChannel";

type Props = {};

const ActiveStatus = (props: Props) => {
  useActiveChannel();
  return null;
};

export default ActiveStatus;
