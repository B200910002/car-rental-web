import React, { useState, useContext } from "react";
import Header from "./Header";
import axios from "axios";
import { useRouter } from "next/router";
import { AuthContext } from '../src/app/AuthContext'; 

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State variable for error message
  const { login } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    axios({
      url: "http://159.89.203.190:1000/api/user/login",
      method: "POST",
      headers: {},
      data: {
        email: email,
        password: password,
      },
    })
      .then((res) => {
        console.log("Connected to pollweb 2023");
        login(res.data.data.token);
        router.push("/");
        console.log(res);
      })
      .catch((err) => {
        setErrorMessage("Login failed. Please check email or password");
        console.log(err);
      });

    console.log("Login submitted:", { email, password });
    setEmail("");
    setPassword("");
  };

  return (
    <div className="card">
      <Header />
      <h1>Нэвтрэх</h1>
      <form onSubmit={handleLogin}>
        <label>
          И-мэйл:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Нууц үг:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button onClick={handleLogin} type="submit">
          Login
        </button>
        {errorMessage && <p>{errorMessage}</p>} {/* Render error message */}
      </form>
    </div>
  );
};

export default Login;
