"use client";
import React, { useState, useEffect } from "react";
import { Application, JobPost } from "../types";
import { useAppContext } from "@/context/AppContext";

const Applications = () => {
    const {
        state,
        setUserName,
        setName,
        setEmail,
        setGender,
        setResume,
        setDescription,
    } = useAppContext();

    const [jobs, setJobs] = useState<JobPost[]>([]);
    const [apps, setApps] = useState<Application[]>([]);

    async function fetchJobs() {
        try {
            const res = await fetch("/api/postsAPI", {
                method: "GET",
            });

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            const data = await res.json();
            setJobs(data);
            console.log("Fetched Data asdf:", data); // Handle the fetched data as needed
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    async function fetchApps() {
        try {
            const res = await fetch("/api/applicationsAPI", {
                method: "GET",
            });

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            const data = await res.json();
            setApps(data);
            console.log("Fetched apps:", data); // Handle the fetched data as needed
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        fetchJobs();
        setTimeout(() => {
            fetchApps();
        }, 1000);
    }, []);

    return (
        <div className="overflow-y-scroll w-fit h-fit bg-white overflow-hidden">
            <h1 className="text-xl font-bold mt-0 mb-4 text-gray-800">
                Applications
            </h1>
            <div className="w-full h-[70vh] bg-white shadow-md overflow-y-scroll">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Position</th>
                            <th>Location</th>
                            <th>Date Applied</th>
                            <th>Views</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {apps
                            .filter((app) => app.user.name === state.Name)
                            .map((app) => (
                                <tr key={app.id}>
                                    {jobs
                                        .filter((job) => job.id === app.jobId)
                                        .map((job) => (
                                            <>
                                                <td>{job.company || "n/a"}</td>
                                                <td>
                                                    {job.job_title || "n/a"}
                                                </td>
                                                <td>{job.location || "n/a"}</td>
                                            </>
                                        ))}

                                    <td>{app.date || "n/a"}</td>
                                    <td>{app.views || "n/a"}</td>
                                    <td>{app.status || "n/a"}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Applications;
