"use client"
import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import { JobPost } from '../types';

const page = () => {
  const [posts, setPosts] = useState<JobPost[]>([
      {
        id: '1',
        position: 'Software Engineer',
        company: 'TechCorp',
        description: 'Develop and maintain software applications.',
        location: 'here',
        jobType: 'internship'
      },
      {
        id: '2',
        position: 'Product Manager',
        company: 'Innovatech',
        description: 'Lead product development and strategy.',
        location: 'here',
        jobType: 'internship'
      },
      {
        id: '3',
        position: 'Data Scientist',
        company: 'DataGenix',
        description: 'Analyze complex datasets to drive business insights.',
        location: 'here',
        jobType: 'internship'
      },
      {
        id: '4',
        position: 'Machine Learning Engineer',
        company: 'DataGenix',
        description: 'Use TensorFlow, Machine Learning, AI, RAG and Deep Learning stuff. Very AI Position yes',
        location: 'here',
        jobType: 'internship'
      },
  ]);

  return (
    <div className="w-screen flex h-screen flex-col">
            
            <NavBar userType="employer" />
            <div className="bg-gradient-to-br from-[#FF7621] to-[#FFAF02] w-screen h-[40%] absolute top-0 left-0"></div>
            <div className="bg-white w-screen h-[60%] absolute bottom-0 left-0"></div>
            <div className="absolute inset-0 flex flex-col items-center gap-4  justify-end shadow">
              <div className="overflow-y-scroll w-fit h-max shadow-md bg-white overflow-hidden p-6 rounded-t-2xl">
                <h1 className="text-xl font-bold mt-0 mb-6 text-gray-800">My Job Postings</h1>
                <div className="w-full h-[70vh] bg-white overflow-y-scroll"> 
                  <table className="table w-full">
                    {/* head */}
                    <thead>
                      <tr>
                        <th>Company</th>
                        <th>Position</th>
                        <th>Location</th>
                        <th>Job Type</th>
                        <th>Applications</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700">
                      {posts.map((post) => (
                        <tr key={post.id} className='hover:bg-gray-50 transition-all duration-200'>
                          <td>{post.company}</td>
                          <td>{post.position}</td>
                          <td>{post.location || "n/a"}</td>
                          <td>{post.jobType || "n/a"}</td>
                          <td><div className={'btn btn-primary'}>{post.applications?.length || '0'}</div></td>
                          <td><div className={'btn btn-secondary'}>Edit</div></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
            
              </div>
                
            </div>
        </div>
  )
}

export default page