import { Application } from '@/app/types';
import { MongoClient, ObjectId } from 'mongodb';

const uri = "mongodb+srv://tline011:Database@employme.kwfqq.mongodb.net/?retryWrites=true&w=majority&appName=EmployMe";
const client = new MongoClient(uri);

export async function addApplication(application: Application) {
    try {
        console.log("Connecting to MongoDB...");
        await client.connect();

        const db = client.db("EmployMe");
        const applicationsCollection = db.collection("Applications");
        const jobPostsCollection = db.collection("JobPosts");

        const appWithId = {
            ...application,
        };

        console.log("Inserting new application into the database...");
        const result = await applicationsCollection.insertOne(appWithId);

        const applicationId = result.insertedId;
        console.log(`Inserted application with ID: ${applicationId}`);

        console.log("Updating the JobPost with the new application ID...");
        const jobId = new ObjectId(application.jobId);
        await jobPostsCollection.updateOne(
            { _id: jobId },
            { $push: { applicationIds: applicationId } }
        );

        console.log(`Updated JobPost with ID: ${jobId} to include application ID: ${applicationId}`);
        return { success: true, id: applicationId };
    } catch (err: any) {
        console.error("Error adding application:", err);
        return { success: false, error: err.message };
    } finally {
        await client.close();
        console.log("MongoDB connection closed.");
    }
}