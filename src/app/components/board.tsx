import { FC, useState } from 'react'
import { JobPost } from '../types';
import BoardPost from './boardPost';

interface BoardProps {
  className?: string;
  jobs: JobPost[];
}

const Board: FC<BoardProps> = ({ className, jobs  }) => {
  const [selectedJob, setSelectedJob] = useState<JobPost | null>(null);

  return (
    <div className='w-full h-[75vh] flex flex-row shadow-md'>
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
            <div>
              <h1 className="text-2xl font-bold mb-4">{selectedJob.position}</h1>
              <p className="mb-6">{selectedJob.description}</p>
              <button className="btn btn-primary">
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