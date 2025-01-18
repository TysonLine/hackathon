'use client';
import React, { useState } from 'react';
import pdfToText from 'react-pdftotext';

const UploadResume = () => {
  const [file, setFile] = useState<File | null>(null);

  // Actual Pdf Text to be parsed
  const [text, setText] = useState<string | null>(null);

  // If Pdf is selected or not
  const [status, setStatus] = useState<string | null>(null);

  // Whenever file is uploaded, we set the current file to file
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const uploadedFile = event.target.files[0];
      setFile(uploadedFile);

      pdfToText(uploadedFile)
        .then(text => {
          console.log(text);
          setText(text);
        })
        .catch(error => {
          console.error("Failed to extract text from pdf", error);
          setStatus("Failed to extract text from pdf");
        });
    }
  };

  return (
    <div>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      {file && <p>Uploaded file: {file.name}</p>}
      {text && <pre>{text}</pre>}
      {status && <p>{status}</p>}
    </div>
  );
};

export default UploadResume;