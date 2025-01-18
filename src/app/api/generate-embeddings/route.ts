import { NextResponse } from 'next/server';
import dotenv from 'dotenv';
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1"
});
dotenv.config(); // Load environment variables

// Initialize Groq SDK
const groqKey = process.env.NEXT_PUBLIC_GROQ_API_KEY;
if (!groqKey) {
  console.error('Groq API Key is missing. Please check your .env file.');
  process.exit(1);
}

export async function POST(req: Request) {
  try {
    // Step 1: Parse the request body to get the input text
    const { text } = await req.json();
    if (!text) {
      return NextResponse.json({ error: 'Input text is required.' }, { status: 400 });
    }

    // Step 2: Generate embeddings using Groq
    const response = await client.embeddings.create({
        input: text,
        model: "text-embedding-ada-002",
      });

    // Step 3: Extract embeddings and return them
    const embeddings = response.data[0].embedding;
    return NextResponse.json({ embeddings });
      
  } catch (error) {
    console.error('Error generating embeddings:', error);
    return NextResponse.json({ error: 'Failed to generate embeddings.' }, { status: 500 });
  }
}

