import { NextResponse } from 'next/server';
import dotenv from 'dotenv';
import OpenAI from 'openai';

// Load environment variables
dotenv.config();

const openaiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
if (!openaiKey) {
  console.error('OpenAI API Key is missing. Please check your .env file.');
  process.exit(1);
}

// Initialize OpenAI Client
const client = new OpenAI({
  apiKey: openaiKey,
});

export async function POST(req: Request) {
  try {
    // Step 1: Parse the request body to get the input text
    const { text } = await req.json();
    if (!text) {
      return NextResponse.json(
        { error: 'Input text is required.' },
        { status: 400 }
      );
    }

    // Step 2: Generate embeddings using OpenAI
    const response = await client.embeddings.create({
      input: text,
      model: 'text-embedding-ada-002', // Replace with your desired model
    });

    // Step 3: Extract embeddings and return them
    const embeddings = response.data[0].embedding;
    return NextResponse.json({ embeddings });
  } catch (error: any) {
    console.error('Error generating embeddings:', error);
    return NextResponse.json(
      { error: 'Failed to generate embeddings.', details: error.message },
      { status: 500 }
    );
  }
}
