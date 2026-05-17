import React from "react";
import StatCard from "@/components/ui/stat_card/StatCard";
import type { StatItem } from "@/types/dashboard";

interface StatsRowProps {
  stats: StatItem[];
}

export default function StatsRow({ stats }: StatsRowProps) {
  return (
    <div className="row">
      <div className="col-xxl-8">
        <div className="row h-100">
          {stats.map((stat, idx) => (
            <div key={idx} className="col-xl-4 col-sm-6">
              <StatCard
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
                caption={stat.caption}
                captionHighlight={stat.captionHighlight}
                highlightColor={stat.highlightColor}
                trend={stat.trend}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="col-xxl-4">
        <div className="card overflow-hidden bg-primary card-h-100 p-4">
          <div className="row">
            <div className="col-8">
              <div className="vector-image">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="img-fluid welcome-img w-200px mb-n20 mt-n5"
                  src="/assets/images/dashboard/upgrade-img.png"
                  alt="CRM Vector"
                />
              </div>
            </div>
            <div className="col-4">
              <div className="text-end">
                <p className="mb-5 fs-16 fw-semibold text-white">
                  Lorem ipsum dolor <br /> sit lorem ipsum <br /> dolor sit
                </p>
                <a
                  href="#"
                  className="btn text-white border border-white mt-1"
                >
                  Upgrade
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}