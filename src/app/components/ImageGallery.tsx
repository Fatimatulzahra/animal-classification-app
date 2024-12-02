import React from 'react';

interface ImageProps {
  images: { fileUrl: string; fileName: string }[];
}

const ImageGallery: React.FC<ImageProps> = ({ images }) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
      {images.map((image, index) => (
        <div key={index} style={{ border: '1px solid #ddd', padding: '10px' }}>
          <img src={image.fileUrl} alt={image.fileName} style={{ maxWidth: '200px', maxHeight: '200px' }} />
          <div>{image.fileName}</div>
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
