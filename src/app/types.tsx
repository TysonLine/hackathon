export type JobPost = {
    id: string;
    job_title: string;
    company: string;
    location?: string;
    jobType?: string;
    description: string;
    applications?: Application[];
    match: number | null;
};

export type Application = {
    id: string;
    jobId: number;
    date: string;
    views: number;
    status: string;
};
