import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LearningPathCard from "../components/learn/LearningPathCard";
import IntelligenceSection from "../components/intelligence/IntelligenceSection";
import RecommendationPanel from "../components/intelligence/RecommendationPanel";
import { LEARN_ACADEMY_NOTICE, LEARNING_PATHS } from "../data/learnAcademy";
import "../styles/global.css";
import "../styles/learn-academy.css";

function LearnPage() {
  const featuredPath = LEARNING_PATHS[0];
  const continuePath = LEARNING_PATHS[1];

  return (
    <div className="shrix-app">
      <Navbar />

      <header className="la-hero">
        <div className="la-hero__inner">
          <p className="shrix-section-label">FOINWI Learn Academy</p>
          <h1>Learn Finance Step by Step</h1>
          <p>
            Understand money through structured learning paths, practical examples,
            calculators, and interactive guidance.
          </p>
        </div>
      </header>

      <main className="la-main">
        <section className="la-section">
          <div className="la-section__head">
            <h2>Learning Paths</h2>
            <p>
              Choose a structured track. Each path includes lessons, related FOINWI
              calculators, and a clear progression from fundamentals to applied topics.
            </p>
          </div>
          <div className="la-path-grid">
            {LEARNING_PATHS.map((path) => (
              <LearningPathCard key={path.slug} path={path} />
            ))}
          </div>
        </section>

        <IntelligenceSection
          pathname="/learn"
          difficulty="beginner"
          className="fi-intelligence-section--learn"
        />

        <RecommendationPanel
          pathname="/learn"
          sourceType="lesson"
          difficulty="beginner"
          className="fi-rec-panel--learn"
        />

        <section className="la-continue">
          <div className="la-continue__copy">
            <p className="shrix-section-label">Continue Learning</p>
            <h2>Recommended Next Path</h2>
            <p>
              Finished exploring {featuredPath.title}? {continuePath.title} builds
              on those ideas with practical saving and budgeting habits.
            </p>
            <Link to={`/learn/${continuePath.slug}`} className="la-btn la-btn--primary">
              Explore {continuePath.title} →
            </Link>
          </div>
          <article className="la-continue__card">
            <span aria-hidden="true">{continuePath.icon}</span>
            <h3>{continuePath.title}</h3>
            <p>{continuePath.description}</p>
            <ul className="la-continue__stats">
              <li>{continuePath.duration}</li>
              <li>{continuePath.difficulty}</li>
              <li>{continuePath.lessons.length} lessons</li>
            </ul>
          </article>
        </section>
      </main>

      <p className="la-notice">{LEARN_ACADEMY_NOTICE}</p>
      <Footer />
    </div>
  );
}

export default LearnPage;
