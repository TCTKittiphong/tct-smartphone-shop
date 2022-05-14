import {
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useLocation } from "react-router-dom";
import "./style.css";
import { useAuth } from "../Users/authContext";
import Swal from "sweetalert2";

const NavBar = ({ basketItems, totalCost }) => {
  const location = useLocation();
  const { user, logout, loading } = useAuth();


  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <h1>loading</h1>;

  function handleClose () {
    Swal.fire({
    title: 'Are you sure?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'OK'
  }).then((result) => {
    if (result.isConfirmed){
      handleLogout();}
  })}

  return (
    <>
      <AppBar position="fixed" className="custom-navbar">
        <Container>
          <Toolbar>
            <Typography
              component={Link}
              to="/"
              variant="h6"
              className="custom-title"
              color="inherit"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/3714/3714797.png"
                alt="logo"
                height="25px"
                className="logo"
              />
            </Typography>
            <div className="textname">
                {user.displayName || user.email}
            </div>
            {location.pathname === "/basket" ? (
              <div className="total">
                  Total cost: <strong>{totalCost}</strong>
              </div>
            ) : (
              <div className="cart">
                <IconButton
                  component={Link}
                  to="/basket"
                  aria-label="Show basket contents"
                  color="inherit"
                >
                  <Badge badgeContent={basketItems} color="secondary">
                    <ShoppingCart />
                  </Badge>
                </IconButton>
                <IconButton
                  onClick={handleClose}
                >
                    <LogoutIcon className="logout" />
                </IconButton>
              </div>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default NavBar;
