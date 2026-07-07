import Navbar from "../components/Navbar";
import InfoPageLayout from "../components/InfoPageLayout";
import Footer from "../components/Footer";
import "../styles/global.css";

function PrivacyPolicyPage() {
  return (
    <div className="shrix-app">
      <Navbar />
      <InfoPageLayout
        label="Legal"
        title="Privacy Policy"
        subtitle="How FOINWI handles information when you use our educational financial platform."
        centered
      >
        <article className="shrix-info-card shrix-info-card--wide">
          <p>
            FOINWI (“we”, “us”, “our”) operates foinwi.com as an educational
            financial tools platform for users in India. This Privacy Policy
            explains what information we may collect and how we use it.
          </p>
        </article>

        <article className="shrix-info-card shrix-info-card--wide">
          <h3>Information We May Collect</h3>
          <p>
            When you use FOINWI, we may collect limited information such as
            pages visited, device and browser type, general location (city or
            region level), and technical logs needed to operate and improve the
            website. Calculator inputs you enter are processed in your browser
            for estimates and are not stored by us unless clearly stated
            otherwise.
          </p>
        </article>

        <article className="shrix-info-card shrix-info-card--wide">
          <h3>Contact and Email Information</h3>
          <p>
            If you contact us by email at{" "}
            <a href="mailto:support@foinwi.com">support@foinwi.com</a>, we receive
            the information you choose to share, such as your name, email
            address, and message content. We use this only to respond to your
            query, feedback, calculator issue, partnership request, or
            collaboration message.
          </p>
        </article>

        <article className="shrix-info-card shrix-info-card--wide">
          <h3>Analytics and Cookies</h3>
          <p>
            We may use analytics tools and cookies to understand how visitors use
            FOINWI, improve performance, and enhance user experience. Cookies are
            small files stored on your device. You can control cookies through
            your browser settings, though some features may work less smoothly
            if cookies are disabled.
          </p>
        </article>

        <article className="shrix-info-card shrix-info-card--wide">
          <h3>No Sale of Personal Information</h3>
          <p>
            We do not sell your personal information. FOINWI is built for
            education and clarity, not for trading user data.
          </p>
        </article>

        <article className="shrix-info-card shrix-info-card--wide">
          <h3>Third-Party Services</h3>
          <p>
            We may use third-party services for hosting, analytics, fonts, or
            other technical functions. These providers may process limited data
            on our behalf under their own privacy policies. We choose services
            carefully but do not control all third-party practices.
          </p>
        </article>

        <article className="shrix-info-card shrix-info-card--wide">
          <h3>Data Protection and Your Responsibility</h3>
          <p>
            We take reasonable steps to protect information, but no website can
            guarantee complete security. Please do not share sensitive personal,
            banking, or identification details through general contact messages
            unless necessary. You are responsible for the information you
            choose to send us.
          </p>
        </article>

        <article className="shrix-info-card shrix-info-card--wide">
          <h3>Contact</h3>
          <p>
            For privacy-related questions, contact us at{" "}
            <a href="mailto:support@foinwi.com">support@foinwi.com</a>.
          </p>
        </article>
      </InfoPageLayout>
      <Footer />
    </div>
  );
}

export default PrivacyPolicyPage;
