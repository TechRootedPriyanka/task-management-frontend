// LoginPage.js

import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import firebaseApp from "./firebase";
import background from "../../src/img/login.jpg";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await firebaseApp
        .auth()
        .signInWithEmailAndPassword(formData.email, formData.password);
      // User logged in successfully
      navigate("/dashboard"); // Redirect to the dashboard or any other page
    } catch (error) {
      console.error("Login failed:", error.message);
      // Handle login error (e.g., display error message to user)
    }
  };

  return (
    <>
      <Header />
      <div style={{ display: "flex" }}>
        <div style={{ width: "50%", display: "block", margin: "150px" }}>
          <Typography variant="h3">Login</Typography>
          <br /> <br />
          <form onSubmit={handleLogin}>
            <TextField
              name="email"
              type="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <br /> <br />
            <TextField
              name="password"
              type="password"
              label="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <br /> <br />
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </form>
        </div>
        <div
          style={{
            backgroundImage: `url(${background})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            width: "50%",
            height: "88vh",
          }}
        />
      </div>
    </>
  );
};

export default LoginPage;
