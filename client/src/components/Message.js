import React from "react";

function Message(props) {
  let svg = "";
  let p = "";
  if (props.msg.sender == props.user.id) {
    svg = "w-8 h-8 text-slate-950 text-slate-100";
    p = "p-2 text-slate-100 bg-slate-950 w-fit  rounded-lg";
  } else {
    svg = "w-8 h-8 text-cyan-600 text-slate-100";
    p = "p-2 text-slate-100 bg-cyan-600 w-fit  rounded-lg";
  }
  return (
    <div className="flex items-center gap-2 m-2">
      <svg
        className={svg}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
      </svg>
      <div className="flex flex-col">
        {/* <p className='p-0 m-0 '>{props.msg.sender == props.user.id?props.user.username:"You"}</p> */}
        <p className={p}>{props.msg.message}</p>
      </div>
    </div>
  );
}

export default Message;
