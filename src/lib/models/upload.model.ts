import mongoose from "mongoose";

const uploadSchema = new mongoose.Schema({
  userId: {
    type: String, // Clerk user ID
    required: true,
  },
  fileName: {
    type: String, // Original file name
    required: true,
  },
  fileUrl: {
    type: String, // File's public URL (from UploadThing)
    required: true,
  },
  uploadedAt: {
    type: Date, // Timestamp of upload
    default: Date.now,
  },
});

const Upload = mongoose.models.Upload || mongoose.model('Upload', uploadSchema);

export default Upload;