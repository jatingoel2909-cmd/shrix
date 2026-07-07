import Navbar from "../components/Navbar";
import InfoPageLayout from "../components/InfoPageLayout";
import Footer from "../components/Footer";
import "../styles/global.css";

function DisclaimerPage() {
  return (
    <div className="shrix-app">
      <Navbar />
      <InfoPageLayout
        label="Legal"
        title="Disclaimer"
        subtitle="Important information about how to use FOINWI responsibly."
        centered
      >
        <article className="shrix-info-card shrix-info-card--wide shrix-info-card--highlight">
          <p>
            FOINWI provides educational calculators and financial learning tools
            only. This is not financial advice.
          </p>
        </article>

        <article className="shrix-info-card shrix-info-card--wide">
          <h3>Estimates Based on Your Inputs</h3>
          <p>
            Calculator results on FOINWI are estimates based on the values you
            enter and standard formulas or simplified assumptions. Actual
            outcomes from banks, insurers, tax authorities, or investments may
            differ. We do not guarantee accuracy or completeness.
          </p>
        </article>

        <article className="shrix-info-card shrix-info-card--wide">
          <h3>No Personalized Advice</h3>
          <p>
            FOINWI does not provide personalized investment, tax, loan, legal, or
            financial advice. Content is general and educational, designed to
            help Indian users understand financial concepts — not replace
            professional guidance.
          </p>
        </article>

        <article className="shrix-info-card shrix-info-card--wide">
          <h3>Verify Before You Decide</h3>
          <p>
            Always verify information independently before making financial
            decisions. Tax rules, interest rates, product terms, and regulations
            in India can change. Consult qualified financial, tax, and legal
            advisors for advice suited to your personal situation.
          </p>
        </article>

        <article className="shrix-info-card shrix-info-card--wide">
          <h3>Contact</h3>
          <p>
            For questions about this disclaimer, contact{" "}
            <a href="mailto:support@foinwi.com">support@foinwi.com</a>.
          </p>
        </article>
      </InfoPageLayout>
      <Footer />
    </div>
  );
}

export default DisclaimerPage;
