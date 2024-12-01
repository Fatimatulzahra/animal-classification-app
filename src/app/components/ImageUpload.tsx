"use client";

import React, { useState } from "react";
import Image from "next/image";
import { UploadButton } from "@/utils/uploadthing";
import { classifyImage } from "@/utils/tensorflow"; 

export default function ImageUpload() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [classificationResult, setClassificationResult] = useState<{
    predicted_label: string;
    confidence: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClassifyImage = async (imageUrl: string) => {
    setIsLoading(true);

    try {
      // Call the classifyImage function from the utils
      const predictions = await classifyImage(imageUrl);
      console.log("Predictions:", predictions);

      if (predictions && predictions[0]) {
        setClassificationResult({
          predicted_label: predictions[0].className,
          confidence: predictions[0].probability,
        });
      }
    } catch (error) {
      console.error("Error classifying image:", error);
      alert(`Error: ${(error as Error).message}`);
    } finally {
      setIsLoading(false);
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
