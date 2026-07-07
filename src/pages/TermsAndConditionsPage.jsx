import Navbar from "../components/Navbar";
import InfoPageLayout from "../components/InfoPageLayout";
import Footer from "../components/Footer";
import "../styles/global.css";

function TermsAndConditionsPage() {
  return (
    <div className="shrix-app">
      <Navbar />
      <InfoPageLayout
        label="Legal"
        title="Terms & Conditions"
        subtitle="Please read these terms before using FOINWI calculators and educational content."
        centered
        variant="alt"
      >
        <article className="shrix-info-card shrix-info-card--wide">
          <p>
            By accessing or using FOINWI at foinwi.com, you agree to these Terms
            & Conditions. If you do not agree, please do not use the platform.
          </p>
        </article>

        <article className="shrix-info-card shrix-info-card--wide">
          <h3>Use of FOINWI</h3>
          <p>
            FOINWI provides financial calculators, learning content, and planned
            educational tools for Indian users. You may use the platform for
            personal, non-commercial learning unless we give written permission
            for other uses.
          </p>
        </article>

        <article className="shrix-info-card shrix-info-card--wide">
          <h3>Educational Purpose Only</h3>
          <p>
            FOINWI is an educational platform. We do not provide professional
            financial, investment, tax, loan, legal, or advisory services.
            Nothing on this website should be treated as a recommendation to buy,
            sell, or hold any financial product.
          </p>
        </article>

        <article className="shrix-info-card shrix-info-card--wide">
          <h3>Calculator Results Are Estimates</h3>
          <p>
            All calculator outputs are estimates based on the information you
            enter and simplified assumptions. Results may differ from actual
            bank, tax, or investment outcomes. We do not guarantee accuracy,
            completeness, or suitability for your situation.
          </p>
        </article>

        <article className="shrix-info-card shrix-info-card--wide">
          <h3>User Responsibility</h3>
          <p>
            You are responsible for verifying information independently and for
            decisions you make based on FOINWI content. Consult qualified
            financial, tax, or legal advisors before making important financial
            decisions.
          </p>
        </article>

        <article className="shrix-info-card shrix-info-card--wide">
          <h3>Intellectual Property</h3>
          <p>
            FOINWI branding, content, design, calculators, and materials are
            protected by applicable intellectual property laws. You may not copy,
            republish, scrape, or commercially exploit our content without
            permission.
          </p>
        </article>

        <article className="shrix-info-card shrix-info-card--wide">
          <h3>Limitation of Liability</h3>
          <p>
            To the fullest extent permitted by law, FOINWI and its operators are
            not liable for any loss, damage, or decision arising from use of the
            website, calculator results, or educational content. Use the platform
            at your own discretion and risk.
          </p>
        </article>

        <article className="shrix-info-card shrix-info-card--wide">
          <h3>Changes to Terms</h3>
          <p>
            We may update these Terms & Conditions from time to time. Continued
            use of FOINWI after changes are posted means you accept the updated
            terms. Please review this page periodically.
          </p>
        </article>

        <article className="shrix-info-card shrix-info-card--wide">
          <h3>Contact</h3>
          <p>
            For questions about these terms, contact{" "}
            <a href="mailto:support@foinwi.com">support@foinwi.com</a>.
          </p>
        </article>
      </InfoPageLayout>
      <Footer />
    </div>
  );
}

export default TermsAndConditionsPage;
