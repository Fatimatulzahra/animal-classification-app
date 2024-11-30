// Define the response type expected from the Flask API
interface ClassifyResponse {
    feature_vector: number[];
  }
  
  // Function to classify the image
  export const classifyImage = async (image: File): Promise<number[]> => {
    const formData = new FormData();
    formData.append("image", image);
  
    const response = await fetch('http://127.0.0.1:5000/classify', {
      method: 'POST',
      body: formData,
    });
  
    if (!response.ok) {
      throw new Error('Failed to classify image');
    }
  
    const data: ClassifyResponse = await response.json();
    return data.feature_vector;
  };
  