import { FC } from "react";
import { JobPost } from "../types";

interface BoardPostProps {
    id: string;
    className?: string;
    job: JobPost;
    selected: boolean;
    setSelectedJob: React.Dispatch<React.SetStateAction<JobPost | null>>;
}

const BoardPost: FC<BoardPostProps> = ({
    id,
    job,
    selected,
    className,
    setSelectedJob,
}) => {
    return (
        <div
            id={id}
            key={job.id}
            className={`${className} p-2 shadow-sm mb-2 cursor-pointer flex flex-row justify-between text-wrap items-center ${
                selected
                    ? "bg-gray-200 hover:bg-gray-200"
                    : "bg-white hover:bg-gray-100"
            }`}
            onClick={() => setSelectedJob(job)}>
            <h3 className="text-gray-600 font-semibold">{job.job_title}</h3>
            <p className="text-gray-400 text-sm">{job.company}</p>
        </div>
    );
};

export default BoardPost;
