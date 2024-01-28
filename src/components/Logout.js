import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3000/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      if (response.ok) {
        // If logout is successful, clear local storage or perform any necessary cleanup actions
        localStorage.removeItem('token');
        // Redirect the user to the login page or any other page
        
        navigate('/')
      } else {
        // Handle error response
        console.error('Logout failed:', response.statusText);
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div>
      <Button onClick={handleLogout} variant="contained" color="primary">
        Logout
      </Button>
    </div>
  );
};

export default Logout;
