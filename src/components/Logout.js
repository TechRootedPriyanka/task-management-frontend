// Logout.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Snackbar, Button } from '@mui/material';

const Logout = ({ onLogout }) => {
  const navigate = useNavigate();
  const [openSuccess, setOpenSuccess] = useState(false);

  const handleLogout = () => {
    if (typeof onLogout === 'function') {
      onLogout();
      setOpenSuccess(true); // Show success message
      navigate('/');
    }
  };

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccess(false);
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>

      {/* Success Snackbar */}
      <Snackbar
        open={openSuccess}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Logout successful"
        action={
          <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
              Close
            </Button>
          </React.Fragment>
        }
      />
    </div>
  );
};

export default Logout;
