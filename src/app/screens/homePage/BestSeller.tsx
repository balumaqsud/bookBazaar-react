import * as React from "react";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { Box, Container, Stack } from "@mui/material";

const BestSeller = () => {
  const array = ["tashkent", "samarqand", "navoiy", "chirchiq"];

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
          {array.map((value, number) => {
            return (
              <Card
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
                  <img src="/images/book1.jpg" loading="lazy" alt="book" />
                </CardCover>
                <CardCover
                  sx={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
                  }}
                />
                <CardContent sx={{ justifyContent: "flex-end" }}>
                  <Typography level="title-lg" textColor="#fff">
                    Yosemite National Park
                  </Typography>
                  <Typography textColor="neutral.300">{value}</Typography>
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
