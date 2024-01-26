// SignupPage.js

import React, { useState } from 'react';
import Header from "./Header";
import { Button, TextField, Typography } from '@mui/material';

import { useNavigate } from 'react-router-dom'; // Import useNavigate
import firebaseApp from "./firebase";
import background from "../../src/img/Signup.jpg";
const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      // Create user in Firebase authentication
      const userCredential = await firebaseApp.auth().createUserWithEmailAndPassword(formData.email, formData.password, formData.role);
      const user = userCredential.user;

      // Now, you can send additional user data to your backend
      const userData = {
        email: user.email,
        password: user.password, 
        role: user.role,
      };

      // Example: Send user data to your backend API
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        // User signed up successfully in both Firebase and your backend
        navigate('/login'); // Redirect to login page
      } else {
        console.error('Signup failed:', response.statusText);
        // Handle signup error (e.g., display error message to user)
      }
    } catch (error) {
      console.error('Signup failed:', error.message);
      // Handle signup error (e.g., display error message to user)
    }
  };

  return (
    <>
    <Header />
    <div style={{ display: "flex"}}>
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "50%",
        height: "88vh",
      }} />
      <div style={{ width: "50%" , display: "block" , margin:"150px"}}>
      <Typography variant="h3">Sign Up</Typography>
      <br/>  
      <br/>
      <form onSubmit={handleSignup}>
        <TextField
          name="email"
          type="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br/>
        <br/>
        <TextField
          name="password"
          type="password"
          label="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
          <br/>
          <br/>
          <TextField
          name="role"
          type="role"
          label="role"
          value={formData.role}
          onChange={handleChange}
          required
        />
          <br/>
          <br/>
        <Button type="submit" variant="contained" color="primary">
          Sign Up
        </Button>
      </form>
      </div>
    </div>
    </>
  );
};

export default SignupPage;
