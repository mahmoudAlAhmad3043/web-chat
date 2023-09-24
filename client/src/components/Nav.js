import React from "react";

function Nav(props) {
  return (
    <header className="flex flex-row   text-start  justify-between items-center px-10 py-4 bg-slate-950 text-slate-100 border-b-blue-500 border-b-2 w-full ">
      <div className="text-2xl">Chat</div>
      <div className="flex flex-row  items-center gap-2">
        <svg
          className="w-8 h-8 text-slate-950 dark:text-slate-100"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
        </svg>
        <div>
          {props.username}
          <p className="text-xs text-gray-300 ">{props.email}</p>
        </div>
      </div>
    </header>
  );
}

export default Nav;
