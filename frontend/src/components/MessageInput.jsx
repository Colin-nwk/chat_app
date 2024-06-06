import { TbSend2 } from "react-icons/tb";
const MessageInput = () => {
  return (
    <>
      {" "}
      <form>
        <label className="flex items-center gap-2 text-white outline-none input input-bordered bg-indigo-950/20 focus-visible:outline-none focus:outline-none ring-0 focus:ring-0 ">
          <input type="text" className="grow" placeholder="Send a message" />

          <TbSend2
            className="cursor-pointer size-7 opacity-70 hover:text-indigo-600"
            role="button"
            type="submit"
          />
        </label>
      </form>
    </>
  );
};

export default MessageInput;
