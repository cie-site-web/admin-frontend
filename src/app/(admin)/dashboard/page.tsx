import Breadcrumb from "@/components/ui/breadcrumb/Breadcrumb";
import StatsRow from "@/components/sections/admin/dashboard/StatsRow";
import LatestOrders from "@/components/sections/admin/dashboard/LatestOrders";
import AverageOrderValue from "@/components/sections/admin/dashboard/AverageOrderValue";
import RecentSales from "@/components/sections/admin/dashboard/RecentSales";
import ProductStatistics from "@/components/sections/admin/dashboard/ProductStatistics";
import CustomerGrowth from "@/components/sections/admin/dashboard/CustomerGrowth";
import LatestProduct from "@/components/sections/admin/dashboard/LatestProduct";

import {
  STATS,
  ORDERS,
  PRODUCT_CATEGORIES,
  COUNTRY_BUBBLES,
  COUNTRIES,
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

        <div className="col-xxl-4">
          <ProductStatistics
            total="9,829"
            totalLabel="Product Sales"
            totalChange="+5.34%"
            categories={PRODUCT_CATEGORIES}
          />
        </div>

        <div className="col-xxl-4 col-lg-6">
          <CustomerGrowth
            bubbles={COUNTRY_BUBBLES}
            countries={COUNTRIES}
          />
        </div>

        <div className="col-xxl-4 col-lg-6">
          <LatestProduct
            productCategory="Shoe"
            productName="Nike"
            productImage="/assets/images/dashboard/shoeses.png"
            bannerImage="/assets/images/dashboard/enhanced_image.png"
          />
        </div>
      </div>
    </>
  );
}