"use client";
import { FC, useState, useContext } from "react";
import { Application, JobPost, User } from "../types";
import BoardPost from "./boardPost";
import { useAppContext } from "@/context/AppContext";

interface BoardProps {
    className?: string;
    jobs: JobPost[];
}

export default function Board({ className, jobs }: BoardProps) {
    const {
        state,
        setUserName,
        setName,
        setEmail,
        setGender,
        setResume,
        setDescription,
    } = useAppContext();
    const [selectedJob, setSelectedJob] = useState<JobPost | null>(null);

    const handleApply = async (jobId: string) => {
        alert("Job Applied!");
        if (!state.Name) {
            alert("You need to log in to apply for jobs.");
            return;
        }

        const user: User = {
            id: state.userName,
            name: state.Name,
            email: state.Email,
            gender: state.gender,
            isEmployer: state.isEmployer,
            description: state.description,
            resume: state.resume,
        };

        const newApplication: Application = {
            id: crypto.randomUUID(),
            jobId: jobId,
            date: new Date().toISOString(),
            views: 0,
            status: "Pending",
            user: user,
        };

        try {
            const response = await fetch("/api/apply-to-job", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newApplication),
            });

            if (response.ok) {
                const { success } = await response.json();
            } else {
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

  return (
    <div className='w-full h-[75vh] flex flex-row shadow-md rounded-2xl'>
        {/* left col */}
        <div className='w-3/5 bg-gray-50 p-4 overflow-y-auto flex flex-col rounded-l-2xl'>
        {jobs && jobs.length != 0 && jobs.map((job) => (
              <BoardPost 
                key={job.id}
                job={job}
                selected={selectedJob?.id === job.id}
                setSelectedJob={setSelectedJob}
              />
            ))}
        </div>

        {/* right col */}
        <div className='w-full bg-white p-6 rounded-r-2xl'>
          {selectedJob ? (
            <div className='flex flex-col gap-2'>
              <h1 className="text-gray-700 text-2xl font-bold">{selectedJob.job_title}</h1>
              <h2 className="text-gray-600 text-xl">{selectedJob.company}</h2>
            <p className="text-gray-400 text-xs">job id: {selectedJob.id}</p>
            <div className='flex flex-row gap-12'>
              <p className="text-gray-500">🏙️ {selectedJob.location}</p>
              <p className="text-gray-500">💻 {selectedJob.jobType}</p>
            </div>
            {selectedJob.match != null && (
              <p className='text-gray-400 text-xs'>
                Similarity Score: {selectedJob.match.toFixed(2)} {/* Format as needed */}
              </p>
            )}
              <div className="overflow-y-auto max-h-[40vh] my-4">
                <p className="text-gray-600 my-4">{selectedJob.description}</p>
              </div>
              <button onClick={() => handleApply(selectedJob.id)} className="btn btn-primary">
                Apply
              </button>
            </div>
          ) : (
            <p className="text-gray-500">Select a job to view details.</p>
          )}
        </div>
      </div>
    );
}
