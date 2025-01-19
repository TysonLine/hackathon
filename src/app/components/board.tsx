import { FC, useState } from 'react'
import { JobPost } from '../types';
import BoardPost from './boardPost';
import { useAppContext } from '@/context/AppContext';

interface BoardProps {
  className?: string;
  jobs: JobPost[];
}

const Board: FC<BoardProps> = ({ className, jobs  }) => {
  const [selectedJob, setSelectedJob] = useState<JobPost | null>(null);
  const { state } = useAppContext();

  const handleApply = async (jobId: string) => {
    if (!useAppContext().state.Name) {
      alert('You need to log in to apply for jobs.');
      return;
    }

    const user = {
      id: state.userName,
      name: state.Name,
      email: state.Email,
      gender: state.gender,
      isEmployer: state.isEmployer,
      description: state.description,
      resume: state.resume,
    };

    const newApplication = {
      id: crypto.randomUUID(),
      jobId: jobId,
      date: new Date().toISOString(),
      views: 0,
      status: 'Pending',
      user,
    };

    try {
      const response = await fetch('/api/apply-to-job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newApplication),
      });

      if (response.ok) {
        const { success } = await response.json();
        if (success) {
          alert('Application submitted successfully!');
        } else {
          alert('Failed to submit the application.');
        }
      } else {
        alert('Error occurred while applying for the job.');
      }
    } catch (error) {
      console.error('Error applying for job:', error);
    }
  };

  return (
    <div className='w-full h-[75vh] flex flex-row shadow-md rounded-xl'>
        {/* left col */}
        <div className='w-3/5 bg-gray-50 p-4 overflow-y-auto flex flex-col'>
            {jobs.map((job) => (
              <BoardPost 
                key={job.id}
                job={job}
                selected={selectedJob?.id === job.id}
                setSelectedJob={setSelectedJob}
              />
            ))}
        </div>

        {/* right col */}
        <div className='w-full bg-white p-6'>
          {selectedJob ? (
            <div className='flex flex-col gap-2'>
              <h1 className="text-gray-700 text-2xl font-bold">{selectedJob.job_title}</h1>
              <h2 className="text-gray-600 text-xl">{selectedJob.company}</h2>
            <p className="text-gray-400 text-xs">job id: {selectedJob.id}</p>
            {selectedJob.match != null && (
              <p className='text-gray-400 text-xs'>
                Similarity Score: {selectedJob.match.toFixed(2)} {/* Format as needed */}
              </p>
            )}
              <p className="text-gray-600 my-4">{selectedJob.description}</p>
              <button onClick={() => handleApply(selectedJob.id)} className="btn btn-primary">
                Apply
              </button>
            </div>
          ) : (
            <p className="text-gray-500">Select a job to view details.</p>
          )}
        </div>
        
    </div>
  )
}

export default Board