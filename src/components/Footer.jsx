import BrandWordmark from "./BrandWordmark";

function Footer() {
  return (
    <footer className="shrix-footer" id="about">
      <BrandWordmark className="foinwi-wordmark--footer" />
      <p>Premium Financial Platform for Indian Investors.</p>
      <p className="shrix-footer__contact" id="contact">
        For general queries, feedback, calculator issues, partnership requests, or
        collaboration, contact us at{" "}
        <a href="mailto:support@foinwi.com">support@foinwi.com</a>.
      </p>
      <small>
        FOINWI provides educational financial tools only. We do not provide
        personalized investment, tax, loan, legal, or financial advice.
      </small>
    </footer>
  );
}

export default Footer;
