import mongoose from "mongoose";

const testSchema = new mongoose.Schema(
  {
    code: { 
      type: String, 
      required: true, 
      unique: true 
    },
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model("Test", testSchema);
