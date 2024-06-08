import { TbSend2 } from "react-icons/tb";
import useSendMessage from "../hooks/useSendMessage";
import { useState } from "react";
const MessageInput = () => {
  const { loading, sendMessage } = useSendMessage();
  const [message, setMessage] = useState("");

  const handeleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  };
  return (
    <>
      {" "}
      <form onSubmit={handeleSubmit}>
        <label className="flex items-center gap-2 mt-2 text-white outline-none input input-bordered bg-indigo-950/20 focus-visible:outline-none focus:outline-none ring-0 focus:ring-0 ">
          <input
            type="text"
            className="grow"
            placeholder="Send a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">
            {loading ? (
              <span className="loading loading-spinner text-info"></span>
            ) : (
              <TbSend2 className="transition-all duration-300 ease-in-out cursor-pointer size-7 opacity-70 hover:text-indigo-600" />
            )}
          </button>
        </label>
      </form>
    </>
  );
};

export default MessageInput;
