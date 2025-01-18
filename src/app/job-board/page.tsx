"use client"
// pages/job-board.tsx
import { useState, useEffect } from 'react';
//import SolaceClient from '../utils/solaceClient'; // Import for Solace PubSub+
//import axios from 'axios';
import { JobPost } from '../types';
import Board from '../components/board';
import NavBar from '../components/NavBar';

export default function JobBoard() {
  const [jobs, setJobs] = useState<JobPost[]>([
    {
      id: '1',
      position: 'Software Engineer',
      company: 'TechCorp',
      description: 'Develop and maintain software applications.',
    },
    {
      id: '2',
      position: 'Product Manager',
      company: 'Innovatech',
      description: 'Lead product development and strategy.',
    },
    {
      id: '3',
      position: 'Data Scientist',
      company: 'DataGenix',
      description: 'Analyze complex datasets to drive business insights.',
    },
    {
      id: '4',
      position: 'Machine Learning Engineer',
      company: 'DataGenix',
      description: 'Use TensorFlow, Machine Learning, AI, RAG and Deep Learning stuff. Very AI Position yes',
    },
  ]);

  



  const [searchTerm, setSearchTerm] = useState<string>('');

  {/*useEffect(() => {
    // Fetch jobs from MongoDB Atlas via API route
    axios.get<JobPost[]>('/api/jobs').then((response) => {
      setJobs(response.data);
    });

    // Subscribe to Solace topic for real-time updates
    const solaceClient = new SolaceClient('YOUR_TOPIC_HERE');
    solaceClient.onMessage((message: JobPost) => {
      setJobs((prevJobs) => [message, ...prevJobs]);
    });

    return () => solaceClient.disconnect();
  }, []); */}

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }; 

  // 
  // filtered jobs needs to be updated
  const filteredJobs = searchTerm
    ? jobs.filter((job) =>
        job.position.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : jobs;

    

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
          <button className='btn'>
            Personalize
          </button>
        </div>
        
        {/* Job Board */}
        <Board jobs={filteredJobs} />

      </div>
      
    </div>
  </>);
}
