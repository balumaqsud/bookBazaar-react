import * as React from "react";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { Box, Container, Stack } from "@mui/material";
import { retrieveBestSellers } from "./selector";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { serverApi } from "../../../libs/config";
import { CardOverflow } from "@mui/joy";

const bestSellersRetriever = createSelector(
  retrieveBestSellers,
  (bestSellers) => ({
    bestSellers,
  })
);

const BestSeller = () => {
  const { bestSellers } = useSelector(bestSellersRetriever);

  const history = useHistory();

  //chosen product detail page
  const chosenProductHandler = (id: string) => {
    history.push(`/books/${id}`);
  };

  return (
    <div className="bestLate-frame">
      <Container className="bestLate-container">
        <Box className="bestLate-title">Best Sellers</Box>
        <Stack
          className="bestLate-card"
          direction="row"
          spacing={2}
          flexWrap="wrap"
        >
          {bestSellers.map((ele) => {
            const imagePath = `${serverApi}/${ele.productImages[0]}`;
            return (
              <Card
                key={ele._id}
                onClick={() => chosenProductHandler(ele._id)}
                sx={{
                  minHeight: "340px",
                  width: 226,
                  "&:hover": {
                    transform: "scale(1.05)",
                    transition: "transform 0.6s ease",
                  },
                }}
              >
                <CardCover>
                  <img src={imagePath} loading="lazy" alt="book_image" />
                </CardCover>
                <CardCover
                  sx={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
                  }}
                />
                <CardContent sx={{ justifyContent: "flex-end" }}>
                  <Typography level="title-lg" textColor="#fff">
                    {ele.productName}
                  </Typography>
                  <Typography textColor="neutral.300">
                    {ele.productCategory}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </Stack>
      </Container>
    </div>
  );
};

export default BestSeller;
