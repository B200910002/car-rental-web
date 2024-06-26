import React from 'react';
import './footerStyles.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import './footerStyles.css';

const Footer = () => {
  const now = new Date();
  
  return (
    <footer>
      {/* <div className="social-links">
        <a href="https://twitter.com/your-twitter-url" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
      </div> */}
      <p>&copy; {now.getFullYear()} Car Rental Website. All rights reserved.</p>
    </footer>
  );
};

export default Footer;