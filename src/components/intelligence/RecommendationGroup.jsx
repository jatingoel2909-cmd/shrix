/**
 * FOINWI Recommendation Group — labeled cluster of recommendation cards.
 */

import RecommendationCard from "./RecommendationCard";

function RecommendationGroup({ title, items = [] }) {
  if (!items.length) return null;

  return (
    <div className="fi-rec-group">
      <h3 className="fi-rec-group__title">{title}</h3>
      <div className="fi-rec-group__grid">
        {items.map((item) => (
          <RecommendationCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default RecommendationGroup;
