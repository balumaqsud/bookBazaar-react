import { Container } from "@mui/material";
import React from "react";

const Brands = () => {
  return (
    <div className="brand-frame">
      <Container className="brand-container">
        <img src="images/hach.png" alt="hash" />
        <img src="images/har.png" alt="harper" />
        <img src="images/nac.png" alt="macm" />
        <img src="images/sim.png" alt="simon" />
        <img src="images/pen.png" alt="pen" />
      </Container>
    </div>
  );
};

export default Brands;
