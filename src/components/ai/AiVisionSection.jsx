function AiVisionSection({ vision }) {
  return (
    <section className="ai-vision" aria-labelledby="ai-vision-title">
      <div className="ai-vision__inner">
        <p className="shrix-section-label">{vision.eyebrow}</p>
        <h2 id="ai-vision-title">{vision.title}</h2>
        {vision.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}

export default AiVisionSection;
