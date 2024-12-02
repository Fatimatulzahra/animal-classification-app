"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { wrap } from "node:module";

// Define the types
interface Image {
  fileName: string;
  fileUrl: string;
  classification: string;
}

interface ImageData {
  [date: string]: Image[];
}

const MyImagePage = () => {
  const [imageData, setImageData] = useState<ImageData>({});
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      const fetchImages = async () => {
        const res = await fetch(`/api/images?userId=${user.id}`);
        const data = await res.json();
        setImageData(data);
      };

      fetchImages();
    }
  }, [user]);

  if (!user) {
    return <div>Please sign in to see your images.</div>;
  }

  const hasImages = Object.keys(imageData).length > 0;

  // Navigate to the gallery page for a specific date
  const handleFolderClick = (date: string) => {
    router.push(`/images/${date}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      {!hasImages && <div style={{ textAlign: "center", padding: "20px" }}>No images yet</div>}
      <div style={styles.folderContainer}>
        {hasImages &&
          Object.keys(imageData).map((date) => (
            <div
              key={date}
              style={styles.folder}
              onClick={() => handleFolderClick(date)} 
            >
              <div style={styles.folderDate}>{date}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

// Styling
const styles: Record<string, React.CSSProperties> = {
  folderContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "flex-start",
    paddingTop: "20px",
  },
  folder: {
    width: "300px",
    height: "300px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    border: "2px solid rgba(255, 255, 255, 0.3)",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    transition: "transform 0.2s, background-color 0.3s",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
  },
  folderDate: {
    fontSize: "1.5rem",
    color: "black",
    fontWeight: "bold",
    textAlign: "center" as const,
  },
  folderHover: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    transform: "scale(1.05)",
  },
};

export default MyImagePage;
