import * as mobilenet from '@tensorflow-models/mobilenet';
import '@tensorflow/tfjs'; // Ensure TensorFlow.js is loaded

// Function to load the model and classify an image
export const classifyImage = async (imageUrl: string) => {
  try {
    // Load the MobileNet model
    const model = await mobilenet.load();
    console.log("Model loaded successfully");

    // Create an image element
    const img = new window.Image();
    img.crossOrigin = "anonymous"; // Allows cross-origin image loading
    img.src = imageUrl;

    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    });

    // Classify the image
    const predictions = await model.classify(img);
    return predictions;
  } catch (error) {
    console.error("Error classifying image:", error);
    throw error; // Throw the error so it can be handled in the component
  }
};
