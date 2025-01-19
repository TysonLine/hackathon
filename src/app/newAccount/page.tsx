import React from "react";
import Link from "next/link";
import Card from "../components/card";

//todo: form validation for confirm password, passwords must match

export default function Index() {
    return (
        <div className="w-screen h-screen bg-gradient-to-br from-[#FF7621] to-[#FFAF02] flex gap-20 justify-center items-center">
            <div className="transition-all duration-300 hover:scale-105 cursor-pointer bg-white p-6 rounded-2xl shadow-lg text-black hover:shadow-2xl">
                <h1 className="font-bold text-6xl">🫠 Employ Me!</h1>
            </div>
            <Card className="flex flex-col justify-center items-center gap-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <h1 className="text-3xl font-bold">New Account</h1>
                <p>
                    Have an account?{" "}
                    <Link className="underline text-secondary" href="/">
                        Log in
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
                <input
                    type="password"
                    placeholder="Confirm Password"
                    className="input input-bordered w-full max-w-xs"
                />
                <a href="../">
                    <button className="btn bg-primary hover:bg-secondary btn-wide">
                        Create Account
                    </button>
                </a>
            </Card>
        </div>
    );
}
