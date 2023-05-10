import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import ConversationList from "./components/ConversationList";
import getConversations from "../actions/getConversation";

type Props = {
  children: React.ReactNode;
};

const ConversationsLayout = async ({ children }: Props) => {
  const conversations = await getConversations();
  return (
    //@ts-expect-error Server Component
    <Sidebar>
      <ConversationList initialConversations={conversations} />
      <div className="h-full">{children}</div>
    </Sidebar>
  );
};

export default ConversationsLayout;
