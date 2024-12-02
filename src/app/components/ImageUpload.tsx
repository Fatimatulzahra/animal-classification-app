"use client";

import React, { useState } from "react";
import Image from "next/image";
import { UploadButton } from "@/utils/uploadthing";
import { classifyImage } from "@/utils/tensorflow";
import { useUser } from "@clerk/nextjs"; 

export default function ImageUpload() {
  const { user, isLoaded, isSignedIn } = useUser(); 
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [classificationResult, setClassificationResult] = useState<{
    predicted_label: string;
    confidence: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Function to classify image using TensorFlow model
  const handleClassifyImage = async (imageUrl: string) => {
    setIsLoading(true);

    try {
      const predictions = await classifyImage(imageUrl);

      if (predictions && predictions[0]) {
        const result = {
          predicted_label: predictions[0].className,
          confidence: predictions[0].probability,
        };
        setClassificationResult(result);

        // Save the image and classification result
        await saveClassificationResult(imageUrl, result);
      }
    } catch (error) {
      alert(`Error: ${(error as Error).message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const saveClassificationResult = async (
    imageUrl: string,
    classificationResult: { predicted_label: string; confidence: number }
  ) => {
    if (!isSignedIn || !user) {
      alert("Please sign in first.");
      return;
    }

    try {
      const response = await fetch("/api/images", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl,
          classification: classificationResult,
          userId: user.id, 
        }),
      });

      const responseData = await response.json();

      console.log("Classification result saved successfully", responseData);
    } catch (error) {
      console.error("Full error details:", error);
      alert(`Error saving classification result: ${(error as Error).message}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Card Container */}
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-center">
        <h2 className="text-xl font-semibold mb-4">Upload an Image</h2>

        {/* Upload Button */}
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={async (res) => {
            console.log("Files uploaded:", res);

            if (res && res[0]) {
              const uploadedImageUrl = res[0].url;
              setImageUrl(uploadedImageUrl);

              // Classify the uploaded image
              await handleClassifyImage(uploadedImageUrl);
            }
          }}
          onUploadError={(error: Error) => {
            alert(`ERROR! ${error.message}`);
          }}
        />

        {/* Display Uploaded Image */}
        {imageUrl && (
          <div className="mt-4">
            <Image
              src={imageUrl}
              alt="Uploaded Image"
              width={300}
              height={300}
              className="rounded-md mx-auto"
            />
          </div>
        )}

        {/* Show Loading or Classification Result */}
        {isLoading ? (
          <p className="text-blue-500 mt-4">Classifying image...</p>
        ) : null}
      </div>

      {/* Classification Result */}
      {classificationResult && (
        <div className="bg-white rounded-lg shadow-lg p-4 mt-6 max-w-md w-full text-center">
          <h3 className="text-lg font-semibold">Classification Result</h3>
          <p className="text-green-600 mt-2">
            Predicted Label: {classificationResult.predicted_label}
          </p>
          <p className="text-gray-500 mt-2">
            Confidence: {(classificationResult.confidence * 100).toFixed(2)}%
          </p>
        </div>
      )}
    </div>
  );
}
