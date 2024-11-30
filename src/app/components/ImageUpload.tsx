"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { UploadButton } from '@/utils/uploadthing';

export default function ImageUpload() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [classificationResult, setClassificationResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const classifyImage = async (file: File) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      // Send the image to the Flask backend for classification
      const response = await fetch('http://127.0.0.1:5000/classify', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Classification Result:', result);
        setClassificationResult(result);
      } else {
        throw new Error('Failed to classify image');
      }
    } catch (error) {
      console.error("Error classifying image:", error); // Log the error
      alert(`Error: ${(error as Error).message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={async (res) => {
          console.log("Files uploaded:", res);

          if (res && res[0]) {
            setImageUrl(res[0].url);

            try {
              // Fetch the uploaded image and prepare it for classification
              const imageUrl = res[0].url;
              const response = await fetch(imageUrl);
              const blob = await response.blob();
              const file = new File([blob], "uploaded_image.jpg", { type: blob.type });

              // Call classifyImage function to send the image to the Flask backend
              await classifyImage(file);
            } catch (uploadError) {
              console.error("Error fetching uploaded image:", uploadError);
              alert(`Error fetching uploaded image: ${(uploadError as Error).message}`);
            }
          }
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
      
      {/* Display uploaded image */}
      {imageUrl && (
        <div style={{ marginTop: '20px' }}>
          <Image src={imageUrl} alt="Uploaded Image" width={500} height={500} />
        </div>
      )}

      {/* Show loading state or classification result */}
      {isLoading ? (
        <p>Classifying image...</p>
      ) : classificationResult ? (
        <div style={{ marginTop: '20px' }}>
          <h3>Classification Result:</h3>
          {/* Display the classification result */}
          {classificationResult.predicted_label ? (
            <p>Predicted Label: {classificationResult.predicted_label}</p>
          ) : (
            <pre>{JSON.stringify(classificationResult.feature_vector, null, 2)}</pre>
          )}
        </div>
      ) : null}
    </div>
  );
}
