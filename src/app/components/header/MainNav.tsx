import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";

const MainNav = () => {
  return (
    <div className="home-nav">
      <Container className="nav-container">
        <Stack className="navbar">
          <Box>
            <NavLink to="/">
              <img
                src="/LOGO.png"
                style={{ width: "120px", height: "60px" }}
                alt="Book Bazaar"
              />
            </NavLink>
          </Box>
        </Stack>
      </Container>
    </div>
  );
};

export default MainNav;
