import React from "react";
import UploadResume from "./uploadResume";

export default function NavBar() {
    return (
        <div className="bg-white border-b-2 h-12 m-0 text-black flex flex-row justify-end items-center p-8">
            navBar
            <UploadResume />
        </div>
    );
}
