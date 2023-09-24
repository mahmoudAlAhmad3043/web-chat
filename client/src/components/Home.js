import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Nav from "./Nav";
import Users from "./Users";


const socket = io.connect("http://localhost:5000", {
  query: { userId: sessionStorage.getItem("id") },
});

function Home() {
  const [info, setInfo] = useState({
    id: "",
    username: "",
    email: "",
    online: false,
  });
  const [usersOnline, setUsersOnline] = useState([{}]);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    setInfo({
      ...info,
      id: sessionStorage.getItem("id"),
      username: sessionStorage.getItem("userName"),
      email: sessionStorage.getItem("email"),
      online: true,
    });
    if (info.online) {
      socket.on("users", (data) => {
        setUsersOnline(data.users);
        socket.emit("join", "room");
      });
    }
    socket.on("recieve_message", (data) => {
      setMessages([
        ...messages,
        { message: data.message, sender: data.sender, reciever: data.reciever },
      ]);
    });
  }, [info.online, socket, messages]);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(
          data.users.filter((ele) => {
            return ele.id != sessionStorage.getItem("id");
          })
        );
      });
  }, []);
  return (
    <div className="flex flex-col h-full">
      <Nav username={info.username} email={info.email} />
      <Users
        users={users}
        usersOnline={usersOnline}
        messages={messages}
        socket={socket}
      />
    </div>
  );
}

export default Home;
