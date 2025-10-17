import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
    reportId: { type: String, unique: true },
    testCode: String,
    userEmail: String,
    results: [
      {
        provider: String,
        received: Boolean,
        folder: String,
      },
    ],
    
    deliverabilityScore: Number,
    createdAt: Date,

    opened: { type: Boolean, default: false },
    openedAt: Date,
    clicked: { type: Boolean, default: false },
    clickedAt: Date,

  });
  

export default mongoose.model("Report", reportSchema);
