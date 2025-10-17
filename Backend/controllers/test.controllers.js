import Test from "../models/test.js";
import dotenv from "dotenv";
dotenv.config();

// You can also move this to an ENV or DB later for more flexibility
const TEST_INBOXES = [
  `${process.env.TEST_MAILBOX_1}`,
  `${process.env.TEST_MAILBOX_2}`,
  `${process.env.TEST_MAILBOX_3}`,
  `${process.env.TEST_MAILBOX_4}`,
  `${process.env.TEST_MAILBOX_5}`,
];

export const generateTestCode = async (req, res) => {
  try {
    // Generate a random 6-digit code
    const code = `TEST-${Math.floor(100000 + Math.random() * 900000)}`;

    // Save code to database (optional but good for history)
    const newTest = new Test({ code });
    await newTest.save();
    
    // Return both code + inboxes
    res.status(201).json({
      success: true,
      code,
      inboxes: TEST_INBOXES,
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
