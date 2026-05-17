import Breadcrumb from "@/components/ui/breadcrumb/BreadCrumb";
import StatsRow from "@/components/sections/admin/dashboard/StatsRow";
import LatestOrders from "@/components/sections/admin/dashboard/LatestOrders";
import AverageOrderValue from "@/components/sections/admin/dashboard/AverageOrderValue";
import RecentSales from "@/components/sections/admin/dashboard/RecentSales";

import {
  STATS,
  ORDERS,
} from "@/components/sections/admin/dashboard/mockData";

export const metadata = {
  title: "Dashboard | Urbix Admin",
  description: "E-Commerce dashboard overview",
};

export default function DashboardPage() {
  return (
    <>
      <Breadcrumb
        title="E-Commerce"
        items={[{ label: "Dashboards", href: "#" }, { label: "Index" }]}
      />

      <StatsRow stats={STATS} />

      <LatestOrders orders={ORDERS} />

      <div className="row">
        <div className="col-xl-8">
          <AverageOrderValue />
        </div>
        <div className="col-xl-4">
          <RecentSales />
        </div>
      </div>
    </>
  );
}