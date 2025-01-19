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
        setUserName("DanielChen");
        setName("DanielChen");
        setEmail("danielchenschw@gmail.com");
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
        <div className="w-screen h-screen bg-gradient-to-br from-[#FF7621] to-[#FFAF02] flex justify-center items-center">
            <Card className="flex flex-col justify-center items-center gap-6">
                <h1 className="text-3xl font-bold">Sign In</h1>
                <p>
                    Not registered yet?{" "}
                    <a className="underline text-secondary" href="/newAccount">
                        Sign Up
                    </a>
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
