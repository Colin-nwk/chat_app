import Conversation from "./Conversation";
import useGetConversation from "../hooks/useGetConversation";
import { getRandomEmoji } from "../utils/emojis";

const ConversationList = () => {
  const { loading, conversations } = useGetConversation();
  return (
    <div className="flex flex-col py-2 overflow-auto">
      {loading ? (
        <span className="loading loading-spinner text-info"></span>
      ) : null}
      {conversations.length > 0 &&
        conversations.map((conversation, index) => (
          <Conversation
            key={conversation?._id}
            conversation={conversation}
            emoji={getRandomEmoji()}
            lastIndex={index === conversations.length - 1}
          />
        ))}
    </div>
  );
};

export default ConversationList;
