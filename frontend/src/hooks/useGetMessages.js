import { useState, useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, selectedConversation, setMessages } = useConversation();

  const getMessages = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/message/${selectedConversation._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data);
      }

      setMessages(data);
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }, [selectedConversation, setMessages]);

  useEffect(() => {
    if (selectedConversation) {
      getMessages();
    }
  }, [getMessages, selectedConversation]);

  return { loading, messages };
};

export default useGetMessages;
