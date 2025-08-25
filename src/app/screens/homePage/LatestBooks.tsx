import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Chip from "@mui/joy/Chip";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";

import { Box, Container, Stack } from "@mui/material";
import { retrieveLatestBooks } from "./selector";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { serverApi } from "../../../libs/config";
import { CardItem } from "../../../libs/types/search";

const latestBooksRetriever = createSelector(
  retrieveLatestBooks,
  (latestBooks) => ({
    latestBooks,
  })
);

interface HomeProps {
  onAdd: (item: CardItem) => void;
}
const LatestBooks = (props: HomeProps) => {
  const { onAdd } = props;
  const { latestBooks } = useSelector(latestBooksRetriever);
  const history = useHistory();
  const array = ["tashkent", "samarqand", "navoiy", "chirchiq"];

  //chosen product detail page
  const chosenProductHandler = (id: string) => {
    history.push(`/books/${id}`);
  };

  return (
    <div className="bestLate-frame">
      <Container className="bestLate-container">
        <Box className="bestLate-title">Latest Books</Box>
        <Stack
          className="bestLate-card"
          direction="row"
          spacing={2}
          flexWrap="wrap"
        >
          {latestBooks.map((ele) => {
            const imagePath = `${serverApi}/${ele.productImages[0]}`;
            return (
              <Card
                key={ele._id}
                sx={{
                  width: 226,
                  height: 320,
                  boxShadow: "lg",
                  "&:hover": {
                    transform: "scale(1.05)",
                    transition: "transform 0.6s ease",
                  },
                }}
              >
                <CardOverflow>
                  <AspectRatio sx={{ minWidth: 200 }}>
                    <img src={imagePath} loading="lazy" alt="book" />
                  </AspectRatio>
                </CardOverflow>
                <CardContent>
                  <Typography level="body-xs">{ele.productCategory}</Typography>
                  <Link
                    href="#product-card"
                    color="neutral"
                    textColor="text.primary"
                    overlay
                    sx={{ fontWeight: "md" }}
                  >
                    ${ele.productPrice}
                  </Link>

                  <Typography
                    level="title-lg"
                    sx={{ mt: 1, fontWeight: "xl" }}
                    endDecorator={
                      <Chip
                        component="span"
                        size="sm"
                        variant="soft"
                        color="success"
                      >
                        {ele.productType}
                      </Chip>
                    }
                  >
                    {ele.productName.slice(0, 24) + "..."}
                  </Typography>
                  <Typography level="body-sm">
                    (Only <b>{ele.productLeftCount}</b> left in stock!)
                  </Typography>
                </CardContent>
                <CardOverflow>
                  <Button
                    variant="solid"
                    color="danger"
                    size="lg"
                    onClick={(e) => {
                      console.log("clicked");
                      onAdd({
                        _id: ele._id,
                        quantity: 1,
                        name: ele.productName,
                        price: ele.productPrice,
                        image: ele.productImages[0],
                      });
                      e.stopPropagation();
                    }}
                  >
                    Add to cart
                  </Button>
                </CardOverflow>
              </Card>
            );
          })}
        </Stack>
      </Container>
    </div>
  );
};

export default LatestBooks;
