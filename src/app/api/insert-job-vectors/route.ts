/** Supabase config */
const { createClient } = require("@supabase/supabase-js");

const privateKey = process.env.SUPABASE_API_KEY;
if (!privateKey) throw new Error(`Expected env var SUPABASE_API_KEY`);
const url = process.env.SUPABASE_URL;
if (!url) throw new Error(`Expected env var SUPABASE_URL`);

const supabase = createClient(url, privateKey);

export async function POST(req: Request) {
    try {
      // Step 1: Parse and validate the request body
      const { id, positionName, company, location, jobType, description, embedding } = await req.json();
  
      if (!id || !positionName || !company || !description || !embedding) {
        return new Response(
          JSON.stringify({
            error: 'Missing required fields: id, positionName, company, description, or embedding',
          }),
          { status: 400 }
        );
      }
  
      // Step 2: Prepare data for insertion
      const data = {
        id,
        job_title: positionName,
        company,
        location: location || null, // Optional
        job_type: jobType || null, // Optional
        description,
        embedding, // Embedding vector as an array
      };
  
      // Step 3: Insert job data into Supabase
      const { data: insertedData, error } = await supabase.from('jobs').insert([data]);
  
      if (error) {
        console.error('Error inserting data into Supabase:', error.message);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
      }
  
      // Step 4: Return success response
      return new Response(JSON.stringify({ message: 'Job inserted successfully', data: insertedData }), {
        status: 200,
      });
    } catch (error: any) {
      console.error('Error in POST route:', error.message);
      return new Response(JSON.stringify({ error: 'Failed to insert job', details: error.message }), {
        status: 500,
      });
    }
  }
