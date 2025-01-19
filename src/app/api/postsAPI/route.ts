import db from "../../../utils/db.js"; // Adjust the path to match your project structure
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await db.connectDB(); // Initialize the connection
        const client = db.client; // Access MongoDB client
        const collection = client.db("EmployMe").collection("JobPosts");

        // Fetch documents from the collection
        const data = await collection.find({}).toArray();
        console.log("Fetched documents:", data);

        // Return the fetched data
        return NextResponse.json(data);
    } catch (err) {
        console.error("Error:", err);
        return NextResponse.json(
            { error: "An error occurred while fetching data." },
            { status: 500 }
        );
    } finally {
        // Close the client connection when done
        try {
            await db.client.close();
            console.log("MongoDB connection closed");
        } catch (closeError) {
            console.error("Error closing MongoDB connection:", closeError);
        }
    }
}

/*
import db from '../../../../utils/db.js'; // Adjust the path based on your project structure
import { GridFSBucket } from 'mongodb';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
    try {
        const buffers: Buffer[] = [];
        for await (const chunk of req.body as any) {
            buffers.push(chunk);
        }
        const buffer = Buffer.concat(buffers);

        // Get headers
        const filename = req.headers.get('x-filename');
        const contentType = req.headers.get('x-content-type');

        if (!filename || !contentType) {
            return NextResponse.json(
                { error: 'Filename and content type are required.' },
                { status: 400 }
            );
        }

        // Connect to MongoDB
        const { client } = await db.connectDB();
        const bucket = new GridFSBucket(client.db('EmployMe'), { bucketName: 'uploads' });

        // Create a write stream to upload the file
        const uploadStream = bucket.openUploadStream(filename, {
            metadata: { contentType },
        });

        uploadStream.end(buffer);

        // Return success response once the file upload finishes
        return new Promise((resolve, reject) => {
            uploadStream.on('finish', () => {
                console.log('File uploaded:', uploadStream.id);
                resolve(NextResponse.json({ fileId: uploadStream.id }));
            });

            uploadStream.on('error', (err) => {
                console.error('Error uploading file:', err);
                reject(NextResponse.json({ error: 'Failed to upload file.' }, { status: 500 }));
            });
        });
    } catch (err) {
        console.error('Error:', err);
        return NextResponse.json(
            { error: 'An error occurred while processing the request.' },
            { status: 500 }
        );
    }
};



 */
