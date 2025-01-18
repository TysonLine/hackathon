
export type JobPost = {
    id: string;
    position: string;
    company: string;
    location?: string;
    jobType?: string;
    description: string;
}

export type Application = {
    id: string;
    job: JobPost;
    date: string;
    views: number;
    status: string;
}