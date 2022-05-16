import "./style.css";
import { Grid, Typography, Container, Button } from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import { useState, useEffect } from "react";
import { commerce } from "../../lib/commerce";
import NavBar from "../Navbar";

const ProductView = ({ basketData, addProduct }) => {
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);

  const fetchProduct = async (id) => {
    const response = await commerce.products.retrieve(id);
    const { name, price, image, quantity, description } = response;
    setProduct({
      id,
      name,
      quantity,
      description,
      price: price.formatted_with_symbol,
      src: image.url
    });
    
  };

  useEffect(() => {
    const id = window.location.pathname.split("/");
    fetchProduct(id[2]);
  }, []);

  const handleQuantity = (param) => {
    if (param === "decries" && quantity > 1) {
      setQuantity(quantity - 1);
    }
    if (param === "increase" && quantity < 10) {
      setQuantity(quantity + 1);
    }
  };

  function createMarkup(text) {
    return {__html: text};
  }

  return (
    <div className="w3-container w3-center w3-animate-bottom">
      <NavBar
        basketItems={basketData.total_items}
        totalCost={
          (basketData.subtotal && basketData.subtotal.formatted_with_symbol) ||
          "00.00"
        }
      />
      <Container className="product-view">
        <Grid container spacing={4}>
          <Grid item xs={12} md={8} className="image-wrapper">
            <img
              src={product.src}
              alt={product.name}
            />
          </Grid>
          <Grid item xs={12} md={4} className="text">
            <Typography variant="h2">{product.name}</Typography>
            <Typography
              variant="p"
              dangerouslySetInnerHTML={createMarkup([product.description])}
            />
            <Typography variant="h3">Price : {product.price}</Typography>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Button
                  size="small"
                  variant="contained"
                  className="increase-product-quantity"
                  onClick={() => {
                    handleQuantity("increase");
                  }}
                >
                  +
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography className="quantity" variant="h3">
                  Quantity : {quantity}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Button
                  size="small"
                  color="secondary"
                  variant="contained"
                  onClick={() => {
                    handleQuantity("decries");
                  }}
                >
                  -
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  size="large"
                  className="custom-button"
                  onClick={() => {
                    addProduct(product.id, quantity);
                  }}
                >
                  <ShoppingCart /> Add to basket
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ProductView;
