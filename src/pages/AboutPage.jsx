import Navbar from "../components/Navbar";
import InfoPageLayout from "../components/InfoPageLayout";
import Footer from "../components/Footer";
import "../styles/global.css";

const principles = [
  "Focus — clarity over complexity in every tool and explanation.",
  "Investment — building long-term wealth through thoughtful decisions.",
  "Willingly — empowering you to choose with confidence, not pressure.",
  "Education first — we explain concepts, not push products.",
  "Built for India — calculators and content reflect how Indians save, borrow, and plan.",
  "Transparency — no hidden agendas, no exaggerated claims.",
];

const roadmap = [
  "Expanded calculator library covering more Indian financial scenarios.",
  "Structured learning paths aligned to life stages and financial goals.",
  "AI-powered educational tools for guided explanations and planning.",
  "Richer content on tax, salary, retirement, and wealth planning.",
  "A platform that grows with you — from first SIP to retirement corpus.",
];

function AboutPage() {
  return (
    <div className="shrix-app">
      <Navbar />
      <InfoPageLayout
        label="About FOINWI"
        title="Financial Clarity for Every Indian"
        subtitle="Premium calculators and educational tools from foinwi.com — designed to help you understand money, not overwhelm you with it."
      >
        <article className="shrix-info-card shrix-info-card--wide">
          <h3>Who We Are</h3>
          <p>
            FOINWI is a premium financial platform built for Indian users who want
            clear, practical answers about money. We combine accurate calculators
            with educational content so you can understand SIP, loans, deposits,
            retirement, tax planning, and everyday financial decisions — without
            wading through jargon or noise.
          </p>
        </article>

        <div className="shrix-info-grid">
          <article className="shrix-info-card">
            <h3>Our Mission</h3>
            <p>Build wealth through thoughtful financial decisions.</p>
          </article>

          <article className="shrix-info-card">
            <h3>Our Vision</h3>
            <p>
              Helping millions of people make smarter financial decisions with
              confidence.
            </p>
          </article>
        </div>

        <article className="shrix-info-card shrix-info-card--wide">
          <h3>What Makes Us Different</h3>
          <p>
            FOINWI is not another generic finance site. We focus on the products,
            scenarios, and questions that matter to Indian users — PPF, EPF, NPS,
            FD, EMI, SIP, gratuity, and more. Our black-and-gold experience is
            designed to feel premium and trustworthy, with calculators that are
            fast, responsive, and easy to use on any device.
          </p>
          <p className="shrix-info-card__follow">
            We do not sell financial products, offer personalised advisory
            services, or claim regulated credentials. FOINWI is an educational
            platform — here to help you learn, compare scenarios, and think
            clearly about your money.
          </p>
        </article>

        <article className="shrix-info-card shrix-info-card--wide">
          <h3>Our Principles</h3>
          <p className="shrix-info-card__follow">
            Our core philosophy is Focus. Investment. Willingly. — the foundation
            behind the FOINWI name and everything we build.
          </p>
          <ul className="shrix-info-list">
            {principles.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="shrix-info-card shrix-info-card--wide shrix-info-card--highlight">
          <h3>Grow Beyond Numbers</h3>
          <p>
            That is more than a tagline — it is how we think about financial
            planning. Numbers matter, but understanding what they mean matters
            more. FOINWI helps you see the story behind every calculation: how
            compounding builds wealth, how EMI affects cash flow, how retirement
            corpus targets take shape over time.
          </p>
          <p className="shrix-info-card__follow">
            When you Grow Beyond Numbers, you move from guessing to knowing —
            and from knowing to confident, informed action.
          </p>
        </article>

        <article className="shrix-info-card shrix-info-card--wide">
          <h3>Future Roadmap</h3>
          <p>
            FOINWI is actively evolving. Here is what we are working toward:
          </p>
          <ul className="shrix-info-list">
            {roadmap.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </InfoPageLayout>
      <Footer />
    </div>
  );
}

export default AboutPage;
