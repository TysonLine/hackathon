import React from "react";
import testUser from "./testUser.json";
import Card from "../components/card";

export default function jobs() {
    return (
        <div className="text-black flex flex-col gap-4">
            {testUser.Jobs.map((job, index) => (
                <Card
                    key={index}
                    className="drop-shadow-md p-4 flex flex-row justify-between items-end">
                    <div>
                        <h2 className="card-title">{job.companyName}</h2>
                        <h3 className="">{job.jobName}</h3>
                        <p className="text-sm text-gray-400 font-thin">
                            id: {job.jobId}
                        </p>
                    </div>
                    <p className="card-description">{job.Status}</p>
                </Card>
            ))}
        </div>
    );
}
