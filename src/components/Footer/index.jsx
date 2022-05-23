import "./style.css";
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Link } from "react-router-dom";

const Footer = () => {
  const date = new Date();
  const fullYear = date.getFullYear();
  return (
    <footer className="footer">
      <ui className="social_icon">
        <li><a href="https://www.facebook.com/CEDKMUTNB/"><FacebookIcon/></a></li>
        <li><a href="https://github.com/TCTKittiphong/tct-smartphone-shop"><GitHubIcon/></a></li>
        <li><a href="https://www.instagram.com/malikee_2543/"><InstagramIcon/></a></li>
        <li><a href="https://twitter.com/Gokittiphong"><TwitterIcon/></a></li>
      </ui>
      <ui className="menu">
        <Link to="/"><li><p>Home</p></li></Link>
        <Link to="/basket"><li><p>Basket</p></li></Link>
      </ui>
      <p>
        All &copy; copy rights are reserved to TCT31 {fullYear}
      </p>
    </footer>
  );
};

export default Footer;
