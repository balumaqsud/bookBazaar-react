import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Chip from "@mui/joy/Chip";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { Box, Container, Stack } from "@mui/material";

const LatestBooks = () => {
  const array = ["tashkent", "samarqand", "navoiy", "chirchiq"];

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
          {array.map((value, number) => {
            return (
              <Card sx={{ width: 226, height: 320, boxShadow: "lg" }}>
                <CardOverflow>
                  <AspectRatio sx={{ minWidth: 200 }}>
                    <img
                      src="https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286"
                      srcSet="https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286&dpr=2 2x"
                      loading="lazy"
                      alt=""
                    />
                  </AspectRatio>
                </CardOverflow>
                <CardContent>
                  <Typography level="body-xs">{value}</Typography>
                  <Link
                    href="#product-card"
                    color="neutral"
                    textColor="text.primary"
                    overlay
                    endDecorator={<ArrowOutwardIcon />}
                    sx={{ fontWeight: "md" }}
                  >
                    Super Rockez A400
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
                        Lowest price
                      </Chip>
                    }
                  >
                    2,900 THB
                  </Typography>
                  <Typography level="body-sm">
                    (Only <b>7</b> left in stock!)
                  </Typography>
                </CardContent>
                <CardOverflow>
                  <Button variant="solid" color="danger" size="lg">
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
