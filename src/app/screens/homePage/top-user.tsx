import * as React from "react";
import Avatar from "@mui/joy/Avatar";
import Chip from "@mui/joy/Chip";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { Container, Stack } from "@mui/material";
import { createSelector } from "@reduxjs/toolkit";
import { retrieveTopUsers } from "./selector";
import { useSelector } from "react-redux";
import { serverApi } from "../../../libs/config";

const topUsersRetriever = createSelector(retrieveTopUsers, (topUsers) => ({
  topUsers,
}));

const TopUsers = () => {
  const array = ["tashkent", "samarqand", "navoiy", "chirchiq"];

  const { topUsers } = useSelector(topUsersRetriever);
  console.log("top", topUsers);

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
          {topUsers.map((ele) => {
            const imagePath = `${serverApi}/${ele.memberImage}`;
            return (
              <Card
                sx={{
                  width: 234,
                  height: 260,
                  maxWidth: "100%",
                  boxShadow: "md",
                  paddingTop: 5,
                  "&:hover": {
                    transform: "scale(1.05)",
                    transition: "transform 0.6s ease",
                  },
                }}
              >
                <CardContent sx={{ alignItems: "center", textAlign: "center" }}>
                  <Avatar
                    src={imagePath ? imagePath : "/static/images/avatar/1.jpg"}
                    sx={{ "--Avatar-size": "4rem" }}
                  />
                  <Chip
                    size="sm"
                    variant="soft"
                    color="success"
                    sx={{
                      mt: -1,
                      mb: 1,
                      border: "3px solid",
                      borderColor: "background.surface",
                    }}
                  >
                    {ele.memberType}
                  </Chip>
                  <Typography level="title-lg">{ele.memberNick}</Typography>
                  <Typography level="body-sm">
                    {ele.memberPoints} points
                  </Typography>
                  <Typography level="body-sm" sx={{ maxWidth: "24ch" }}>
                    {ele.memberDescription}
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
