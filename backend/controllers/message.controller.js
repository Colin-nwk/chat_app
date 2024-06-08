import { validateMessage } from "../validations/message.validation.js";
import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";
import mongoose from "mongoose";
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
    // Attempt to find existing conversation efficiently
    const existingConversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).sort({ updatedAt: -1 }); // Prioritize latest conversation

    let conversation;

    if (existingConversation) {
      conversation = existingConversation;
    } else {
      // Create conversation if not found
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    // Create new message object
    const newMessage = new Message({ senderId, receiverId, message });

    if (newMessage) {
      // Efficiently update conversation with new message ID (assuming _id property)
      conversation.messages.push(newMessage._id);

      //TODO: socket.io
      await Promise.all([conversation.save(), newMessage.save()]);
    }

    // Send successful response
    res.status(201).json(newMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error");
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: userToChatWithId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatWithId] },
    }).populate("messages");
    if (!conversation) {
      return res.status(200).json([]);
    }
    res.status(200).json(conversation.messages);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error");
  }
};
