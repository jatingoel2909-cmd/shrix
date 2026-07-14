const WHY_CARDS = [
  {
    title: "Most people were never taught personal finance.",
    text: "School and work rarely explain saving, investing, loans, or tax in practical terms. FOINWI starts from that gap.",
  },
  {
    title: "Financial decisions become confusing without guidance.",
    text: "Calculators, products, and jargon can overwhelm. Clear steps and plain language make trade-offs easier to see.",
  },
  {
    title: "FOINWI helps you understand before you decide.",
    text: "Educational tools, learning paths, and journeys are built to explain concepts — not to sell products or give advice.",
  },
];

function WhyFoinwiSection() {
  return (
    <section className="shrix-home-section shrix-why-section" id="why-foinwi" aria-labelledby="why-foinwi-title">
      <p className="shrix-section-label">Our Purpose</p>
      <h2 id="why-foinwi-title">Why FOINWI Exists</h2>
      <p className="shrix-home-section__subtitle">
        FOINWI is an educational platform for Indian users who want to learn how
        money works before making financial choices.
      </p>

      <div className="shrix-home-grid shrix-home-grid--3">
        {WHY_CARDS.map((card, index) => (
          <article className="shrix-home-card shrix-why-card" key={card.title}>
            <span className="shrix-why-card__step" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </article>
        ))}
      </div>

      <p className="shrix-section-bridge">
        Next, choose a mission that matches a goal you want to explore.
      </p>
    </section>
  );
}

export default WhyFoinwiSection;
