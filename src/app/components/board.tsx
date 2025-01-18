import { FC, useState } from 'react'
import { JobPost } from '../types';

interface BoardProps {
  className?: string;
  jobs: JobPost[];
}

const Board: FC<BoardProps> = ({ className, jobs  }) => {
  const [selectedJob, setSelectedJob] = useState<JobPost | null>(null);

  return (
    <div className='w-full h-[75vh] flex flex-row shadow-md'>
        {/* left col */}
        <div className='w-2/5 bg-gray-50 p-4 overflow-y-auto'>
        <div>
            {jobs.map((job) => (
              <div
                key={job.id}
                className={`p-4 border rounded mb-2 cursor-pointer ${
                  selectedJob?.id === job.id ? 'bg-blue-100' : ''
                }`}
                onClick={() => setSelectedJob(job)}
              >
                <h3 className="text-lg font-semibold">{job.position}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* right col */}
        <div className='w-full bg-white p-6'>
          {selectedJob ? (
            <div>
              <h1 className="text-2xl font-bold mb-4">{selectedJob.position}</h1>
              <p className="mb-6">{selectedJob.description}</p>
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
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