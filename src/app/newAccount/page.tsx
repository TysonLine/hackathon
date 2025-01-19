import React from "react";
import Card from "../components/card";

//todo: form validation for confirm password, passwords must match

export default function Index() {
    return (
        <div className="w-screen h-screen bg-gradient-to-br from-[#FF7621] to-[#FFAF02] flex justify-center items-center">
            <Card className="flex flex-col justify-center items-center gap-6">
                <h1 className="text-3xl font-bold">New Account</h1>
                <p>
                    Have an account?{" "}
                    <a className="underline text-secondary" href="/login">
                        Log in
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
