## Animal Classification App
## 📜 Project Overview
A web-based application for uploading and classifying animal images using machine learning. The platform allows users to view their past uploads and see their images organized by date, with classifications displayed for each. Built with TypeScript and Next.js for the frontend, MongoDB for the backend, and MobileNet (via TensorFlow.js) for classification.

## 🚀 Features
- Image Upload: Users can upload animal images for classification.
- Machine Learning Model: Classifies images using MobileNet.
- User History: Organizes uploads by date and displays classifications under each image.
- Gallery View: View past uploads in a user-friendly gallery format.

## 🛠️ Tech Stack
Frontend:
- Next.js
- TypeScript
Backend:
- MongoDB(database)
- UploadThing for image link handling
Machine Learning:
- TensorFlow.js with MobileNet

## 📝 Setup Instructions
1️⃣ Prerequisites
Ensure you have the following installed:
- Node.js
- MongoDB

2️⃣ Clone the Repository
- git clone https://github.com/Fatimatulzahra/animal-classification-app.git
- cd animal-classification-app

3️⃣ Install Dependencies
- npm install

4️⃣ Set Up Environment Variables
- Create a .env.local file in the root directory to set up your MongoDB connection string, UploadThing, and Clerk API keys.

5️⃣ Run the Project
- npm run dev


## 📊 How It Works
- Image Upload: Users upload an image through the frontend.
- Model Classification: MobileNet classifies the image in real time.
- Save Results: Image and classification are saved in MongoDB, organized by upload date.
- User History: Users can view their uploads in a gallery, grouped by date.

## 🤝 Acknowledgments
- TensorFlow.js for the MobileNet model.
- UploadThing for seamless image uploads(link for images were used in mongodb and rendered in the user's image gallery)
- MongoDB for robust database solutions.

