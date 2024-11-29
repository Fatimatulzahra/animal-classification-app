import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { getAuth } from "@clerk/nextjs/server"; 
import { NextRequest } from "next/server";
import Upload from "@/lib/models/upload.model";
import { connect } from "@/lib/mongodb/mongoose";

const f = createUploadthing();
 
// Define an auth function to authenticate users
const auth = async (req: NextRequest) => {
  const { userId } = getAuth(req); // Extract the user's ID from Clerk

  if (!userId) {
    throw new UploadThingError("Unauthorized"); // Prevent uploads if the user isn't logged in
  }

  return { id: userId }; // Return the user's ID
};

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // Use Clerk to authenticate the user
      const user = await auth(req);

      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError("Unauthorized");

      // Return the authenticated user's ID to be stored as metadata
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // Ensure the MongoDB connection is established
      await connect(); // Call the MongoDB connection function

      // Save the uploaded file metadata to MongoDB
      try {
        await Upload.create({
          userId: metadata.userId, // Clerk user ID from middleware
          fileName: file.key, // Use the file key as the name
          fileUrl: file.url, // Public URL from UploadThing
        });
        console.log("File metadata saved to database.");
      } catch (error) {
        console.error("Error saving file metadata:", error);
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;