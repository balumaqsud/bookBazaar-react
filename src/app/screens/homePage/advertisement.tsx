import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";

export default function Advertisement() {
  return (
    <Box
      component="ul"
      sx={{ display: "flex", gap: 2, flexWrap: "wrap", p: 0, m: 0, mb: 10 }}
    >
      <Card component="li" sx={{ minWidth: "100%", height: 540, flexGrow: 1 }}>
        <CardCover>
          <video
            autoPlay
            loop
            muted
            poster="https://assets.codepen.io/6093409/river.jpg"
          >
            <source src="/images/vid.mp4" type="video/mp4" />
          </video>
        </CardCover>
      </Card>
    </Box>
  );
}
