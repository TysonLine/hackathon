// Import necessary modules and types
import { MongoClient } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';
import { Application } from '@/app/types';

// MongoDB Configuration
const uri = "mongodb+srv://tline011:Database@employme.kwfqq.mongodb.net/?retryWrites=true&w=majority&appName=EmployMe";
const client = new MongoClient(uri);

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { appId } = await req.json(); // Extract application ID from the request body

    if (!appId) {
      return NextResponse.json({ success: false, error: "Application ID is required." }, { status: 400 });
    }

    console.log("Connecting to MongoDB...");
    await client.connect();

    const collection = client.db("EmployMe").collection<Application>("Applications");

    console.log(`Finding application with ID: ${appId}`);
    const application = await collection.findOne({ id: appId });

    if (!application) {
      return NextResponse.json({ success: false, error: "Application not found." }, { status: 404 });
    }

    console.log(`Incrementing views for application with ID: ${appId}`);
    const updatedApplication = await collection.findOneAndUpdate(
      { id: appId },
      { $inc: { views: 1 } },
      { returnDocument: "after" } // Return the updated document
    );

    if (!updatedApplication.ok || !updatedApplication.value) {
      console.error("Failed to update application views.", updatedApplication.lastErrorObject);
      return NextResponse.json({ success: false, error: "Failed to update application views." }, { status: 500 });
    }

    console.log(`Updated application views:`, updatedApplication.value);
    return NextResponse.json({ success: true, application: updatedApplication.value }, { status: 200 });
  } catch (err) {
    console.error("Error in POST route:", err);
    return NextResponse.json({ success: false, error: (err as Error).message }, { status: 500 });
  } finally {
    console.log("Closing MongoDB connection.");
    await client.close();
  }
}
