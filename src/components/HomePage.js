// HomePage.js
import "./Styles.css";
import React from "react";
import background from "../../src/img/homebanner.jpg";
import Header from "./Header";

const HomePage = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
      }}
    >
     <Header />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "625px",
          color: "#ffffff",
          backgroundColor: "rgba(0,0,0, 0.5)"
        }}
      >
        <h1>Let your task be managed like magic</h1>
      </div>
    </div>
  );
};

export default HomePage;
