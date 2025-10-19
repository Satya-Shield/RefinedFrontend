import { Schema } from 'mongoose';
import ClaimSchema from './Claim.js';

const BackendResponseSchema = new Schema({
  claims: [ClaimSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default BackendResponseSchema;
