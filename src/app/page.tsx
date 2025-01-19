"use client";
import React, { useEffect } from "react";
import Card from "./components/card";
import { useAppContext } from "../context/AppContext";
import Link from "next/link";

export default function Index() {
    const {
        state,
        setUserName,
        setName,
        setEmail,
        setGender,
        setResume,
        setDescription,
    } = useAppContext();
    // Handlers for the sign-in actions
    const handleUserSignIn = () => {
        setUserName("HappyJellybean1134");
        setName("uottaHacker");
        setEmail("studiousMan@gmail.com");
        setGender("Male");
        setDescription(
            "I am a software engineer with a passion for hackathons and innovative projects."
        );
        setResume("Link to my resume");
    };

    const handleEmployerSignIn = () => {
        setUserName("designify");
        setName("Designify");
        setEmail("designifydesign.design.com");
        setGender("Male");
        setDescription(
            "We are a design company focused on creating innovative and user-friendly designs."
        );
    };

    useEffect(() => {
        console.log(state);
    }, [state]);

    //todo: form requireed password and email
    return (
        <div className="w-screen h-screen bg-gradient-to-br from-[#FF7621] to-[#FFAF02] flex flex-col justify-center items-center gap-10">
            <div className="transition-all duration-300 hover:scale-105 cursor-pointer bg-white p-6 rounded-2xl shadow-lg text-black hover:shadow-2xl">
                <h1 className="font-bold text-6xl">🫠 Employ Me!</h1>
            </div>
            <Card className="flex flex-col justify-center items-center gap-6 transition-all duration-300 hover:scale-105  hoveer:shado-2xl">
                <h1 className="text-3xl font-bold">Sign In</h1>
                <p>
                    Not registered yet?{" "}
                    <Link className="underline text-secondary" href="/newAccount">
                        Sign Up
                    </Link>
                </p>
                <input
                    type="text"
                    placeholder="Email"
                    className="input input-bordered w-full max-w-xs"
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="input input-bordered w-full max-w-xs"
                />
                <div className="flex flex-row gap-4">
                    <Link href="/job-board">
                        <button
                            className="btn bg-primary hover:bg-secondary"
                            onClick={handleUserSignIn}>
                            User Sign In
                        </button>
                    </Link>
                    <Link href="/postings">
                        <button
                            className="btn bg-primary hover:bg-secondary"
                            onClick={handleEmployerSignIn}>
                            Employer Sign In
                        </button>
                    </Link>
                </div>
            </Card>
        </div>
    );
}
