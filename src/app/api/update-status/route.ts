import { MongoClient } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';
import { Application } from '@/app/types';

const uri = "mongodb+srv://tline011:Database@employme.kwfqq.mongodb.net/?retryWrites=true&w=majority&appName=EmployMe";
const client = new MongoClient(uri);

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { appId, newStatus } = await req.json(); // Extract application ID and new status from the request body

    if (!appId || !newStatus) {
      return NextResponse.json({ success: false, error: "Application ID and new status are required." }, { status: 400 });
    }

    console.log("Connecting to MongoDB...");
    await client.connect();

    const collection = client.db("EmployMe").collection<Application>("Applications");

    console.log(`Finding application with ID: ${appId}`);
    const application = await collection.findOne({ id: appId });

    if (!application) {
      return NextResponse.json({ success: false, error: "Application not found." }, { status: 404 });
    }

    console.log(`Updating status for application with ID: ${appId}`);
    const updatedApplication = await collection.findOneAndUpdate(
      { id: appId },
      { $set: { status: newStatus } },
      { returnDocument: "after" } // Return the updated document
    );

    if (!updatedApplication.ok || !updatedApplication.value) {
      console.error("Failed to update application status.", updatedApplication.lastErrorObject);
      return NextResponse.json({ success: false, error: "Failed to update application status." }, { status: 500 });
    }

    console.log(`Updated application status:`, updatedApplication.value);
    return NextResponse.json({ success: true, application: updatedApplication.value }, { status: 200 });
  } catch (error) {
    console.error("Error updating application status:", error);
    return NextResponse.json({ success: false, error: "Internal server error." }, { status: 500 });
  } finally {
    await client.close();
  }
}