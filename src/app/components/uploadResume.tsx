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
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    
    // If the file exists, we set the current File to the uploaded one
    if (event.target.files && event.target.files[0]) {
      const uploadedFile = event.target.files[0];
      setFile(uploadedFile);

      // We take the text from PDF and convert it into text
      try {
        const text = await pdfToText(uploadedFile);
        console.log(text);
        setText(text);

        // Send the extracted text to the /api/generate-embeddings endpoint
        const res = await fetch('/api/generate-embeddings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text }),
        });

        const data = await res.json();
  
        console.log("Received ", data);

      } catch (error) {
        console.error(error);
   
      }
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