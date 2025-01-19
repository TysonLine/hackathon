import React from "react";
import { FC } from "react";
import Link from "next/link";

interface NavBarProps {
    userType: string;
}

const NavBar: FC<NavBarProps> = ({ userType }) => {
    return (
      <nav className="max-w-screen min-w-screen flex items-center justify-between bg-white p-2 px-4 shadow-md text-gray-700 relative z-50">
        {/* Logo and User Type */}
        <div className="flex items-center">
          <Link href={userType=="student" ? "/job-board" : "/postings"} className="text-lg font-bold mr-4">Employ Me!</Link>
          <Link href="/" className="text-sm text-gray-600">
            {userType === 'student' ? 'Student' : 'Employer'}
          </Link>
        </div>

        {/* Center Links */}
        <div className="flex flex-row gap-x-6">
          {userType === 'student' ? (
            <>
              <Link href="/job-board" className="mx-2">Job Board</Link>
            </>
          ) : (
            <>
              <Link href="/post-job" className="mx-2">Post Job</Link>
              <Link href="/postings" className="mx-2">Postings</Link>
            </>
          )}
        </div>

        {/* Notifications and Profile */}
        <div className="flex items-center">
          <div className="relative mr-4 dropdown dropdown-end">
            <button tabIndex={0} className="text-gray-600 focus:outline-none h-4 hover:scale-105">
              🔔
            </button>
            <ul tabIndex={0} className="menu dropdown-content bg-base-100 mt-2 rounded-box z-[1] w-52 p-1 shadow mr-[-2rem]">
              <li>No new notifications</li>
            </ul>
            
          </div>
          <Link href="/user">
            <div className="w-8 h-6 rounded-full cursor-pointer">
              🫠
            </div>
          </Link>
        </div>
      </nav>
    );
  };

export default NavBar