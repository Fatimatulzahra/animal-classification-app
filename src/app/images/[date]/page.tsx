"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Image from 'next/image'; 
import Loader from "../../components/Loader";

interface Image {
  _id: string;
  fileUrl: string;
  fileName: string;
  classification: string;
}

const ImageGalleryPage = () => {
  const { date } = useParams();
  const [images, setImages] = useState<Image[]>([]); 
  const { user } = useUser();
  const userId = user?.id;

  useEffect(() => {
    if (!userId || !date) {
      console.error("User ID or date is missing");
      return;
    }

    const fetchImages = async () => {
      const res = await fetch(`/api/images?userId=${userId}&date=${date}`);
      const data = await res.json();

      if (data.error) {
        console.error("Error fetching images:", data.error);
        setImages([]);
      } else {
        setImages(data.images);
      }
    };

    fetchImages();
  }, [userId, date]);

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", color: "#333", fontSize: "2rem", marginBottom: "20px" }}>Images from {date}</h1>
      {Array.isArray(images) && images.length === 0 && <div><Loader /></div>}
      <div style={styles.galleryContainer}>
        {images.map((image) => (
          <div key={image._id} style={styles.imageCard}>
            <Image
              src={image.fileUrl}
              alt={image.fileName}
              width={300} 
              height={300} 
              style={styles.image as React.CSSProperties}
            />
            <div style={styles.classification}>{image.classification || "Unclassified"}</div>
          </div>
        ))}
      </div>
      {!Array.isArray(images) && <div>Error: Unexpected data format</div>}
    </div>
  );
};

import { CSSProperties } from "react";

const styles: { [key: string]: CSSProperties } = {
  galleryContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "50px",
    justifyContent: "flex-start",
  },
  imageCard: {
    width: "300px",
    height: "300px",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    backgroundColor: "#f9f9f9",
  },
  image: {
    width: "100%",
    height: "80%",
    objectFit: "cover",
  },
  classification: {
    padding: "10px",
    fontSize: "1rem",
    fontWeight: "bold",
  },
};

export default ImageGalleryPage;
