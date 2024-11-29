"use client";
 
import React from 'react'
import Image from 'next/image'
import { UploadButton } from '@/utils/uploadthing';

export default function ImageUpload() {
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <UploadButton endpoint='imageUploader' onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          setImageUrl(res[0].url);
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }} />
        {imageUrl ? (
          <div style={{ marginTop: '20px' }}>
            <Image src={imageUrl} alt='Uploaded Image' width={500} height={500} />
          </div>
        ) : null}
    </div>
  );
}
