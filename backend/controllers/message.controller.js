import { validateMessage } from "../validations/message.validation.js";
import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";
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
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({ senderId, receiverId, message });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    // await newMessage.save();

    res.status(201).json(newMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
