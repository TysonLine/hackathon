"use client"
// pages/job-board.tsx
import { useState, useEffect } from 'react';
//import SolaceClient from '../utils/solaceClient'; // Import for Solace PubSub+
//import axios from 'axios';
import { JobPost } from '../types';
import Board from '../components/board';
import NavBar from '../components/NavBar';

import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_API_KEY!
);


export default function JobBoard() {
  const [matchedJobs, setMatchedJobs] = useState<JobPost[]>([]);
  const [personalized, setPersonalized] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [jobs, setJobs] = useState<JobPost[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('/api/postsAPI');
        const data = await response.json();
        setJobs(data);
        console.log('Fetched job posts:', data);
        console.log('jobs:', jobs);
      } catch (error) {
        console.error('Error fetching job posts:', error);
      }
    };

    fetchJobs();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }; 

  //
  // filtered jobs needs to be updated
  // const filteredJobs = searchTerm
  //   ? jobs.filter((job) =>
  //       job.position.toLowerCase().includes(searchTerm.toLowerCase())
  //     )
  //   : jobs;

  async function fetchCandidate() {
    try {
      const { data: candidate, error } = await supabase
        .from("candidates")
        .select("*") // Replace "*" with specific columns if needed
        .single(); // Ensures only one row is returned
  
      if (error) {
        console.error("Error fetching candidate:", error.message);
        return null;
      }
  
   
      return candidate.embedding; 
    } catch (error) {
      console.error("Unexpected error fetching candidate:", error);
      return null;
    }
  }

  
  async function matchJobsToUser() {
    try {
      // Fetch the candidate's embedding
      const embedding = await fetchCandidate();
  
      if (!embedding) {
        console.error("No embedding found for candidate.");
        return;
      }
  
      // Call the `match_jobs_for_candidate` RPC
      const { data: matched, error } = await supabase.rpc("match_jobs_for_candidate", {
        query_embedding: embedding,
        match_threshold: 0.5, // Adjust threshold as needed
        match_count: 3,       // Fetch top 3 matches
      });
  
      if (error) {
        console.error("Error matching jobs:", error.message);
        return;
      }
  
      // Log the matched jobs
      console.log("Matched Jobs:", matched);
      setMatchedJobs(matched)

    } catch (error) {
      console.error("Error in matchJobsToUser:", error);
    }
  }
  
    

  return (<>
    <NavBar userType="student" />
    <div className="flex flex-col h-screen bg-orange-400 items-center">
      <div className='w-[80vw] flex flex-col items-center'>
        <div className='flex flex-row mt-20 mb-2 items-center gap-2' >
          <input
            type="text"
            placeholder="Search jobs..."
            className="input input-bordered"
            value={searchTerm}
            onChange={handleSearch}
          />


          {/*Will take the only entry in Supabase and Match Jobs the best it can */}
          <button onClick={() => {
            
            matchJobsToUser
            setPersonalized(!personalized)
          }
          }  className='btn'>
            Personalize
          </button>
        </div>
        
        {/* Job Board */}
        <Board jobs={matchedJobs.length > 0 && personalized ? matchedJobs: jobs} />

      </div>
      
    </div>
  </>);
}
