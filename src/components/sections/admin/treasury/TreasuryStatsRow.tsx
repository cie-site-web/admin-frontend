import StatCard from "@/components/ui/stat_card/StatCard";
import type { TreasuryStatItem } from "@/types/treasury";

interface TreasuryStatsRowProps {
  stats: TreasuryStatItem[];
}

export default function TreasuryStatsRow({ stats }: TreasuryStatsRowProps) {
  return (
    <div className="row g-4 mb-4 position-relative z-1">
      {stats.map((stat, idx) => (
        <div key={idx} className="col-xl-4 col-md-6">
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
  );
}
