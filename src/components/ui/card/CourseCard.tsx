import React from "react";

interface CourseCardProps {
  title: string;
  description: string;
  rating: number;        // valeur entre 0 et 5
  maxRating?: number;    // défaut 5
  startDate: string;
  enrollHref?: string;
  onEnroll?: () => void;
  className?: string;
}

function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className="rating">
      {Array.from({ length: max }, (_, i) => (
        <i
          key={i}
          className={i < Math.round(rating) ? "ri-star-fill text-warning" : "ri-star-line text-muted"}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export default function CourseCard({
  title,
  description,
  rating,
  maxRating = 5,
  startDate,
  enrollHref = "#",
  onEnroll,
  className = "",
}: CourseCardProps) {
  return (
    <div className={`col-md-6 col-xl-3 ${className}`.trim()}>
      <div className="card h-100">
        <div className="card-body">
          <h5 className="card-title mb-3">{title}</h5>
          <p className="text-muted">{description}</p>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-2">
              <span>Rating:</span>
              <StarRating rating={rating} max={maxRating} />
            </div>
            <a
              href={onEnroll ? undefined : enrollHref}
              role={onEnroll ? "button" : undefined}
              onClick={onEnroll}
              className="btn btn-light-primary"
            >
              Enroll Now
            </a>
          </div>
        </div>
        <div className="card-footer text-end">
          <small className="text-muted">{startDate}</small>
        </div>
      </div>
    </div>
  );
}

