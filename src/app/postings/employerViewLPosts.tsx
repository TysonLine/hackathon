"use client";
import React from "react";
import { useEffect } from "react";
import { useAppContext } from "../../context/AppContext";

export default function employerViewLPosts(props: any) {
    const stateSetter = props.stateSetter;

    const jobs = props.jobs;
    const {
        state,
        setUserName,
        setName,
        setEmail,
        setGender,
        setResume,
        setDescription,
    } = useAppContext();

    return (
        <div className="overflow-y-scroll w-fit h-max shadow-md bg-white overflow-hidden p-6 rounded-t-2xl">
            <h1 className="text-xl font-bold mt-0 mb-6 text-gray-800">
                My Job Postings
            </h1>
            <button onClick={() => stateSetter("viewApp")}>
                testButtonRemoveLater
            </button>
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
                        {jobs
                            .filter((post) => post.company === state.Name)
                            .map((post) => (
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
