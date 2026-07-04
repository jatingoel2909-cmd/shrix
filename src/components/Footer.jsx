import logo from "../assets/shrix-logo.png";

function Footer() {
  return (
    <footer className="shrix-footer">
      <img src={logo} alt="Shrix logo" />
      <h3>Grow Beyond Numbers.</h3>
      <p>Premium financial calculators for Indian users.</p>
      <small>Educational purpose only. Not financial advice.</small>
    </footer>
  );
}

export default Footer;