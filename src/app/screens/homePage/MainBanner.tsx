import { Box, Container, Stack, Paper } from "@mui/material";
import { Button } from "@mui/joy";
import React from "react";
import Typography from "@mui/joy/Typography";
import { useHistory } from "react-router-dom";
import { retrieveRandomBook } from "./selector";
import { useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";

const randomBookRetriever = createSelector(
  retrieveRandomBook,
  (randomBooks) => ({
    randomBooks,
  })
);

const MainBanner = () => {
  const { randomBooks } = useSelector(randomBookRetriever);

  const history = useHistory();

  const chosenHandler = () => {
    history.push(`/books`);
  };

  const randomHandler = () => {
    if (!randomBooks || randomBooks.length === 0) return;

    const randomIndex = Math.floor(Math.random() * randomBooks.length);
    const id = randomBooks[randomIndex]._id;
    history.push(`/books/${id}`);
  };

  return (
    <div className="banner-frame">
      <Container className="banner-container">
        <Stack className="left-side">
          <Box className="left-side-box" sx={{ lineHeight: 4 }}>
            <Typography
              level="h2"
              color="success"
              sx={{ maxWidth: 480, lineHeight: 2 }}
            >
              Best Seller Books
            </Typography>
            <Typography
              level="h1"
              color="warning"
              noWrap
              fontSize={78}
              sx={{ maxWidth: 600, lineHeight: 2 }}
            >
              Read and Grow
            </Typography>
            <Typography sx={{ maxWidth: 480, lineHeight: 1.5 }} level="h3">
              "That's the thing about{" "}
              <Typography variant="soft">books.</Typography> They let you travel{" "}
              without moving your{" "}
              <Typography variant="solid" color="warning" noWrap>
                feet."
              </Typography>
              .
            </Typography>
          </Box>
          <Box className="main-buttons">
            <Button
              size="lg"
              variant="soft"
              color="warning"
              onClick={randomHandler}
            >
              Random Book
            </Button>
            <Button
              size="lg"
              variant={"outlined"}
              color="success"
              onClick={chosenHandler}
            >
              Visit Library
            </Button>
          </Box>
        </Stack>
        <Stack className="book-images">
          <Paper>
            {" "}
            <img src="/images/book2.jpg" alt="book1" />
          </Paper>
          <Paper elevation={3}>
            {" "}
            <img className="book3" src="/images/book5.jpg" alt="book1" />
          </Paper>
        </Stack>
      </Container>
    </div>
  );
};

export default MainBanner;
