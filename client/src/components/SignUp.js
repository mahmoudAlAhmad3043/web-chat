import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function SignUp() {
  const regExEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [stateUserName, setStateUserName] = useState("");
  const [statePassword, setStatePassword] = useState("");
  const [stateEmail, setStateEmail] = useState("");
  let flags = {
    username: false,
    password: false,
    email: false,
  };
  const validateEmail = (email) => {
    flags.email = false;
    if (email.trim() === "") {
      setStateEmail("please enter an email.");
    } else {
      if (regExEmail.test(email)) {
        flags.email = true;
      } else {
        setStateEmail("please enter a valid email.");
      }
    }
  };
  const validatePassword = (password) => {
    flags.password = false;
    if (password.trim() === "") {
      setStatePassword("please enter a password.");
    } else {
      if (password.length >= 6) {
        flags.password = true;
      } else {
        setStatePassword("password must be more than six characters");
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
  const signUp = (e) => {
    e.preventDefault();
    validateEmail(email);
    validatePassword(password);
    validateUserName(username);
    if (flags.email && flags.password && flags.username) {
      axios
        .post("http://localhost:5000/signUp", {
          username: username.trim(),
          password: password.trim(),
          email: email.trim(),
        })
        .then((response) => {
          if (response.data.result === "successfully") {
            window.open("/", "_self")?.focus();
          } else if (response.data.result === "username already exists") {
            setStateUserName("username already exists");
          } else if (response.data.result === "email already exists") {
            setStateEmail("email already exists");
          } else {
            alert("create account failed");
          }
        });
    }
  };
  return (
    <div className="mt-10 m-2">
      <form className="flex flex-col max-w-md m-auto text-start p-2 bg-slate-900 gap-1 text-slate-100 rounded-md">
        <p className="text-center">SignUp Form</p>
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
        <label>password:</label>
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
        <label>email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => {
            setStateEmail("");
            setEmail(e.target.value);
          }}
          className="px-1 rounded-md outline-none focus:border-cyan-400 border-2 text-slate-900"
        />
        <p className="text-cyan-400  text-sm h-4">{stateEmail}</p>
        <button
          name="submit"
          type="submit"
          onClick={signUp}
          className="transition-all duration-700 hover:text-slate-900 hover:bg-slate-100 rounded-md mt-2 p-1 border-cyan-400 border hover:border-slate-100"
        >
          SignUp
        </button>
        <div className="mt-4 text-center text-sm">
          <span className="pr-1">You have an account?</span>
          <Link to={"/"} target="_self" className="text-cyan-400">
            login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
