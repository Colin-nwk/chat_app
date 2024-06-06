import Conversation from "./Conversation";

const ConversationList = () => {
  return (
    <div className="flex flex-col py-2 overflow-auto">
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
    </div>
  );
};

export default ConversationList;
