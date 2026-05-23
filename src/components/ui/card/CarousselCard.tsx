"use client";

import React, { useState } from "react";

interface CarouselImage {
  src: string;
  alt?: string;
}

interface CarouselCardProps {
  id: string;
  images: CarouselImage[];
  defaultActiveIndex?: number;
  title: string;
  description: string;
  soldPercent?: number;       // 0-100
  buyHref?: string;
  onBuy?: () => void;
  colClass?: string;
  className?: string;
}

export default function CarouselCard({
  id,
  images,
  defaultActiveIndex = 0,
  title,
  description,
  soldPercent,
  buyHref = "#",
  onBuy,
  colClass = "col-md-6 col-xl-4",
  className = "",
}: CarouselCardProps) {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);

  const prev = () => setActiveIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setActiveIndex((i) => (i + 1) % images.length);

  return (
    <div className={`${colClass} ${className}`.trim()}>
      <div className="card card-h-100">

        {/* Carousel */}
        <div id={id} className="carousel slide pointer-event">
          <div className="carousel-inner">
            {images.map((img, i) => (
              <div key={i} className={`carousel-item${i === activeIndex ? " active" : ""}`}>
                <img
                  src={img.src}
                  className="d-block w-100"
                  alt={img.alt ?? `Product Image ${i + 1}`}
                />
              </div>
            ))}
          </div>
          {images.length > 1 && (
            <>
              <button
                className="carousel-control-prev"
                type="button"
                onClick={prev}
                aria-label="Previous slide"
              >
                <span className="carousel-control-prev-icon" aria-hidden="true" />
              </button>
              <button
                className="carousel-control-next"
                type="button"
                onClick={next}
                aria-label="Next slide"
              >
                <span className="carousel-control-next-icon" aria-hidden="true" />
              </button>
            </>
          )}
        </div>

        {/* Body */}
        <div className="card-body">
          <h5 className="card-title mb-3">{title}</h5>
          <p className="card-text text-muted">{description}</p>
          <a
            href={onBuy ? undefined : buyHref}
            role={onBuy ? "button" : undefined}
            onClick={onBuy}
            className="btn btn-primary"
          >
            Buy Now
          </a>
        </div>

        {/* Footer — progress bar */}
        {soldPercent !== undefined && (
          <div className="card-footer">
            <div className="progress mb-3">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${soldPercent}%` }}
                aria-valuenow={soldPercent}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                {soldPercent}% Sold
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}