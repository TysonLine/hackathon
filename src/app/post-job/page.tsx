'use client';

import NavBar from '../components/NavBar';
import React, { useState } from 'react';

const AddJob = () => {
  const [position, setPosition] = useState('');
  const [company, setCompany] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    
  };

    return (<>        
        <div className="w-screen flex h-screen flex-col">
            <NavBar userType="employer" />
            <div className="bg-gradient-to-br from-[#FF7621] to-[#FFAF02] w-screen h-[40%] absolute top-0 left-0"></div>
            <div className="bg-white w-screen h-[60%] absolute bottom-0 left-0"></div>
            <div className="absolute inset-0 flex flex-col items-center gap-4  justify-end shadow">
                
            <div className="overflow-y-scroll w-[40vw] h-[75vh] shadow-md bg-white overflow-hidden p-6 rounded-t-2xl">
                <h1 className="text-3xl font-bold text-orange-500 mb-4">Add a New Job</h1>
                <form
                    className="bg-white flex flex-col space-y-4 "
                    onSubmit={handleSubmit}
                >
                    <input
                    type="text"
                    placeholder="Position"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    className="input input-bordered"
                    />
                    <input // should  not be edited
                    type="text"
                    placeholder="Company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="input input-bordered"
                    />
                    {/* location input */}
                    {/* job type input */}
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
    </div>
  </>);
};

export default AddJob;
