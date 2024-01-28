import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { Button, TextField, Typography, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from './Header';

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openFailure, setOpenFailure] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send login data to your backend API
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // User logged in successfully
        setOpenSuccess(true);
        // Assuming your backend returns token and userId upon successful login
        const { token, userId } = await response.json();
        // Set token and userId in the context
        login(token, userId);
        console.log(token + "fffffffffffffffffffff");
        console.log(userId + "hhhhhhhhhhhhhhhhhhh");

        // Redirect to profile page
        navigate("/profile");
      } else {
        console.error("Login failed:", response.statusText);
        // Handle login error (e.g., display error message to user)
        setOpenFailure(true);
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      // Handle login error (e.g., display error message to user)
      setOpenFailure(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccess(false);
    setOpenFailure(false);
  };

  return (
    <>
    <Header />
      <div style={{ display: "flex" }}>
        <div />
        <div style={{ width: "50%", display: "block", margin: "150px" }}>
          <Typography variant="h3">Log In</Typography>
          <br />
          <br />
          <form onSubmit={handleLogin}>
            <TextField
              name="email"
              type="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <br />
            <br />
            <TextField
              name="password"
              type="password"
              label="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <br />
            <br />
            <Button type="submit" variant="contained" color="primary">
              Log In
            </Button>
          </form>
        </div>
      </div>

      {/* Success Snackbar */}
      <Snackbar
        open={openSuccess}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Login Successful"
        color="success"
      />

      {/* Failure Snackbar */}
      <Snackbar
        open={openFailure}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Login Failed"
        color="error"
      />
    </>
  );
};

export default LoginPage;
