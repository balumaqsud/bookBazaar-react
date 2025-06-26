import { Box, Button, Container, Stack, Typography } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
const SecondNav = () => {
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
            <Box className="login-side">
              <ShoppingCartIcon />
            </Box>
            <Box className="user-side">
              <AccountBoxIcon />
              <Typography color="white">Oliver</Typography>
            </Box>
          </Box>
        </Stack>
      </Container>
    </div>
  );
};

export default SecondNav;
