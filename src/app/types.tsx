
export type JobPost = {
    id: string;
    job_title: string;
    company: string;
    location: string;
    jobType: string;
    description: string;
    match: number | null;
    applications: string[];
};


export type Application = {
    id: string;
    jobId: string;
    date: string;
    views: number;
    status: string;
    user: User;
}

export type User = {
    id: string;
    name: string;
    email: string;
    gender: string;
    isEmployer: boolean;
    description: string;
    resume: string;
}