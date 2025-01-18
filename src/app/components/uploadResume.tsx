'use client';
import React, { useState } from 'react';
import pdfToText from 'react-pdftotext';

/*** Supabase config ***/
const { createClient } = require("@supabase/supabase-js");
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const privateKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY;
if (!privateKey) throw new Error(`Expected env var SUPABASE_API_KEY`);
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
if (!url) throw new Error(`Expected env var SUPABASE_URL`);

const supabase = createClient(url, privateKey);
/***End of Supabase Config ***/



const UploadResume = () => {
  const [file, setFile] = useState<File | null>(null);

  // Actual Pdf Text to be parsed
  const [text, setText] = useState<string | null>(null);

  // If Pdf is selected or not
  const [status, setStatus] = useState<string | null>(null);

  //Name of user
  const [name, setName] = useState<string>(''); 

  // Whenever file is uploaded, we set the current file to file
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    
    // If the file exists, we set the current File to the uploaded one
    if (event.target.files && event.target.files[0]) {
      const uploadedFile = event.target.files[0];
      setFile(uploadedFile);


      /*** Convert PDF to text and Generate Embedding****/
      // We take the text from PDF and convert it into text
      try {
        const text = await pdfToText(uploadedFile);
        setText(text);

        // Send the extracted text to the /api/generate-embeddings endpoint
        const res = await fetch('/api/generate-embeddings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text }),
        });

        const response = await res.json();

        const resumeTextEmbedding = response.embeddings;

        
        /** End of Generating Embedding**/


        /** Supabase inserting starts here **/
        const data = {
          name: name, // User's name
            resume_text: text, // Extracted text
            embedding: resumeTextEmbedding, // Embedding array

        }


        // Insert data into Supabase
        const {info, error} = await supabase.from('candidates').insert(data) 

        //Error Checking
        if (error){
          console.log(error)
        } else{
            //Double check information
            console.log(`Info Added: ${info}`)
            console.log('Embedding complete!');
        }

  
        
        
        //Embedding Recieved, Insert Data to Supabase here

      } catch (error) {
        console.error(error);
   
      }
    }
  };


    return (
      <div className="flex flex-col items-center space-y-4">
        {/* Input for name */}
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input input-bordered"
        />
  
        {/* Input for file upload */}
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="input input-bordered"
        />
  
        {/* File info */}
        {file && <p>Uploaded file: {file.name}</p>}
  
        {/* Resume text preview */}
        {text && <pre className="text-left bg-gray-100 p-4 rounded">{text}</pre>}
  
        {/* Status messages */}
        {status && <p className="text-center text-sm text-gray-700">{status}</p>}
      </div>
  );
};

export default UploadResume;