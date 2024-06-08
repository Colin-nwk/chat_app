/* eslint-disable react/prop-types */
import useConversation from "../zustand/useConversation";
import { useSocketContext } from "../context/SocketContext";
const Conversation = ({ emoji, conversation, lastIndex }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === conversation?._id;

  const { onlineUsers } = useSocketContext();

  const isOnline = onlineUsers.includes(conversation?._id);

  return (
    <>
      <div
        className={`flex gap-2 p-2 py-1 mb-0.5 transition-all duration-300 ease-out rounded cursor-pointer hover:bg-indigo-800/80 group ${
          isSelected ? "bg-indigo-600/30" : ""
        }`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img
              src={conversation?.profilePicture}
              alt={conversation.fullName}
            />
          </div>
        </div>
        <div className="flex flex-col justify-center flex-1">
          <div className="flex items-center justify-between gap-3">
            <p className="font-bold text-white ">{conversation?.fullName}</p>
            <span className="text-xl">{emoji}</span>
          </div>
        </div>
      </div>
      {!lastIndex && <div className="h-[1px] py-0 my-0 divider"></div>}
    </>
  );
};

export default Conversation;
