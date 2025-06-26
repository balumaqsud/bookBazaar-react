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
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import SvgIcon from "@mui/joy/SvgIcon";
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
                  height: 320,
                  maxWidth: "100%",
                  boxShadow: "lg",
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
                <CardOverflow sx={{ bgcolor: "background.level1" }}>
                  <CardActions buttonFlex="1">
                    <ButtonGroup
                      variant="outlined"
                      sx={{ bgcolor: "background.surface" }}
                    >
                      <Button>Message</Button>
                      <Button>Connect</Button>
                    </ButtonGroup>
                  </CardActions>
                </CardOverflow>
              </Card>
            );
          })}
        </Stack>
      </Container>
    </div>
  );
};

export default TopUsers;
