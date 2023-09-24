import React, { createRef, useEffect, useState } from "react";
import User from "./User";
import Messages from "./Messages";

function Users(props) {
  const usersRef = createRef();
  const [showUsers, setShowUsers] = useState(true);
  const [currentUser, setCurrentUser] = useState();
  const [num, setNum] = useState([]);

  const handle = (user, len) => {
    setCurrentUser(user);
    setNum([...num, { id: user.id, num: len }]);
    if (showUsers) {
      setShowUsers(false);
      usersRef.current.classList.remove("vsm:w-full");
      usersRef.current.classList.add("vsm:hidden");
    }
  };
  useEffect(() => {
    if (showUsers) {
      usersRef.current.classList.add("vsm:w-full");
      usersRef.current.classList.remove("vsm:hidden");
    }
  }, [showUsers]);
  return (
    <div className="users w-full flex flex-row">
      <div
        className="vsm:w-full  flex flex-col  bg-slate-950  text-slate-300 w-1/3  overflow-auto"
        ref={usersRef}
        id="users"
      >
        {props.users.map((user) => (
          <User
            num={num}
            user={user}
            onlineList={props.usersOnline}
            handle={handle}
            key={user.id}
            messages={props.messages.filter((msg) => {
              return (
                msg.sender == user.id &&
                msg.reciever == sessionStorage.getItem("id")
              );
            })}
          />
        ))}
      </div>
      {/* Messages section */}
      {currentUser != null ? (
        <Messages
          show={showUsers}
          setShow={setShowUsers}
          user={currentUser}
          onlineList={props.usersOnline}
          messages={props.messages.filter((msg) => {
            return (
              (msg.sender == currentUser.id &&
                msg.reciever == sessionStorage.getItem("id")) ||
              (msg.sender == sessionStorage.getItem("id") &&
                msg.reciever == currentUser.id)
            );
          })}
          socket={props.socket}
        />
      ) : (
        <div className="bg-slate-900 w-2/3 vsm:hidden flex justify-center text-slate-100 items-center">
          Select a chat to start messaging
        </div>
      )}
    </div>
  );
}

export default Users;
