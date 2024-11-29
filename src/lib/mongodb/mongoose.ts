import mongoose from "mongoose";

let initialized = false;

export const connect = async () => {
  mongoose.set("strictQuery", true);

  const uri = process.env.MONGODB_URI;

  // Ensure MONGODB_URI is defined
  if (!uri) {
    throw new Error(
      "Error: MONGODB_URI is not defined in the environment variables."
    );
  }

  if (initialized) {
    console.log("MongoDB is already connected!");
    return;
  }

  try {
    await mongoose.connect(uri, {
      dbName: "animal classifier app",
    });
    console.log("MONGODB connected");
    initialized = true;
  } catch (error) {
    console.error("MONGODB connection error: ", error);
  }
};
