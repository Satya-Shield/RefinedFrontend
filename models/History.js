import { Schema, model, models } from 'mongoose';
import BackendResponseSchema from './BackendResponse.js';

const HistorySchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    backendResponses: [BackendResponseSchema],
  },
  { timestamps: true }
);

const History = models.History || model('History', HistorySchema);
export default History;
