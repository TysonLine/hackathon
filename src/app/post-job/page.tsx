'use client';

import NavBar from '../components/NavBar';
import React, { useState } from 'react';

const AddJob = () => {
  const [position, setPosition] = useState('');
  const [company, setCompany] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    
  };

    return (
      
        <div>
            <NavBar />
        <div className="min-h-screen flex flex-col items-center justify-center bg-orange-50">
        <h1 className="text-3xl font-bold text-orange-500 mb-4">Add a New Job</h1>
        <form
            className="bg-white p-6 shadow-md rounded-lg w-1/3 flex flex-col space-y-4"
            onSubmit={handleSubmit}
        >
            <input
            type="text"
            placeholder="Position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="input input-bordered"
            />
            <input
            type="text"
            placeholder="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="input input-bordered"
            />
            <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea textarea-bordered"
            />
            <button className="btn btn-orange-500">Add Job</button>
        </form>
        {status && <p className="mt-4 text-gray-600">{status}</p>}
            </div>
    </div>
  );
};

export default AddJob;
