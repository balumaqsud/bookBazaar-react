import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  Paper,
} from "@mui/material";
import React from "react";

const MainBanner = () => {
  return (
    <div className="banner-frame">
      <Container className="banner-container">
        <Stack className="left-side">
          <Box>
            <p>Best Seller Books</p>
            <Typography variant="h1">Read and Grow</Typography>
            <p>
              "That's the thing about books. They let you travel without moving
              your feet."
            </p>
          </Box>
          <Box className="main-buttons">
            <Button variant="contained" color="warning" size="large">
              Random Book
            </Button>
            <Button variant="outlined" color="warning" size="large">
              Random Book
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
            <img className="book3" src="/images/book3.jpg" alt="book1" />
          </Paper>
        </Stack>
      </Container>
    </div>
  );
};

export default MainBanner;
