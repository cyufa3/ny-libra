import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  no: {
    type: String,
    trim: true
  },
  auteur: {
    type: String,
    trim: true
  },
  title: {
    type: String,
    trim: true
  },
  ref: {
    type: String,
    trim: true
  },
  category: {          // ✅ add a category field
    type: String,
    trim: true,

  }
}, { timestamps: true });

export default mongoose.model("Book", bookSchema);
