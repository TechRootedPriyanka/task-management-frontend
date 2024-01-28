import React, { useState, useEffect } from "react";
import Header from "./Header";

const Profile = () => {
  const token = localStorage.getItem("token");
  const [userDetails, setUserDetails] = useState(null);
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch("http://localhost:3000/users/profile", {
          method: "GET",
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserDetails(data);
        } else {
          // Handle error response
          console.error("Failed to fetch user details:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    if (token) {
      fetchUserDetails();
    }
  },[token]); 

  return (
    <>
      <Header />
      <div>
        <h2>User Profile</h2>
        {userDetails ? (
          <>
          
          <div>
            <p>
              <strong>Email:</strong> {userDetails.email}
            </p>
            <p>
              <strong>Role:</strong> {userDetails.role}
            </p>
          </div>

          </>
        ) : (
          <p>Loading user details...</p>
        )}
      </div>
    </>
  );
};

export default Profile;
