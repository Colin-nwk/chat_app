import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const currentUserId = req.user._id;
    const users = await User.find({
      _id: { $ne: currentUserId },
    }).select("-password");

    res.status(200).json(users);
  } catch (error) {
    console.error("error in getting users :  ", error.message);
    res.status(500).json("Internal server error");
  }
};
