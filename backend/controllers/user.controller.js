// import User from "../models/user.model.js";
// import Conversation from "../models/conversation.model.js";

// export const getCurrentUser = async (req, res) => {
//   try {
//     // console.log(req.user);
//     res.json(req.user);
//   } catch (error) {
//     console.error("Error in getCurrentUser controller: ", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// export const getOnlineUsers = async (req, res) => {
//   try {
//     const loggedUserId = req.user._id;

//     // Get all users except the logged-in user
//     const users = await User.find({ _id: { $ne: loggedUserId } }).select(
//       "-password"
//     );

//     // For each user, find the conversation and last message
//     const usersWithLastMessage = await Promise.all(
//       users.map(async (user) => {
//         // Find conversation between logged-in user and this user
//         const conversation = await Conversation.findOne({
//           participants: { $all: [loggedUserId, user._id] },
//         }).populate("messages");

//         let lastMessage = "";
//         if (conversation && conversation.messages.length) {
//           // Get the last message (assuming messages are sorted by createdAt)
//           lastMessage = conversation.messages[conversation.messages.length - 1];
//         }

//         return {
//           ...user.toObject(),
//           lastMessage, // will be null if no conversation/messages
//         };
//       })
//     );

//     res.status(200).json(usersWithLastMessage);
//   } catch (error) {
//     console.error(
//       "Error in getOnlineUsersWithLastMessage controller: ",
//       error.message
//     );
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
