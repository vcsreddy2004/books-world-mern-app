import mongoose, { Schema } from "mongoose";
import { IBook } from "./IBook";

const bookSchema: Schema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String },
  publishedYear: { type: Number },
});

export default mongoose.model<IBook>("books", bookSchema);
