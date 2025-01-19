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

        const { error: deleteError } = await supabase
        .from('candidates')
        .delete()
        .neq('name', null); 

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
    <div className="flex flex-col items-start gap-2 w-full">
        <label className="flex items-center justify-center bg-orange-500 text-white font-bold py-3 px-6 rounded-md cursor-pointer hover:bg-orange-600 w-full">
            <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="hidden" // Hide the default file input
            />
            Upload Resume
        </label>
        {file && (
            <p className="text-xs text-gray-500 mt-1">
                {file.name}
            </p>
        )}
    </div>
);
};

export default UploadResume;