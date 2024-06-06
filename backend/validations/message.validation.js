export const validateMessage = (message) => {
  const errors = {};

  if (!message.senderId) errors.senderId = "Sender ID is required";
  if (!message.receiverId) errors.receiverId = "Receiver ID is required";
  if (!message.message || message.message.trim() === "")
    errors.message = "Message cannot be empty";

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
