import { model, models, Schema } from "mongoose";

const MessageSchema = new Schema({
  sender: {
    type: String,
    required: true,
    enum: ['user', 'ai'],
  },
  text: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
})

export const ConversationSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  messages: [MessageSchema],
  lastMessage: {
    type: String,
    default: '',
  },
  lastMessageTimestamp: {
    type: Date,
    default: Date.now,
  },
  aiModel: {
    type: String,
    default: '',
  },
  resumeId: {
    type: Schema.Types.ObjectId,
    ref: 'Resume',
    required: true,
  }
}, {
  timestamps: true,
})

export const Conversation = models.Conversation || model("Conversation", ConversationSchema);
