'use client';

import NavBar from '../components/NavBar';
import React, { useState } from 'react';
import { JobPost } from '../types';
import { useAppContext } from '../../context/AppContext';

const AddJob = () => {
  const [position, setPosition] = useState('');
  const company = useAppContext().state.Name;
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState(''); 
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newJob: JobPost = {
      id: crypto.randomUUID(),
      job_title: position,
      company,
      location,
      jobType,
      description,
      match: null,
      applications: [],
    };

    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newJob),
      });

      if (response.ok) {
        setStatus('Job added successfully!');
        setPosition('');
        setDescription('');
        setLocation('');
        setJobType('');
      } else {
        setStatus('Failed to add job. Please try again.');
      }
    } catch (error) {
      console.error('Error adding job:', error);
      setStatus('An error occurred. Please try again.');
    }
  };

  return (
    <>        
        <div className="w-screen flex h-screen flex-col">
            <NavBar userType="employer" />
            <div className="bg-gradient-to-br from-[#FF7621] to-[#FFAF02] w-screen h-[40%] absolute top-0 left-0"></div>
            <div className="bg-white w-screen h-[60%] absolute bottom-0 left-0"></div>
            <div className="absolute inset-0 flex flex-col items-center gap-4 justify-end shadow">
                
                <div className="overflow-y-scroll w-[40vw] h-[75vh] shadow-md bg-white overflow-hidden p-6 rounded-t-2xl">
                    <h1 className="text-3xl font-bold text-orange-500 mb-4">Add a New Job</h1>
                    <form
                        className="bg-white flex flex-col space-y-4"
                        onSubmit={handleSubmit}
                    >
                        <input
                          type="text"
                          placeholder="Position"
                          value={position}
                          onChange={(e) => setPosition(e.target.value)}
                          className="input input-bordered"
                        />
                        <input // Read-only company input
                          type="text"
                          placeholder="Company"
                          value={company}
                          readOnly
                          className="input input-bordered bg-gray-100 cursor-not-allowed"
                        />
                        <input
                          type="text"
                          placeholder="Location"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className="input input-bordered"
                        />
                        <select
                          value={jobType}
                          onChange={(e) => setJobType(e.target.value)}
                          className="select select-bordered"
                        >
                          <option value="" disabled>Select Job Type</option>
                          <option value="Full-Time">Full-Time</option>
                          <option value="Part-Time">Part-Time</option>
                          <option value="Contract">Contract</option>
                          <option value="Internship">Internship</option>
                        </select>
                        <textarea
                          placeholder="Description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          className="textarea textarea-bordered"
                        />
                        <button type="submit" className="btn btn-orange-500">Add Job</button>
                    </form>
                    {status && <p className="mt-4 text-gray-600">{status}</p>}
                </div>
            </div>
        </div>
    </>
  );
};

export default AddJob;
