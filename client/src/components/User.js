import React, { useEffect, useState } from "react";

function User(props) {
  const [online, setOnline] = useState(false);
  const [numMessages, setNumMessages] = useState(0);
  useEffect(() => {
    setOnline(false);
    props.onlineList.forEach((element) => {
      if (element.userId == props.user.id) {
        setOnline(true);
      }
    });
    setNumMessages(props.messages.length);
    props.num.forEach((element) => {
      if (element.id == props.user.id) {
        setNumMessages(props.messages.length - (element.num ? element.num : 0));
      }
    });
    // setNumMessages(props.messages.length);
  }, [props.onlineList, props.user, online, props.messages, numMessages]);
  return (
    <button
      className="flex p-4 hover:bg-slate-800 "
      onClick={() => {
        props.handle(props.user, props.messages.length);
      }}
    >
      <p
        className={
          online
            ? "transition-all duration-700 bg-blue-700 rounded-full  w-2 h-2"
            : "transition-all duration-700 bg-slate-100 rounded-full w-2 h-2"
        }
      ></p>
      <svg
        className="w-6 h-6 text-slate-950 dark:text-slate-100"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
      </svg>
      <p className="text-start pl-2">{props.user.username}</p>
      <div className="ml-auto text-blue-500">
        {numMessages ? numMessages : ""}
      </div>
    </button>
  );
}

export default User;

// online?'bg-green-500 rounded-full  w-2 h-2':'bg-slate-400 rounded-full w-2 h-2'
