"use client";
import React, { useState } from "react";
import NavBar from "../components/NavBar";
import { Application, JobPost } from "../types";

const Applications = () => {
    // pages/job-board.tsx
    const [jobs, setJobs] = useState<JobPost[]>([
        {
            id: "1",
            position: "Software Engineer",
            company: "TechCorp",
            description: "Develop and maintain software applications.",
        },
        {
            id: "2",
            position: "Product Manager",
            company: "Innovatech",
            description: "Lead product development and strategy.",
        },
        {
            id: "3",
            position: "Data Scientist",
            company: "DataGenix",
            description: "Analyze complex datasets to drive business insights.",
        },
    ]);

    const [applications, setApplications] = useState<Application[]>([
        {
            id: "1",
            job: {
                id: "1",
                position: "Software Engineer",
                company: "TechCorp",
                description: "Develop and maintain software applications.",
            },
            date: "2025-01-10",
            views: 120,
            status: "Under Review",
        },
        {
            id: "2",
            job: {
                id: "2",
                position: "Product Manager",
                company: "Innovatech",
                description: "Lead product development and strategy.",
            },
            date: "2025-01-12",
            views: 85,
            status: "Accepted",
        },
        {
            id: "3",
            job: {
                id: "3",
                position: "Data Scientist",
                company: "DataGenix",
                description:
                    "Analyze complex datasets to drive business insights.",
            },
            date: "2025-01-15",
            views: 67,
            status: "Rejected",
        },
        {
            id: "4",
            job: {
                id: "4",
                position: "Frontend Developer",
                company: "WebWorks",
                description: "Design and implement user interfaces.",
            },
            date: "2025-01-08",
            views: 45,
            status: "Interview Scheduled",
        },
        {
            id: "5",
            job: {
                id: "5",
                position: "Backend Developer",
                company: "CodeBase Inc.",
                description: "Develop server-side applications and APIs.",
            },
            date: "2025-01-14",
            views: 90,
            status: "Under Review",
        },
        {
            id: "6",
            job: {
                id: "6",
                position: "UX Designer",
                company: "Designify",
                description:
                    "Enhance user experiences through innovative designs.",
            },
            date: "2025-01-09",
            views: 100,
            status: "Rejected",
        },
        {
            id: "7",
            job: {
                id: "7",
                position: "DevOps Engineer",
                company: "CloudSync",
                description:
                    "Optimize CI/CD pipelines and cloud infrastructure.",
            },
            date: "2025-01-13",
            views: 50,
            status: "Accepted",
        },
        {
            id: "8",
            job: {
                id: "8",
                position: "AI Engineer",
                company: "AI Solutions",
                description: "Develop cutting-edge machine learning models.",
            },
            date: "2025-01-11",
            views: 110,
            status: "Under Review",
        },
        {
            id: "9",
            job: {
                id: "9",
                position: "Marketing Analyst",
                company: "Marketify",
                description: "Analyze market trends and create reports.",
            },
            date: "2025-01-16",
            views: 70,
            status: "Interview Scheduled",
        },
        {
            id: "10",
            job: {
                id: "10",
                position: "Cybersecurity Specialist",
                company: "SecureNet",
                description: "Ensure the security of digital infrastructure.",
            },
            date: "2025-01-07",
            views: 130,
            status: "Under Review",
        },
    ]);

    return (
        <div className="overflow-y-scroll w-fit h-fit bg-white overflow-hidden">
            <h1 className="text-xl font-bold mt-0 mb-4 text-gray-800">Applications</h1>
            <div className="w-full h-[70vh] bg-white shadow-md overflow-y-scroll"> 
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Position</th>
                            <th>Date Applied</th>
                            <th>Location</th>
                            <th>Views</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {applications.map((application) => (
                            <tr key={application.id}>
                                <td>{application.job.company}</td>
                                <td>{application.job.position}</td>
                                <td>{application.date}</td>
                                <td>{application.job.location || "n/a"}</td>
                                <td>{application.views}</td>
                                <td>{application.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
        </div>
    );
};

export default Applications;
