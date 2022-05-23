import "./style.css";
import { ShoppingCart } from "@material-ui/icons";
import { useState, useEffect } from "react";
import { commerce } from "../../lib/commerce";
import NavBar from "../Navbar";
import Footer from "../Footer";

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
      src: image.url,
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
    return { __html: text };
  }

  return (
    <div className="w3-animate-bottom">
      <NavBar
        basketItems={basketData.total_items}
        totalCost={
          (basketData.subtotal && basketData.subtotal.formatted_with_symbol) ||
          "00.00"
        }
      />
      <div className="container">
        <div className="product-view">
          <div className="image-wrapper">
            <img className="imgpd" src={product.src} alt={product.name} />
          </div>
          <div className="text">
            <table class="table table-striped table-hover">
              <thead class="bg-dark text-white">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">{product.name}</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Specs</th>
                  <td
                    dangerouslySetInnerHTML={createMarkup([
                      product.description,
                    ])}
                  ></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">Price</th>
                  <td>{product.price}</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">Quantity</th>
                  <td>{quantity}</td>
                  <td>
                    {" "}
                    <button
                      class="btn btn-outline-success"
                      onClick={() => {
                        handleQuantity("increase");
                      }}
                    >
                      +
                    </button>
                  </td>
                  <td>
                    <button
                      class="btn btn-outline-danger"
                      onClick={() => {
                        handleQuantity("decries");
                      }}
                    >
                      -
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="add">
              <button
                class="btn btn-outline-primary"
                onClick={() => {
                  addProduct(product.id, quantity);
                }}
              >
                <ShoppingCart /> Add to basket
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductView;
