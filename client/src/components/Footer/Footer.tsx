// import './Footer.css'

export default function Footer() {
  return (
    <footer>
      <div>
        <p className="footer-text">Thank you for visiting! Contact me here!</p>
        <div id="footer-icons-container">
          <a href="https://github.com/hongfetti" target="_blank">
            <img
              src="https://1000logos.net/wp-content/uploads/2021/05/GitHub-logo.png"
              className="logo"
              alt="Github logo"
            />
          </a>
          <a
            href="https://www.linkedin.com/in/ryan-hong-4b0634358"
            target="_blank"
          >
            <img
              src="https://cdn.iconscout.com/icon/free/png-256/free-linkedin-logo-icon-download-in-svg-png-gif-file-formats--brand-social-media-pack-logos-icons-2641591.png?f=webp"
              className="logo"
              alt="linkedIn logo"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
