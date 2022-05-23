import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Container,
  CardActionArea,
  Button,
} from "@material-ui/core";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import "./style.css";
import Spinner from "../Spinner";
import Swal from "sweetalert2";
import NavBar from "../Navbar";
import Footer from "../Footer";

const Basket = ({
  basketData,
  updateProduct,
  handleEmptyBasket,
  RemoveItemFromBasket,
  productView,
}) => {
  const [showSpinner, setShowSpinner] = useState(true);

  const loading = () => {
    setTimeout(() => {
      setShowSpinner(false);
    }, 2000);
    if (showSpinner) {
      return <Spinner />;
    }
    return (
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You have no items in your cart.",
      }),
      (<Navigate to="/" replace={true} />)
    );
  };
  if (!basketData.line_items || !basketData.line_items.length) return loading();

  function EmptyBasket() {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) {
        handleEmptyBasket();
      }
    });
  }

  return (
    <div>
      <NavBar
        basketItems={basketData.total_items}
        totalCost={
          (basketData.subtotal && basketData.subtotal.formatted_with_symbol) ||
          "00.00"
        }
      />
      <div className="w3-container w3-center w3-animate-bottom">
        <Container id="basket">
          <Grid container justify="center" spacing={4}>
            {basketData.line_items.map((product) => {
              return (
                <Grid key={product.id} item xs={12} sm={6} md={4}>
                  <Card className="custom-card">
                    <CardActionArea
                      onClick={() => {
                        productView(product.product_id);
                      }}
                    >
                      <figure class="snip">
                        <img src={product.image.url} alt={product.name} />
                        <figcaption>
                          <h2>{product.name}</h2>
                          <p>View</p>
                        </figcaption>
                      </figure>
                      <CardContent className="content">
                        <Typography
                          className="title"
                          gutterBottom
                          variant="h5"
                          component="h2"
                        >
                          {product.name}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Typography
                        className="basket-item-price"
                        gutterBottom
                        variant="h5"
                        component="h2"
                      >
                        {product.price.formatted_with_symbol}
                      </Typography>
                    </CardActions>

                    <CardActions className="actions-content">
                      <Button
                        size="small"
                        color="secondary"
                        variant="outlined"
                        onClick={() => {
                          RemoveItemFromBasket(product.id);
                        }}
                      >
                        Remove
                      </Button>

                      <>
                        <Button
                          size="small"
                          variant="outlined"
                          className="increase-product-quantity"
                          onClick={() => {
                            updateProduct(product.id, product.quantity + 1);
                          }}
                        >
                          +
                        </Button>
                        <Typography>&nbsp;{product.quantity}&nbsp;</Typography>
                        <Button
                          size="small"
                          variant="outlined"
                          className="increase-product-quantity"
                          onClick={() => {
                            updateProduct(product.id, product.quantity - 1);
                          }}
                        >
                          -
                        </Button>
                      </>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
          <div className="actions">
            <Button
              size="small"
              color="secondary"
              variant="contained"
              onClick={EmptyBasket}
            >
              Empty Basket
            </Button>

            <Button
              size="small"
              variant="contained"
              component={Link}
              to="/checkout"
            >
              Checkout
            </Button>
          </div>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default Basket;
