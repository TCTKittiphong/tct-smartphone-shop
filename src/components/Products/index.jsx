import Product from "../Product";
import { Grid, Container, Typography } from "@material-ui/core";
import Banner from "../Banner";
import NavBar from "../Navbar";
import Spinner from "../Spinner";

const Products = ({ categories, addProduct, basketData, productView }) => {
  if (!categories.length) return <Spinner />;

  return (
    <div>
      <NavBar
        basketItems={basketData.total_items}
        totalCost={
          (basketData.subtotal && basketData.subtotal.formatted_with_symbol) ||
          "00.00"
        }
      />
      <Banner />
      <div id="products">
      <div className="contents">
        {categories.map((category) => {
          return (
            <Container>
              <Typography className="headline" variant="h3" component="h2">
                {category.name}
                <Grid container spacing={4}>
                  {category.productsData.map((product) => {
                    return (
                      <Grid key={product.id} item xs={12} sm={6} md={4}>
                        <Product product={product} addProduct={addProduct} productView={productView}/>
                      </Grid>
                    );
                  })}
                </Grid>
              </Typography>
            </Container>
          );
        })}
      </div>
      </div>
    </div>
  );
};

export default Products;
