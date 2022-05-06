import { Container, Typography, Button, Grid } from "@material-ui/core";
import "./style.css";

const Banner = () => {
  return (
    <div className="w3-container w3-center w3-animate-bottom">
    <div className="BG">
      <Container >
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Typography className="title" variant="h1">
            </Typography>
            <Button className="shopping-button" href="#products">
              Shopping
            </Button>
          </Grid>
          <Grid className="brand" item sm={6}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3714/3714797.png"
              alt="Brand-tv"
            />
          </Grid>
        </Grid>
      </Container>
    </div>
    </div>
  );
};

export default Banner;
