import { Container, Typography, Button, Grid } from "@material-ui/core";
import "./style.css";

const Banner = () => {
  return (
    <div className="banner">
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Typography className="title" variant="h1">
              Welcome to TCTSmartPhoneShop
            </Typography>
            <Button className="shopping-button" href="#products">
              Shopping
            </Button>
          </Grid>
          <Grid className="brand" item sm={6}>
            <img src="https://cdn-icons-png.flaticon.com/512/2920/2920329.png" alt="Brand-tv" />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Banner;