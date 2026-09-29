import mongoose, { Schema, Document, Model } from "mongoose";
import { ContactMessage } from "../types";

export interface IMessageDocument extends ContactMessage, Document {}

const MessageSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: "messages", // Explicit MongoDB collection name
  }
);

const MessageModel: Model<IMessageDocument> =
  mongoose.models.Message || mongoose.model<IMessageDocument>("Message", MessageSchema);

export default MessageModel;
