import Message from "./Message";

const MessageList = () => {
  return (
    <div className="flex-1 px-4 overflow-auto">
      <Message />
      <Message />
      <Message />
      <Message />
    </div>
  );
};

export default MessageList;
