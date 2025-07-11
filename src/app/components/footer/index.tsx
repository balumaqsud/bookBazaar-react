import React, { useMemo } from "react";
import { Box, Container, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "../../../css/footer.css";
import Typography from "@mui/joy/Typography";
import { useHistory } from "react-router-dom";
import { retrieveRandomBook } from "../../screens/homePage/selector";
import { useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { Button } from "@mui/joy";

const Footers = styled.div`
  width: 100%;
  height: 480px;
  display: flex;
  background-color: rgb(249, 248, 248);
  background-size: cover;
`;

const randomBookRetriever = createSelector(
  retrieveRandomBook,
  (randomBooks) => ({
    randomBooks,
  })
);

export default function Footer() {
  const { randomBooks } = useSelector(randomBookRetriever);

  const randomBook = useMemo(() => {
    if (!randomBooks || randomBooks.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * randomBooks.length);
    return randomBooks[randomIndex];
  }, [randomBooks]);

  const featuredBook = randomBooks?.[0];
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
            <Typography level="title-md">
              {" "}
              Book Bazar is your online store, where you can find any book you
              wish!
            </Typography>
            <Box className="sns-context" sx={{ gap: 2 }}>
              <img
                alt="facebook_icon"
                src={"/images/facebook.png"}
                height={35}
              />
              <img
                alt="pinterest_icon"
                src={"/images/pinterest.png"}
                height={35}
              />
              <img alt="reddit_icon" src={"/images/reddit.png"} height={35} />
              <img
                alt="instagram_icon"
                src={"/images/instagram.png"}
                height={35}
              />
              <img alt="youtube_icon" src={"/images/youtube.png"} height={35} />
            </Box>
          </Stack>
          <Stack className="links" flexDirection={"row"}>
            <Box className="categories">
              <Typography level="title-lg">Help</Typography>
              <Box className={"foot-category-link"}>
                <Link to="/member-page">Prolife</Link>
                <Link to="/help#terms">Terms</Link>
                <Link to="/help#faq">FAQ</Link>
                <Link to="/help#contact">Contact</Link>
              </Box>
            </Box>

            <Box className="categories">
              <Typography level="title-lg">Book Bazaar</Typography>
              <Box className={"foot-category-link"}>
                <Link to="/">Home</Link>
                <Link to="/orders">Orders</Link>
                {featuredBook && (
                  <Link to={`/books/${featuredBook._id}`}>Featured Book</Link>
                )}
                {randomBook && (
                  <Link to={`/books/${randomBook._id}`}>Random Book</Link>
                )}
              </Box>
            </Box>

            <Box className="categories">
              <Typography level="title-lg">About Us</Typography>
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
