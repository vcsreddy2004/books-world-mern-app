import { Document } from "mongoose";

export interface IReview extends Document {
  bookId: string;
  rating: number;
  comment: string;
  reviewer: string;
}
