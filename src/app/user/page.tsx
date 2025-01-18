"use client";
import NavBar from "../components/NavBar";
import Content from "./content";
import { useState } from "react";

export default function page() {
    const [menuState, setMenuState] = useState("profile");

    return (<>        
        
        <div className="w-screen flex h-screen flex-col">
            
            <NavBar userType="student" />
            <div className="bg-gradient-to-br from-[#FF7621] to-[#FFAF02] w-screen h-[40%] absolute top-0 left-0"></div>
            <div className="bg-white w-screen h-[60%] absolute bottom-0 left-0"></div>
            <div className="absolute inset-0 flex flex-col items-center gap-4  justify-end shadow">
                
                <div className="flex flex-row justify-between w-[60%]">
                    <h1 className="text-white text-6xl font-semibold">
                        Your Profile
                    </h1>
                    <div className="buttonCluster flex flex-row gap-4 items-end">
                        <button
                            className="btn btn-xs rounded-sm bg-white"
                            onClick={() => setMenuState("profile")}>
                            Profile
                        </button>
                        <button
                            className="btn btn-xs rounded-sm bg-white"
                            onClick={() => setMenuState("jobs")}>
                            Jobs Applied
                        </button>
                        <button
                            className="btn btn-xs rounded-sm bg-white"
                            onClick={() => setMenuState("settings")}>
                            Settings
                        </button>
                    </div>
                </div>

                <Content menuState={menuState} />
            </div>
        </div>
        </>);
}
