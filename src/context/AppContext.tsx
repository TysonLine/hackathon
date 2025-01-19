"use client";
// src/context/AppContext.tsx

import React, { createContext, useState, ReactNode, useContext } from "react";

// Define types for your context state
interface AppState {
    userName: string;
    Name: string;
    Password: string;
    Email: string;
    gender: string;
    isEmployer: boolean;
    description: string;
    resume: string;
}

// Define a type for the context value (which includes state and functions)
interface AppContextType {
    state: AppState;
    setUserName: (userName: string) => void;
    setName: (name: string) => void;
    setPassword: (password: string) => void;
    setEmail: (email: string) => void;
    setGender: (gender: string) => void;
    setIsEmployer: (isEmployer: boolean) => void;
    setDescription: (description: string) => void;
    setResume: (resume: string) => void;
}

// Create the context with a default value
const AppContext = createContext<AppContextType | undefined>(undefined);

// Create the Provider Component
export const AppProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [state, setState] = useState<AppState>({
        userName: "",
        Name: "",
        Password: "",
        Email: "",
        gender: "",
        isEmployer: false,
        description: "",
        resume: "",
    });

    const setUserName = (userName: string) =>
        setState((prev) => ({ ...prev, userName }));
    const setName = (name: string) =>
        setState((prev) => ({ ...prev, Name: name }));
    const setPassword = (password: string) =>
        setState((prev) => ({ ...prev, Password: password }));
    const setEmail = (email: string) =>
        setState((prev) => ({ ...prev, Email: email }));
    const setGender = (gender: string) =>
        setState((prev) => ({ ...prev, gender }));
    const setIsEmployer = (isEmployer: boolean) =>
        setState((prev) => ({ ...prev, isEmployer }));
    const setDescription = (description: string) =>
        setState((prev) => ({ ...prev, description }));
    const setResume = (resume: string) =>
        setState((prev) => ({ ...prev, resume }));

    return (
        <AppContext.Provider
            value={{
                state,
                setUserName,
                setName,
                setPassword,
                setEmail,
                setGender,
                setIsEmployer,
                setDescription,
                setResume,
            }}>
            {children}
        </AppContext.Provider>
    );
};

// Custom hook to access the context
export const useAppContext = (): AppContextType => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
};
