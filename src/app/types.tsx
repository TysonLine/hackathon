
export type JobPost = {
    id: string;
    position: string;
    company: string;
    location: string;
    jobType: string;
    description: string;
    applications: string[];
}

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