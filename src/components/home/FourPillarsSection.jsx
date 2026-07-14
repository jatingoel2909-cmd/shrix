const pillars = [
  {
    step: "01",
    title: "Calculate",
    text: "Model SIP, EMI, tax, retirement, and goals with clear, educational estimates.",
  },
  {
    step: "02",
    title: "Learn",
    text: "Build understanding through structured paths on money, investing, loans, and more.",
  },
  {
    step: "03",
    title: "Plan",
    text: "Connect numbers to missions and journeys so decisions follow a deliberate sequence.",
  },
  {
    step: "04",
    title: "Grow",
    text: "Practice habits over time — review, refine, and deepen confidence as you go.",
  },
];

function FourPillarsSection() {
  return (
    <section className="shrix-home-section shrix-pillars-section" id="pillars">
      <p className="shrix-section-label">How FOINWI Works</p>
      <h2>Calculate. Learn. Plan. Grow.</h2>
      <p className="shrix-home-section__subtitle">
        A simple progression: start with numbers, add understanding, organise a
        plan, then build lasting money habits.
      </p>

      <div className="shrix-home-grid shrix-home-grid--4 shrix-pillars-grid">
        {pillars.map((pillar, index) => (
          <article className="shrix-home-card shrix-pillar-card" key={pillar.title}>
            <div className="shrix-pillar-card__top">
              <span className="shrix-pillar-card__step" aria-hidden="true">
                {pillar.step}
              </span>
              {index < pillars.length - 1 ? (
                <span className="shrix-pillar-card__arrow" aria-hidden="true">
                  →
                </span>
              ) : null}
            </div>
            <h3>{pillar.title}</h3>
            <p>{pillar.text}</p>
          </article>
        ))}
      </div>

      <p className="shrix-section-bridge">
        Put the first step into practice with the calculators most people start with.
      </p>
    </section>
  );
}

export default FourPillarsSection;
