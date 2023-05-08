"use client";

import { signOut } from "next-auth/react";

type Props = {};

const Users = (props: Props) => {
  return <button onClick={() => signOut()}>logout</button>;
};

export default Users;
