import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import NoChat from "./NoChat";

const MessageContainer = () => {
  const noChatSelected = true;
  return (
    <div className="md:min-w-[450px]   flex flex-col ml-4 ">
      <>
        {/* Header */}
        {noChatSelected ? (
          <NoChat />
        ) : (
          <>
            <header className="px-4 py-2 mb-2 space-x-2 rounded bg-indigo-800/20 ">
              <span className="label-text">To:</span>
              <span className="font-bold text-white">John doe</span>
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
