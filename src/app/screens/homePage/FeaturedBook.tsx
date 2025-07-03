import Button from "@mui/joy/Button";
import { Box, Container, Stack, Typography } from "@mui/material";
import React from "react";
import { retrieveFeaturedBook } from "./selector";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Product } from "../../../libs/types/product";
import { serverApi } from "../../../libs/config";
import Chip from "@mui/joy/Chip";

const featuredBookRetriever = createSelector(
  retrieveFeaturedBook,
  (featuredBook) => ({
    featuredBook,
  })
);

const FeaturedBook = () => {
  const { featuredBook } = useSelector(featuredBookRetriever);

  const history = useHistory();

  //chosen product detail page
  const chosenProductHandler = (id: string) => {
    history.push(`/products/${id}`);
  };
  return (
    <div className="featured-frame">
      {featuredBook.map((ele) => {
        const imagePath = `${serverApi}/${ele.productImages[0]}`;
        return (
          <Container className="bestLate-container">
            <Box className="featured-title">Featured Book</Box>
            <Stack className="product-box">
              <Box className="product-image" sx={{ height: 560 }}>
                <img src={imagePath} alt="product-image" />
              </Box>
              <Box className="product-detail">
                <p>{ele.productCategory}</p>
                <Chip component="span" size="md" variant="soft" color="success">
                  {ele.productType}
                </Chip>
                <Typography variant="h2" fontWeight={600}>
                  {ele.productName}
                </Typography>

                <Typography variant="h6">{ele.productDesc}</Typography>
                <Box className="product-low">
                  <p>${ele.productPrice}</p>
                  <Button size="lg" variant={"soft"} color="warning">
                    Add to Card
                  </Button>
                  <Button
                    size="lg"
                    variant={"outlined"}
                    color="success"
                    onClick={() => chosenProductHandler(ele._id)}
                  >
                    Make Order
                  </Button>
                </Box>
              </Box>
            </Stack>
          </Container>
        );
      })}
    </div>
  );
};

export default FeaturedBook;
