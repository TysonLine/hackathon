import React from "react";
import testUser from "./testUser.json";
import PdfViewer from "../components/pdfViewer";
import UploadResume from "../components/uploadResume";
import { useAppContext } from "../../context/AppContext";

export default function profile() {
    const {
        state,
        setUserName,
        setName,
        setEmail,
        setGender,
        setResume,
        setDescription,
    } = useAppContext();
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-black font-semibold text-4xl ">
                Welcome {state.Name}!
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
                                value={state.Name}
                                className="input input-bordered input-sm w-full max-w-xs"
                            />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Email</span>
                            </div>
                            <input
                                type="text"
                                value={state.Email}
                                className="input input-bordered input-sm w-full max-w-xs"
                            />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Gender</span>
                            </div>
                            <input
                                type="text"
                                value={state.gender}
                                className="input input-bordered input-sm w-full max-w-xs"
                            />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Summary</span>
                            </div>
                            <textarea
                                className="textarea textarea-bordered max-w-xs"
                                value={state.description}></textarea>
                        </label>

                        <UploadResume />
                    </form>
                </div>
            </div>
        </div>
    );
}
