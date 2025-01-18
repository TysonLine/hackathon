import React from "react";
import Profile from "./profile";
import Applications from "../components/applications";

type ContentProps = {
    children?: React.ReactNode;
    menuState?: string;
    className?: string;
};

export default function Content(props: ContentProps) {
    return (
        <div className="w-[60%] h-[80%] rounded-sm bg-white shadow-md p-12 text-black">
            {props.children}
            {props.menuState === "profile" && <Profile />}
            {props.menuState === "jobs" && <Applications />}
            {props.menuState === "settings" && (
                <div>settings not implemented</div>
            )}
        </div>
    );
}
