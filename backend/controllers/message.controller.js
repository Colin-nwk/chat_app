import { validateMessage } from "../validations/message.validation.js";
import Message from "../models/message.model.js";
export const sendMessage = async (req, res) => {
  try {
    const receiverId = req.params.id;
    const { message } = req.body;
    const senderId = req.user._id;
    const { errors, isValid } = validateMessage({
      senderId,
      receiverId,
      message,
    });

    if (!isValid) {
      return res.status(422).json(errors);
    }

    const newMessage = new Message({ senderId, receiverId, message });
    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
