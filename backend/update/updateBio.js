import mongoose from "mongoose";
import User from "../models/user.model.js";

const MONGODB_URI = "";

async function updateBio() {
  await mongoose.connect(MONGODB_URI);
  await User.updateMany({ bio: { $exists: false } }, { $set: { bio: "" } });
  console.log("Bio field updated for existing users.");
  mongoose.disconnect();
}

updateBio();
