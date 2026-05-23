"use client";

import React, { useState, useEffect, useCallback } from "react";

interface CarouselSlide {
  src: string;
  alt?: string;
}

type IndicatorStyle = "dots" | "bullet";
type IndicatorColor = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";

interface CarouselIndicatorProps {
  id: string;
  title: string;
  description: React.ReactNode;
  slides: CarouselSlide[];
  indicatorStyle?: IndicatorStyle;
  indicatorColor?: IndicatorColor;
  defaultActiveIndex?: number;
  interval?: number | false;
  colClass?: string;
  className?: string;
}

export default function CarouselIndicator({
  id,
  title,
  description,
  slides,
  indicatorStyle = "dots",
  indicatorColor = "primary",
  defaultActiveIndex = 0,
  interval = 4000,
  colClass = "col-12 col-md-6 col-xl-4",
  className = "",
}: CarouselIndicatorProps) {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);

  const next = useCallback(
    () => setActiveIndex((i) => (i + 1) % slides.length),
    [slides.length]
  );

  useEffect(() => {
    if (!interval) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [interval, next]);

  const indicatorClass = [
    "carousel-indicators",
    indicatorStyle === "bullet" ? "carousel-indicators-bullet" : "carousel-indicators-dots",
    `carousel-indicators-${indicatorColor}`,
  ].join(" ");

  return (
    <div className={`${colClass} ${className}`.trim()}>
      <div
        id={id}
        className="card carousel-custom carousel slide pointer-event"
      >
        {/* Header */}
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="card-title mb-0">{title}</h5>
          <div className={indicatorClass}>
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                className={i === activeIndex ? "active" : ""}
                aria-current={i === activeIndex ? "true" : undefined}
                aria-label={`Slide ${i + 1}`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="card-body">
          <p className="text-muted">{description}</p>
          <div className="carousel-inner">
            {slides.map((slide, i) => (
              <div
                key={i}
                className={`carousel-item${i === activeIndex ? " active" : ""}`}
              >
                <img
                  src={slide.src}
                  className="d-block w-100"
                  alt={slide.alt ?? `Product Image`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}