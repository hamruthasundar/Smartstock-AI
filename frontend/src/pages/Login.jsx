import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [role, setRole] =
    useState("User");

  const handleLogin = (e) => {

    e.preventDefault();

    if (
      role === "Admin" &&
      username === "admin" &&
      password === "admin123"
    ) {

      localStorage.setItem(
        "role",
        "Admin"
      );

      navigate("/");

      return;
    }

    if (
      role === "Manager" &&
      username === "manager" &&
      password === "manager123"
    ) {

      localStorage.setItem(
        "role",
        "Manager"
      );

      navigate("/");

      return;
    }

    if (
      role === "User" &&
      username === "user" &&
      password === "user123"
    ) {

      localStorage.setItem(
        "role",
        "User"
      );

      navigate("/");

      return;
    }

    alert("Invalid Credentials");

  };

  return (

    <div
      className="card"
      style={{
        maxWidth:"500px",
        margin:"60px auto"
      }}
    >

      <h1>
        SmartStock AI Login
      </h1>

      <br/>

      <form onSubmit={handleLogin}>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e)=>
            setUsername(
              e.target.value
            )
          }
        />

        <br/><br/>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>
            setPassword(
              e.target.value
            )
          }
        />

        <br/><br/>

        <select
          value={role}
          onChange={(e)=>
            setRole(
              e.target.value
            )
          }
        >

          <option>
            Admin
          </option>

          <option>
            Manager
          </option>

          <option>
            User
          </option>

        </select>

        <br/><br/>

        <button type="submit">
          Login
        </button>

      </form>

    </div>

  );
};

export default Login;