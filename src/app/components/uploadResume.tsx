'use client';
import React from 'react'
import { useState } from 'react';

const UploadResume = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  return (
    <div>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      {file && <p>Uploaded file: {file.name}</p>}
    </div>
  );
};

export default UploadResume;