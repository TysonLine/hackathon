"use client";
import React, { useState } from "react";
import NavBar from "../components/NavBar";
import { Application, JobPost } from "../types";

const Applications = () => {
    const [applications, setApplications] = useState<Application[]>([]);

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
