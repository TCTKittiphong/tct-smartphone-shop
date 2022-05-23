import {
  Card,
  CardActions,
  Typography,
  CardActionArea,
  Button,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import "./style.css";

const Product = ({ product, addProduct, productView }) => (
  <div className="w3-container w3-center w3-animate-bottom">
    <Card className="custom-card">
      <CardActionArea
        onClick={() => {
          productView(product.id);
        }}
      >
        <figure class="snip">
          <img
            src={product.image.url}
            alt={product.name}
          />
          <figcaption>
            <h2>
              {product.name}
            </h2>
            <p>View</p>
          </figcaption>
        </figure>
        <div className="name">{product.name}</div> 
      </CardActionArea>
      <CardActions className="actions-content">
        <>
          <Typography
            className="price"
            gutterBottom
            variant="h5"
            component="h2"
          >
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
    <br />
  </div>
);

export default Product;
