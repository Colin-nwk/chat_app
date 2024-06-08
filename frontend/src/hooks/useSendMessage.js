import { useState, useCallback } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, selectedConversation, setMessages } = useConversation();

  const sendMessage = useCallback(
    async (message) => {
      setLoading(true);
      try {
        // Make a POST request to the server with the message data
        const response = await fetch(
          `/api/message/send/${selectedConversation._id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              message,
            }),
          }
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data);
        }
        if (response.ok) {
          // toast.success("Message sent successfully");
          setMessages([...messages, data]);
        }
      } catch (error) {
        toast.error(error.message);
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [selectedConversation, messages, setMessages]
  );

  return { loading, sendMessage };
};

export default useSendMessage;
