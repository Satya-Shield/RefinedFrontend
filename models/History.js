import mongoose, { Schema } from "mongoose";

const HistorySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User', 
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
    type: [String], 
  },
  sources: {
    type: [String],
  },
  checklist: {
    type: [String],
  },
}, {
  timestamps: true, // do we actually need these 
  
});

const History = mongoose.models.History || mongoose.model("History", HistorySchema);

export default History;