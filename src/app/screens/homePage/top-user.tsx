import * as React from "react";
import Avatar from "@mui/joy/Avatar";
import Chip from "@mui/joy/Chip";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import ButtonGroup from "@mui/joy/ButtonGroup";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import CardActions from "@mui/joy/CardActions";
import Typography from "@mui/joy/Typography";
import { Container, Stack } from "@mui/material";

const TopUsers = () => {
  const array = ["tashkent", "samarqand", "navoiy", "chirchiq"];
  return (
    <div className="bestLate-frame">
      <Container className="bestLate-container">
        <Box className="bestLate-title">Top Users</Box>
        <Stack
          className="bestLate-card"
          direction="row"
          spacing={1}
          flexWrap="wrap"
        >
          {array.map((value, number) => {
            return (
              <Card
                sx={{
                  width: 234,
                  height: 260,
                  maxWidth: "100%",
                  boxShadow: "md",
                  paddingTop: 5,
                }}
              >
                <CardContent sx={{ alignItems: "center", textAlign: "center" }}>
                  <Avatar
                    src="/static/images/avatar/1.jpg"
                    sx={{ "--Avatar-size": "4rem" }}
                  />
                  <Chip
                    size="sm"
                    variant="soft"
                    color="primary"
                    sx={{
                      mt: -1,
                      mb: 1,
                      border: "3px solid",
                      borderColor: "background.surface",
                    }}
                  >
                    PRO
                  </Chip>
                  <Typography level="title-lg">{value}</Typography>
                  <Typography level="body-sm" sx={{ maxWidth: "24ch" }}>
                    Hello, this is my bio and I am a PRO member of MUI. I am a
                    developer and I love to code.
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

export default TopUsers;
