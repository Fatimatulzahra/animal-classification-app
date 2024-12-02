import mongoose from "mongoose";

const uploadSchema = new mongoose.Schema({
  fileUrl: { type: String, required: true },
  classification: { type: String, required: true }, 
  confidence: { type: Number, required: true }, 
  uploadedAt: { type: Date, required: true },
  userId: { type: String, required: true },
});

const Upload = mongoose.models.Upload || mongoose.model('Upload', uploadSchema);

export default Upload;