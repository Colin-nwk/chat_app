import { PiChatsFill } from "react-icons/pi";
const NoChat = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex flex-col items-center gap-2 px-4 font-semibold text-center text-white sm:text-lg md:text-xl">
        <p> Welcome John Do</p>
        <p> Select a chat to start messageing</p>
        <PiChatsFill className="text-center size-12 md:size-16" />
      </div>
    </div>
  );
};

export default NoChat;
