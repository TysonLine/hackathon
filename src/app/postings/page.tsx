"use client";
import NavBar from "../components/NavBar";
import { useState, useEffect } from "react";
import EmployerViewLPosts from "./employerViewLPosts";
import EmployerViewApplicationList from "./employerViewApplicationList";
import EmployerViewApplication from "./employerViewApplication";

const page = () => {
    const [jobs, setJobs] = useState();

    async function fetchPosts() {
        console.log("fetching postings");
        try {
            const res = await fetch("/api/postsAPI", {
                method: "GET",
            });

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            const data = await res.json();
            console.log("Fetched Data:", data);
        } catch (error) {
            console.error("Error:", error);
        }
    }
    useEffect(() => {
        fetchPosts();
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
