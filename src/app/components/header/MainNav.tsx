import React from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import "../../../css/header.css";

const MainNav = () => {
  return (
    <div className="home-nav">
      <Container className="nav-container">
        <Stack className="navbar">
          <Box className="main-logo">
            <NavLink to="/">
              <Typography>
                <a href="/" className="logo">
                  BB
                </a>
              </Typography>
            </NavLink>
          </Box>
          <Stack className="nav-items">
            <Box>
              <NavLink to="/" className={"nav-item"}>
                HOME
              </NavLink>
            </Box>
            <Box>
              <NavLink to="/" className={"nav-item"}>
                BOOKS
              </NavLink>
            </Box>
            <Box>
              <NavLink to="/" className={"nav-item"}>
                ORDERS
              </NavLink>
            </Box>
            <Box>
              <NavLink to="/" className={"nav-item"}>
                HELP
              </NavLink>
            </Box>
          </Stack>
          <Box className="nav-login">
            <Button size="large" className="login-button">
              Login
            </Button>
          </Box>
        </Stack>
      </Container>
    </div>
  );
};

export default MainNav;
