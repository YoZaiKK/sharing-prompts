import { Document, Schema, model } from 'mongoose';

export interface Post extends Document {
  creator: Schema.Types.ObjectId;
  prompt: string;
  tag: string;
}