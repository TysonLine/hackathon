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
      } catch (error) {
        console.error('Error fetching job posts:', error);
      }
    };

    fetchJobs();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  async function fetchCandidate() {
    try {
      const { data: candidate, error } = await supabase
        .from("candidates")
        .select("*")
        .single();

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
        match_count: 5,       // Fetch top 3 matches
      });

      if (error) {
        console.error("Error matching jobs:", error.message);
        return;
      }

      // Update the matchedJobs state and set personalized to true
      console.log("Matched Jobs:", matched);
      setMatchedJobs(matched);
      setPersonalized(true);
    } catch (error) {
      console.error("Error in matchJobsToUser:", error);
    }
  }

  function showAllJobs() {
    setMatchedJobs([]); // Reset matchedJobs
    setPersonalized(false); // Reset personalized state
  }

  return (
    <>
      <div className="bg-gradient-to-br from-[#FF7621] to-[#FFAF02] w-screen h-[40%] absolute top-0 left-0"></div>
      <div className="bg-white w-screen h-[60%] absolute bottom-0 left-0"></div>
      
      <NavBar userType="student" />
      <div className="absolute inset-0 flex flex-col h-screen items-center w-screen">


        <div className='w-[80vw] flex flex-col items-center'>
          <div className='flex flex-row mt-20 mb-2 items-center gap-2' >
            <input
              type="text"
              placeholder="Search jobs..."
              className="input input-bordered"
              value={searchTerm}
              onChange={handleSearch}
            />

            <button onClick={matchJobsToUser} className='btn'>
              Personalize
            </button>
            <button onClick={showAllJobs} className='btn'>
              All Jobs
            </button>
          </div>
          
          {/* Job Board */}
          <Board jobs={matchedJobs.length > 0 ? matchedJobs : jobs} />

        </div>
      </div>
    </>
  );
}

