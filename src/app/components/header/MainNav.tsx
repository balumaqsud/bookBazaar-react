import React from "react";
import {
  Box,
  Button,
  Container,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import "../../../css/header.css";
import Basket from "./Basket";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../libs/config";
import { CardItem } from "../../../libs/types/search";
import { Logout } from "@mui/icons-material";

interface HomeNavbarProps {
  cardItems: CardItem[];
  onAdd: (item: CardItem) => void;
  onDelete: (item: CardItem) => void;
  onRemove: (item: CardItem) => void;
  onDeleteAll: () => void;
  setSignupOpen: (open: boolean) => void;
  setLoginOpen: (open: boolean) => void;
  anchorEl: HTMLElement | null;
  handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void;
  handleCloseLogout: () => void;
  handleLogoutRequest: () => void;
}

const MainNav = (props: HomeNavbarProps) => {
  const {
    cardItems,
    onAdd,
    onDelete,
    onDeleteAll,
    onRemove,
    setLoginOpen,
    setSignupOpen,
    handleLogoutRequest,
    anchorEl,
    handleLogoutClick,
    handleCloseLogout,
  } = props;
  const { authMember } = useGlobals();
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
              <NavLink to="/books" className={"nav-item"}>
                BOOKS
              </NavLink>
            </Box>

            <Box>
              <NavLink to="/help" className={"nav-item"}>
                HELP
              </NavLink>
            </Box>
          </Stack>
          {authMember ? (
            <Box className="hover-line">
              <NavLink to="/orders" activeClassName="underline">
                Orders
              </NavLink>
            </Box>
          ) : null}
          {authMember ? (
            <Box className="hover-line">
              <NavLink to="/member-page" activeClassName="underline">
                My Page
              </NavLink>
            </Box>
          ) : null}
          <Basket
            cardItems={cardItems}
            onAdd={onAdd}
            onDelete={onDelete}
            onRemove={onRemove}
            onDeleteAll={onDeleteAll}
          />
          {!authMember ? (
            <Box>
              <Button
                variant="contained"
                className="login-button"
                onClick={() => setLoginOpen(true)}
              >
                Login
              </Button>
            </Box>
          ) : (
            <img
              className="user-avatar"
              src={
                authMember?.memberImage
                  ? `${serverApi}/${authMember?.memberImage}`
                  : "/icons/default-user.svg"
              }
              aria-haspopup={"true"}
              alt=""
              onClick={handleLogoutClick}
            />
          )}
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={Boolean(anchorEl)}
            onClose={handleCloseLogout}
            onClick={handleCloseLogout}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleLogoutRequest}>
              <ListItemIcon>
                <Logout fontSize="small" style={{ color: "blue" }} />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Stack>
      </Container>
    </div>
  );
};

export default MainNav;
