import mongoose, { Schema } from "mongoose";

const HistorySchema = new Schema({
  // This is the crucial link to our User model
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User', // This tells Mongoose the ID belongs to a document in the 'User' collection
    required: true,
  },
  claim: {
    type: String,
    required: true,
  },
  verdict: {
    type: String,
    required: true,
  },
  confidence: {
    type: Number,
  },
  explanation: {
    type: String,
  },
  techniques: {
    type: [String], // Defines an array of strings
  },
  sources: {
    type: [String],
  },
  checklist: {
    type: [String],
  },
}, {
  timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
});

const History = mongoose.models.History || mongoose.model("History", HistorySchema);

export default History;