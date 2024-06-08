/* eslint-disable react/prop-types */
import { useAuthContext } from "../context/AuthContext";
import useConversation from "../zustand/useConversation";
import { extractTime } from "../utils/humanTime";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message?.senderId === authUser._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePicture = fromMe
    ? authUser.profilePicture
    : selectedConversation?.profilePicture;
  const bubbleBgColor = fromMe ? "chat-bubble-success" : "chat-bubble-primary";
  const formattedTime = extractTime(message.createdAt);
  const shakeClass = message.isNew ? "shake" : "";

  return (
    <div>
      <div className={`chat ${chatClassName}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src={profilePicture}
            />
          </div>
        </div>

        <div className={`chat-bubble ${bubbleBgColor} ${shakeClass} pb-2`}>
          {message?.message}
        </div>
        <time className="text-xs opacity-50">{formattedTime}</time>
      </div>
    </div>
  );
};

export default Message;
