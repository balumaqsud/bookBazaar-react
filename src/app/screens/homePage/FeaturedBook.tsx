import Button from "@mui/joy/Button";
import { Box, Container, Stack, Typography } from "@mui/material";
import React from "react";

const FeaturedBook = () => {
  return (
    <div className="featured-frame">
      <Container className="bestLate-container">
        <Box className="featured-title">Featured Book</Box>
        <Stack className="product-box">
          <Box className="product-image">
            <img src="/images/book2.jpg" alt="product-image" />
          </Box>
          <Box className="product-detail">
            <p>Book Bazaar</p>
            <Typography variant="h2" fontWeight={600}>
              O'tgan Kunlar, Otabek
            </Typography>
            <Typography variant="h6">
              These low-profile sneakers are your perfect casual wear companion.
              Featuring a durable rubber outer{" "}
            </Typography>
            <Box className="product-low">
              <p>$55</p>
              <Button size="lg" variant={"soft"} color="warning">
                Add to Card
              </Button>
              <Button size="lg" variant={"outlined"} color="success">
                Make Order
              </Button>
            </Box>
          </Box>
        </Stack>
      </Container>
    </div>
  );
};

export default FeaturedBook;
