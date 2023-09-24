import React, { createRef, useEffect, useState } from "react";
import Message from "./Message";

function Messages(props) {
  const refMsg = createRef();
  const [online, setOnline] = useState(false);
  const [msg, setMsg] = useState("");
  const inputRef = createRef();
  useEffect(() => {
    setOnline(false);
    props.onlineList.forEach((element) => {
      if (element.userId == props.user.id) {
        setOnline(true);
      }
    });
    if (!props.show) {
      refMsg.current.classList.remove("vsm:hidden");
      refMsg.current.classList.add("vsm:w-full");
    }
  }, [props.onlineList, props.user, props.socket, props.show]);
  const sendMessage = () => {
    if (inputRef.current.value != "") {
      props.socket.emit("send_message", {
        message: msg,
        reciever: props.user.id,
        sender: sessionStorage.getItem("id"),
      });
      inputRef.current.value = "";
    }
  };
  const showUsers = () => {
    props.setShow(true);
    refMsg.current.classList.add("vsm:hidden");
    refMsg.current.classList.remove("vsm:w-full");
  };
  return (
    <div className="bg-slate-300 w-2/3 " ref={refMsg}>
      <div className="w-full bg-slate-900 flex items-center gap-2 p-2">
        <svg
          className="w-8 h-8 text-slate-950 dark:text-slate-100"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
        </svg>
        <div className="">
          <p className="text-slate-100">{props.user.username}</p>
          <p
            className={
              online ? "text-blue-500 text-sm" : "text-slate-400 text-sm"
            }
          >
            {online ? "online" : "offline"}
          </p>
        </div>
        <button
          className="text-slate-100 ml-auto hover:text-slate-300 hidden vsm:block"
          onClick={() => showUsers()}
        >
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 8 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
            />
          </svg>
        </button>
      </div>
      <div className="messages w-full flex flex-col bg-slate-700 text-slate-100 relative">
        {/* here messages section and send , recieve messages */}
        <div className="overflow-auto w-full  flex justify-end flex-col submessages bg-slate-500 text-slate-900">
          {props.messages.map((msg) => (
            <Message user={props.user} msg={msg} />
          ))}
        </div>
        <div className="w-full bg-slate-100 text-slate-100  bg-slate-700  flex send  bottom-0">
          <input
            className="w-3/4 p-2 outline-none bg-slate-900"
            placeholder="write message"
            onChange={(e) => setMsg(e.target.value)}
            ref={inputRef}
            onKeyDown={(e) => (e.key === "Enter" ? sendMessage() : null)}
          ></input>
          <button
            className="w-1/4 hover:bg-slate-600"
            onClick={() => sendMessage()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Messages;
