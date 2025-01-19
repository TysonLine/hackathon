import { JobPost } from '@/app/types';
import { MongoClient } from 'mongodb';

// MongoDB Configuration
const uri = "mongodb+srv://tline011:Database@employme.kwfqq.mongodb.net/?retryWrites=true&w=majority&appName=EmployMe";
const client = new MongoClient(uri);

/*** Supabase config ***/
import { createClient } from "@supabase/supabase-js";
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const privateKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY;
if (!privateKey) throw new Error(`Expected env var SUPABASE_API_KEY`);
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
if (!url) throw new Error(`Expected env var SUPABASE_URL`);

const supabase = createClient(url, privateKey);
/***End of Supabase Config ***/

// Generate Embedding Function
async function generateEmbedding(description: string): Promise<number[] | null> {
  if (!description) return null; // Skip jobs with no description

  const apiUrl = 'http://localhost:3001/api/generate-embeddings';
  try {
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: description }),
    });

    const data = await res.json();
    return data.embeddings; // Return null if no embeddings are generated
  } catch (error) {
    console.error("Error generating embedding:", error);
    return null;
  }
}

// Add Job Post Function
export async function addJobPost(newJob: JobPost) {
  // Supabase Integration
  try {
    console.log("Adding job post to Supabase...");
    const jobEmbedding = await generateEmbedding(newJob.description);

    const data = {
      id: newJob.id,
      job_title: newJob.job_title,
      company: newJob.company,
      location: newJob.location || null,
      job_type: newJob.jobType || null,
      description: newJob.description,
      embedding: jobEmbedding,
    };

    const { error } = await supabase.from('jobs').insert(data);
    if (error) throw new Error(`Supabase insert error: ${error.message}`);

    console.log("Successfully added job post to Supabase.");
  } catch (supabaseError: any) {
    console.error("Error adding job to Supabase:", supabaseError);
  }

  // MongoDB Integration
  try {
    console.log("Connecting to MongoDB...");
    await client.connect();

    const collection = client.db("EmployMe").collection("JobPosts");

    const jobWithId = {
      ...newJob,
      applications: [], // Initialize with an empty applications array
    };

    console.log("Inserting new job post into MongoDB...");
    const result = await collection.insertOne(jobWithId);

    console.log(`Successfully inserted job post with ID: ${result.insertedId}`);
  } catch (mongoError: any) {
    console.error("Error adding job to MongoDB:", mongoError);
  } finally {
    await client.close();
      console.log("MongoDB connection closed.");
      return { success: true };
    }
    return { success: false, error: "Error" };
    
}
