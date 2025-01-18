import React from "react";

type CardProps = {
    children?: React.ReactNode;
    className?: string;
};

export default function Card(props: CardProps) {
    return (
        <div
            className={`card rounded-lg bg-white shadow-sm p-14 ${props.className} text-black`}>
            {props.children}
        </div>
    );
}
