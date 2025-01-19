import React from "react";
import { Application } from "../types";

type AppList = {
    applications: Application[];
    stateSetter: React.Dispatch<React.SetStateAction<string>>;
    selectedJob: Job;
};

export default function employerViewApplicationList(props: AppList) {
    const apps = props.applications;
    const selectedJob = props.selectedJob;

    return (
        <div className="overflow-y-scroll w-fit h-max shadow-md bg-white overflow-hidden p-6 rounded-t-2xl">
            <div className="w-[50vw] h-[70vh] bg-white overflow-y-scroll">
                <h1 className="text-xl font-bold mt-0 text-gray-800">
                    Applicant list
                </h1>
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>date</th>
                            <th>user name</th>
                            <th>views</th>
                            <th>status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {apps
                            .filter((app) => app.jobId === selectedJob.id)
                            .map((app) => (
                                <tr
                                    key={app.id}
                                    className="hover:bg-gray-50 transition-all duration-200">
                                    <td>{app.date}</td>
                                    <td>{app.user.name}</td>
                                    <td>{app.views}</td>
                                    <td>{app.status || "n/a"}</td>
                                    <td>
                                        <button
                                            className={"btn btn-primary"}
                                            onClick={() =>
                                                props.stateSetter("viewApp")
                                            }>
                                            view details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            <button
                className={"btn btn-primary"}
                onClick={() => props.stateSetter("posts")}>
                back
            </button>
        </div>
    );
}
