import React from "react";
import { Application } from "../types";

type AppList = {
    applications: Application[];
};

export default function employerViewApplicationList(props: AppList) {
    const apps = props.applications;

    return (
        <div className="overflow-y-scroll w-fit h-max shadow-md bg-white overflow-hidden p-6 rounded-t-2xl">
            <h1 className="text-xl font-bold mt-0 mb-6 text-gray-800">
                Applicant list
            </h1>

            <div className="w-[50vw] h-[70vh] bg-white overflow-y-scroll"></div>
        </div>
    );
}
