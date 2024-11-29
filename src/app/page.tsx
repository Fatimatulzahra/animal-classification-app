import ImageUpload from "../app/components/ImageUpload";

export default function Home() {
    return (
      <div className="dashboard-container mb-4 bg-blue-100">
        <h1 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h1>
        {/* Render the ImageUpload component here */}
        <ImageUpload />
      </div>
    );
  }
  