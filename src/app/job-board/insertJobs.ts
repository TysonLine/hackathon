/** Supabase config */
const { createClient } = require("@supabase/supabase-js");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const privateKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY;
if (!privateKey) throw new Error(`Expected env var SUPABASE_API_KEY`);
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
if (!url) throw new Error(`Expected env var SUPABASE_URL`);

const supabase = createClient(url, privateKey);

type Job = {
    id: string;
    position: string;
    company: string;
    description: string | null; // Description can be null for jobs with no description
};

const jobs: Job[] = [];

async function generateEmbedding(
    description: string
): Promise<number[] | null> {
    if (!description) return null; // Skip jobs with no description

    // Replace with your actual base URL
    const apiUrl = "http://localhost:3000/api/generate-embeddings";

    const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: description }),
    });

    const data = await res.json();

    return data.embeddings;
}

async function processJobs() {
    await Promise.all(
        jobs.map(async (j) => {
            const jobEmbedding = j.description
                ? await generateEmbedding(j.description)
                : null;

            const data = {
                id: j.id,
                job_title: j.position,
                company: j.company,
                location: null, // Optional
                job_type: null, // Optional
                description: j.description,
                embedding: jobEmbedding, // Embedding vector as an array
            };

            // Insert data into Supabase
            const { info, error } = await supabase.from("jobs").insert(data);

            //Error Checking
            if (error) {
                console.log(error);
            } else {
                //Double check information
                console.log(`Info Added: ${info}`);
                console.log("Embedding complete!");
            }
        })
    );

    // for (const job of jobs) {
    //   try {
    //     console.log(`Processing job: ${job.position}`);

    //     // Generate embedding for the job description
    //     const embeddingJob = job.description ? await generateEmbedding(job.description) : null;

    //     // Skip if embedding generation fails
    //     if (!embeddingJob) {
    //       console.warn(`Skipping job ${job.id}: No embedding generated.`);
    //       continue;
    //     }

    //     const data = {
    //       id: job.id,
    //       job_title: job.position,
    //       company: job.company,
    //       location: null, // Optional
    //       job_type: null, // Optional
    //       description: job.description,
    //       embedding: embeddingJob, // Embedding vector as an array
    //     };

    //     // Insert data into Supabase
    //     const {info, error} = await supabase.from('documents').insert(data)

    //     //Error Checking
    //     if (error){
    //       console.log(error)
    //     } else{
    //         //Double check information
    //         console.log(`Info Added: ${info}`)
    //         console.log('Embedding complete!');
    //     }

    //   } catch (error: any) {
    //       console.error(`Error processing job ${job.id}:`, error.message);
    //   }
    // }

    // console.log('All jobs processed.');
}

processJobs();
