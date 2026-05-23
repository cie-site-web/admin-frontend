import StatsRow from "@/components/sections/admin/dashboard/StatsRow";
import Account from "@/components/sections/admin/dashboard/Account";
import GraphSuivi from "@/components/sections/admin/dashboard/GraphSuivi";
import Transaction from "@/components/sections/admin/dashboard/Transaction";

import {
  STATS,
  ORDERS,
} from "@/components/sections/admin/dashboard/mockData";

export const metadata = {
  title: "Tableau de bord | CIE Admin",
  description: "Vue d'ensemble du club",
};

export default function DashboardPage() {
  return (
    <>
      <StatsRow stats={STATS} />

      <Account orders={ORDERS} />

      <div className="row">
        <div className="col-xl-8">
          <GraphSuivi />
        </div>
        <div className="col-xl-4">
          <Transaction />
        </div>
      </div>
    </>
  );
}