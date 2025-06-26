import React from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "../../../css/footer.css";

const Footers = styled.div`
  width: 100%;
  height: 480px;
  display: flex;
  background-color: rgb(249, 248, 248);
  background-size: cover;
`;

export default function Footer() {
  const authMember = null;

  return (
    <Footers>
      <Container>
        <Stack flexDirection={"row"} sx={{ mt: "94px" }}>
          <Stack
            flexDirection={"column"}
            style={{ width: "50%", marginRight: 80, lineHeight: 1.5 }}
          >
            <Box>
              <img alt="footer_icon" width={"80px"} src={"/images/bb.png"} />
            </Box>
            <Typography variant="h6">
              {" "}
              Book Bazar is your online store, where you can find any book you
              wish!
            </Typography>
            <Box className="sns-context">
              <img alt="facebook_icon" src={"/images/face.svg"} height={40} />
              <img alt="pinterest_icon" src={"/images/pin.svg"} height={40} />
              <img alt="reddit_icon" src={"/images/reddit.svg"} height={40} />
              <img alt="instagram_icon" src={"/images/i.svg"} height={40} />
              <img alt="youtube_icon" src={"/images/youtube.svg"} height={40} />
            </Box>
          </Stack>
          <Stack className="links" flexDirection={"row"}>
            <Box className="categories">
              <Box className={"foot-category-title"}>Help</Box>
              <Box className={"foot-category-link"}>
                <Link to="/user-page">My Page</Link>
                <Link to="/order">My Orders</Link>
                {authMember && <Link to="/help">Terms/FAQ</Link>}
                <Link to="/contact">Contact</Link>
              </Box>
            </Box>

            <Box className="categories">
              <Box className={"foot-category-title"}>Book Bazaar</Box>
              <Box className={"foot-category-link"}>
                <Link to="/user-page">Home</Link>
                <Link to="/order">Book Library</Link>
                <Link to="/help">Random Book</Link>
                <Link to="/contact">Latest Books</Link>
              </Box>
            </Box>

            <Box className="categories">
              <Box className={"foot-category-title"}>About us</Box>
              <Box flexDirection={"column"} className={"foot-about"}>
                <p>Worldwide Shipment</p>
                <p>+821029226111</p>
                <p>bookbazaar@gmail.com</p>
                <p>24/7 Service hours</p>
              </Box>
            </Box>
          </Stack>
        </Stack>
        <Stack
          style={{ border: "1px solid #C5C8C9", width: "100%", opacity: "0.2" }}
          sx={{ mt: "80px" }}
        ></Stack>
        <Stack className={"copyright-txt"}>
          © Copyright Book Bazaar, All rights reserved.
        </Stack>
      </Container>
    </Footers>
  );
}
