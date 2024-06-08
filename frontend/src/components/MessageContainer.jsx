import useConversation from "../zustand/useConversation";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import NoChat from "./NoChat";
import { useEffect } from "react";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="md:min-w-[450px]   flex flex-col ml-4 ">
      <>
        {/* Header */}
        {!selectedConversation ? (
          <NoChat />
        ) : (
          <>
            <header className="px-4 py-2 mb-2 space-x-2 rounded bg-indigo-800/20 ">
              <span className="label-text">To:</span>
              <span className="font-bold text-white">
                {selectedConversation?.fullName}
              </span>
            </header>
            <MessageList />
            <MessageInput />
          </>
        )}
      </>
    </div>
  );
};

export default MessageContainer;
