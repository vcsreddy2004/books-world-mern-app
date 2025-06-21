import mongoose, { Schema } from "mongoose";
import { IReview } from "./IReview";

const reviewSchema: Schema = new Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "books", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
  reviewer: { type: String, required: true }
});

export default mongoose.model<IReview>("reviews", reviewSchema);
