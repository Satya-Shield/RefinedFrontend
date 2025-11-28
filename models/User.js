import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  image: { type: String },
}, {
  timestamps: true,
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
