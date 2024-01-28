import React, { useState } from 'react';
import Header from './Header';
import { Typography, List, ListItem, ListItemText, Button, TextField } from '@mui/material';

const UsersPage = () => {
  // Define state to hold the list of users
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ email: '', password: '', role: '' });

  // Function to fetch the list of users from your backend API
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3000/users');
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        console.error('Failed to fetch users:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error.message);
    }
  };

  // Function to handle deleting a user
  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/users/${userId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // If deletion is successful, fetch users again to update the list
        fetchUsers();
      } else {
        console.error('Failed to delete user:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to delete user:', error.message);
    }
  };

  // Function to handle updating user details
  const updateUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedUser)
      });
      if (response.ok) {
        // If update is successful, fetch users again to update the list
        fetchUsers();
      } else {
        console.error('Failed to update user:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to update user:', error.message);
    }
  };

  return (
    <>
      <Header />
      <div>
        <Typography variant="h3">Users</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setShowUsers(true);
            fetchUsers();
          }}
        >
          Show All Users
        </Button>
        {showUsers && (
          <List>
            {users.map((user) => (
              <ListItem key={user._id}>
                <ListItemText primary={user.email} />
                <ListItemText primary={user.password} />
                <ListItemText primary={user.role} />
                <ListItemText primary={user._id} />
                {/* Delete user button */}
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => deleteUser(user._id)}
                >
                  Delete
                </Button>
                {/* Update user form */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    updateUser(user._id);
                  }}
                >
                  <TextField
                    label="Email"
                    value={updatedUser.email}
                    onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })}
                  />
                  <TextField
                    label="Password"
                    value={updatedUser.password}
                    onChange={(e) => setUpdatedUser({ ...updatedUser, password: e.target.value })}
                  />
                  <TextField
                    label="Role"
                    value={updatedUser.role}
                    onChange={(e) => setUpdatedUser({ ...updatedUser, role: e.target.value })}
                  />
                  <Button type="submit" variant="contained" color="primary">
                    Update
                  </Button>
                </form>
              </ListItem>
            ))}
          </List>
        )}
      </div>
    </>
  );
};

export default UsersPage;
