// Header.js
import "./Styles.css";
import React from "react";
import logo from "../../src/img/logoB.png";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Link from "@mui/material/Link";

const Header = () => {
  return (
    <AppBar
      position="static"
      color="secondary"
      elevation={0}
      sx={{ borderBottom: (theme) => `15px solid ${theme.palette.divider}` }}
    >
      <Toolbar sx={{ flexWrap: "wrap", justifyContent: "space-between" }}>
        <img src={logo} width="70" height="70" />
        <nav>
          <Link
            variant="button"
            color="text.primary"
            href="/login"
            sx={{ my: 1, mx: 1.5 }}
          >
            Log in
          </Link>
          <Link
            variant="button"
            color="text.primary"
            href="/logout"
            sx={{ my: 1, mx: 1.5 }}
          >
            Log out
          </Link>
          <Link
            variant="button"
            color="text.primary"
            href="/signup"
            sx={{ my: 1, mx: 1.5 }}
          >
            Sign up
          </Link>
          <Link
            variant="button"
            color="text.primary"
            href="/boards"
            sx={{ my: 1, mx: 1.5 }}
          >
            Boards
          </Link>
          <Link
            variant="button"
            color="text.primary"
            href="/"
            sx={{ my: 1, mx: 1.5 }}
          >
            Board
          </Link>
          <Link
            variant="button"
            color="text.primary"
            href="/alltasks"
            sx={{ my: 1, mx: 1.5 }}
          >
            Task
          </Link>
          <Link
            variant="button"
            color="text.primary"
            href="/Users"
            sx={{ my: 1, mx: 1.5 }}
          >
            allusers
          </Link>
        </nav>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
