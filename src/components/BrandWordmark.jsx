import { Link } from "react-router-dom";

function BrandWordmark({ linked = false, className = "" }) {
  const mark = (
    <span className={`foinwi-wordmark${className ? ` ${className}` : ""}`}>
      FOINWI
    </span>
  );

  if (linked) {
    return (
      <Link to="/" className="foinwi-wordmark-link" aria-label="FOINWI home">
        {mark}
      </Link>
    );
  }

  return mark;
}

export default BrandWordmark;
