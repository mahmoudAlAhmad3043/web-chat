import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [stateUserName, setStateUserName] = useState("");
  const [statePassword, setStatePassword] = useState("");
  let flags = {
    username: false,
    password: false,
  };
  // const [stateLogin,setStateLogin] = useState('');
  const validatePassword = (password) => {
    flags.password = false;
    if (password.trim() === "") {
      setStatePassword("please enter a password.");
    } else {
      if (password.length >= 6) {
        flags.password = true;
      } else {
        setStatePassword("password must be more than six characters.");
      }
    }
  };
  const validateUserName = (username) => {
    flags.username = false;
    if (username.trim() === "") {
      setStateUserName("please enter a userName.");
    } else {
      if (username.length > 1) {
        flags.username = true;
      } else {
        setStateUserName("please enter a valid username.");
      }
    }
  };
  const login = (e) => {
    e.preventDefault();
    validatePassword(password);
    validateUserName(username);
    if (flags.password && flags.username) {
      axios
        .post("http://localhost:5000/login", {
          username: username,
          password: password,
        })
        .then((response) => {
          if (response.data.result === "successfully") {
            sessionStorage.setItem("userName", username);
            sessionStorage.setItem("email", response.data.email);
            sessionStorage.setItem("id", response.data.id);
            window.open("/home", "_self")?.focus();
          } else if (response.data.message === "password incorrect") {
            setStatePassword("your password incorrect.");
          } else {
            setStatePassword("your password incorrect.");
            setStateUserName("your userName incorrect.");
          }
        });
    }
  };
  return (
    <div className="mt-10 m-2">
      <form className="flex flex-col max-w-md m-auto text-start p-2 bg-slate-900 gap-1 text-slate-100 rounded-md">
        <p className="text-center">Login Form</p>
        <label>username:</label>
        <input
          type="text "
          name="username"
          value={username}
          onChange={(e) => {
            setStateUserName("");
            setUsername(e.target.value);
          }}
          className="px-1 rounded-md outline-none focus:border-cyan-400 border-2 text-slate-900"
        />
        <p className="text-cyan-400  text-sm h-4">{stateUserName}</p>
        <label className="mt-1">password:</label>
        <input
          type="password"
          name="username"
          value={password}
          onChange={(e) => {
            setStatePassword("");
            setPassword(e.target.value);
          }}
          className="px-1 rounded-md outline-none focus:border-cyan-400 border-2 text-slate-900"
        />
        <p className="text-cyan-400  text-sm h-4">{statePassword}</p>
        <button
          name="submit"
          type="submit"
          onClick={login}
          className="transition-all duration-700 hover:text-slate-900 hover:bg-slate-100 rounded-md mt-2 p-1 border-cyan-400 border hover:border-slate-100"
        >
          Login
        </button>
        <div className="mt-4 text-center text-sm">
          <span className="pr-1">You don't have an account?</span>
          <Link to={"/signUp"} target="_self" className="text-cyan-400">
            signUp
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
