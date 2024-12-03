import React from 'react';
import Image from 'next/image';

interface ImageProps {
  images: { fileUrl: string; fileName: string }[];
}

const ImageGallery: React.FC<ImageProps> = ({ images }) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
      {images.map((image, index) => (
        <div key={index} style={{ border: '1px solid #ddd', padding: '10px' }}>
          <Image
            src={image.fileUrl}
            alt={image.fileName}
            width={300}  
            height={300} 
            style={{ objectFit: 'cover' }} 
          />
          <div>{image.fileName}</div>
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
