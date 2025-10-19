import { Schema } from 'mongoose';

const ClaimSchema = new Schema({
  claim: {
    type: String,
    required: true,
  },
  verdict: {
    type: String,
  },
  confidence: {
    type: Number,
  },
  ai_analysis: {
    type: String,
  },
  analysis_techniques: [
    {
      type: String,
    },
  ],
  sources: [
    {
      type: String,
    },
  ],
  verification_checklist: [
    {
      type: String,
    },
  ],
});

export default ClaimSchema;
