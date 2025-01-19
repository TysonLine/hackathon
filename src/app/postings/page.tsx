"use client";
import NavBar from "../components/NavBar";
import { useState, useEffect } from "react";
import EmployerViewLPosts from "./employerViewLPosts";
import EmployerViewApplicationList from "./employerViewApplicationList";
import EmployerViewApplication from "./employerViewApplication";
import fetchJobs from "@/app/postings/fetchJobs";

const page = () => {
    const [jobs, setJobs] = useState();

    useEffect(() => {
        fetchJobs().then(result => setJobs(result))
    }, []);

    const [mode, setMode] = useState("posts");

    return (
        <div className="w-screen flex h-screen flex-col">
            <NavBar userType="employer" />
            <div className="bg-gradient-to-br from-[#FF7621] to-[#FFAF02] w-screen h-[40%] absolute top-0 left-0"></div>
            <div className="bg-white w-screen h-[60%] absolute bottom-0 left-0"></div>
            <div className="absolute inset-0 flex flex-col items-center gap-4 justify-end shadow">
                <div className="overflow-y-scroll w-fit h-max overflow-hidden shadow-md rounded-t-2xl">
                    {mode === "posts" ? (
                        <EmployerViewLPosts stateSetter={setMode} />
                    ) : null}
                    {mode === "viewAppList" ? (
                        <EmployerViewApplicationList applications={[]} />
                    ) : // use filter to see the applications that has this job id
                    null}
                    {mode === "viewApp" ? <EmployerViewApplication /> : null}
                </div>
            </div>
        </div>
    );
};

export default page;
