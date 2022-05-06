import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  CardActionArea,
  Button,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import "./style.css";


const Product = ({ product, addProduct}) => (
  <div className="w3-container w3-center w3-animate-bottom">
  <Card className="custom-card">
    <CardActionArea>
      <CardMedia
        component="img"
        className="card-image"
        height="50%"
        image={product.image.url}
        alt="green iguana"
        title="Contemplative Reptile"
      />
      <CardContent className="content">
        <Typography className="title" gutterBottom variant="h5" component="h2">
          {product.name}
        </Typography>
      </CardContent>
    </CardActionArea>
    <CardActions className="actions-content">
      <>
        <Typography className="price" gutterBottom variant="h5" component="h2">
          {product.price.formatted_with_symbol}
        </Typography>
        <Button 
            size="large" 
            className="custom-button"
            onClick={() => {
              addProduct(product.id, 1);
            }}
            >
          <ShoppingCart /> Add to basket
        </Button>
      </>
    </CardActions>
  </Card>
  </div>
);

export default Product;
