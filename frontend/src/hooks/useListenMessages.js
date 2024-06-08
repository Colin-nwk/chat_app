import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      newMessage.isNew = true;
      setMessages([...messages, newMessage]);
    });
    return () => socket?.off("newMessage");
  }, [messages, setMessages, socket]);
};

export default useListenMessages;

// const useListenMessages = () => {
//   const { socket } = useSocketContext();
//   const { setMessages } = useConversation();

//   useEffect(() => {
//     const handleMessage = (newMessage) => {
//       setMessages((prevMessages) => [...prevMessages, newMessage]);
//     };

//     if (socket) {
//       socket.on("newMessage", handleMessage);
//     }

//     return () => {
//       if (socket) {
//         socket.off("newMessage", handleMessage);
//       }
//     };
//   }, [socket, setMessages]);
// };

// export default useListenMessages;
