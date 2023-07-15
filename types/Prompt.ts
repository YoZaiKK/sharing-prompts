import { Document } from 'mongoose';

export interface Post extends Document {
  creator: {
    username: string;
    _id: string;
    image: string;
    email: string;
  }
  prompt: string;
  tag: string;
}