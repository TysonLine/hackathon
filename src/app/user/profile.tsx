import React from "react";
import testUser from "./testUser.json";
import PdfViewer from "../components/pdfViewer";

export default function profile() {
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-black font-semibold text-4xl ">
                Welcome {testUser.Name}!
            </h1>
            <div className="resumeSection  w-full flex flex-row justify-between items-start">
                <div className="resumeSectionLeft flex flex-col gap-2 h-full w-1/2 justify-start flex-grow-1">
                    <h2 className="text-black font-semibold text-2xl">
                        Resume
                    </h2>
                    <PdfViewer url="/resume.pdf" />
                </div>
                <div className="resumeSectionRight flex flex-col gap-2 w-1/2 h-auto">
                    <h2 className="text-black font-semibold text-2xl">
                        Information
                    </h2>
                    <p>This is what they employers see about you</p>
                    <form className="flex flex-col gap-1">
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Name</span>
                            </div>
                            <input
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered input-sm w-full max-w-xs"
                            />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Email</span>
                            </div>
                            <input
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered input-sm w-full max-w-xs"
                            />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Name</span>
                            </div>
                            <input
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered input-sm w-full max-w-xs"
                            />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Summary</span>
                            </div>
                            <textarea
                                className="textarea textarea-bordered max-w-xs"
                                placeholder="Bio"></textarea>
                        </label>

                        <button className="btn btn-primary flex-grow-0 flex-shrink-0 w-24 mt-2">
                            Upload resume
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
