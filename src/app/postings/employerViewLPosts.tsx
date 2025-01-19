"use client";
import React from "react";
import { useState } from "react";

export default function employerViewLPosts(props: any) {
    const stateSetter = props.stateSetter;

    const [posts, setPosts] = useState<JobPost[]>([
        {
            id: "1",
            job_title: "Software Engineer",
            company: "TechCorp",
            description: "Develop and maintain software applications.",
            location: "here",
            jobType: "internship",
        },
        {
            id: "2",
            job_title: "Product Manager",
            company: "Innovatech",
            description: "Lead product development and strategy.",
            location: "here",
            jobType: "internship",
        },
        {
            id: "3",
            job_title: "Data Scientist",
            company: "DataGenix",
            description: "Analyze complex datasets to drive business insights.",
            location: "here",
            jobType: "internship",
        },
        {
            id: "4",
            job_title: "Machine Learning Engineer",
            company: "DataGenix",
            description:
                "Use TensorFlow, Machine Learning, AI, RAG and Deep Learning stuff. Very AI Position yes",
            location: "here",
            jobType: "internship",
        },
    ]);
    return (
        <div className="overflow-y-scroll w-fit h-max shadow-md bg-white overflow-hidden p-6 rounded-t-2xl">
            <h1 className="text-xl font-bold mt-0 mb-6 text-gray-800">
                My Job Postings
            </h1>
            <div className="w-[50vw]  h-[70vh] bg-white overflow-y-scroll">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Position</th>
                            <th>Location</th>
                            <th>Job Type</th>
                            <th>Applications</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {posts.map((post) => (
                            <tr
                                key={post.id}
                                className="hover:bg-gray-50 transition-all duration-200">
                                <td>{post.company}</td>
                                <td>{post.position}</td>
                                <td>{post.location || "n/a"}</td>
                                <td>{post.jobType || "n/a"}</td>
                                <td>
                                    <button
                                        className={"btn btn-primary"}
                                        onClick={() =>
                                            stateSetter("viewAppList")
                                        }>
                                        {post.applications?.length || "0"}
                                    </button>
                                </td>
                                <td>
                                    <div className={"btn btn-secondary"}>
                                        Edit
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
