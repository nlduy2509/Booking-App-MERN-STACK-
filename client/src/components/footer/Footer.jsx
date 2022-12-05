import "./footer.css";
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

const Footer = () => {
  return (
    <div className="footer">
      <div className="icon-container">
        <FacebookIcon className="iconl"></FacebookIcon>
        <YouTubeIcon className="iconl"></YouTubeIcon>
        <InstagramIcon className="iconl"></InstagramIcon>
        <TwitterIcon className="iconl"></TwitterIcon>
      </div>
      <div className="fText">Copyright © 2022 Booking App.</div>
    </div>
  );
};

export default Footer;
