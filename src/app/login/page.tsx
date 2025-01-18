import React from "react";
import Card from "../components/card";

export default function Index() {
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
                <button className="btn bg-primary hover:bg-secondary btn-wide">
                    Sign In
                </button>
            </Card>
        </div>
    );
}
