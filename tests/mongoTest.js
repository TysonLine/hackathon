import db from '../src/utils/db.js'; // Adjust the path to match your project structure

(async () => {
    try {
        await db.connectDB(); // Initialize the connection
        const client = db.client; // Access MongoDB client
        const collection = client.db('EmployMe').collection('users');

        // Example operation: Insert a document
        const result = await collection.insertOne({
            name: 'John Doe',
            email: 'john.doe@example.com',
        });
        console.log('Document inserted:', result.insertedId);
    } catch (err) {
        console.error('Error:', err);
    } finally {
        // Close the client connection when done
        await db.client.close();
        console.log('MongoDB connection closed');
    }
})();
