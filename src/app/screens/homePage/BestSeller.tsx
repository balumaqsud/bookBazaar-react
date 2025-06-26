import * as React from "react";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { Box, Stack } from "@mui/material";

const BestSeller = () => {
  const array = ["tashkent", "samarqand", "navoiy", "chirchiq"];

  return (
    <div className="bestLate-frame">
      <Box className="bestLate-title">Best Sellers</Box>
      <Stack
        className="bestLate-card"
        direction="row"
        spacing={2}
        flexWrap="wrap"
      >
        {array.map((value, number) => {
          return (
            <Card sx={{ minHeight: "340px", width: 260 }}>
              <CardCover>
                <img
                  src="https://images.unsplash.com/photo-1542773998-9325f0a098d7?auto=format&fit=crop&w=320"
                  srcSet="https://images.unsplash.com/photo-1542773998-9325f0a098d7?auto=format&fit=crop&w=320&dpr=2 2x"
                  loading="lazy"
                  alt=""
                />
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
    </div>
  );
};

export default BestSeller;
