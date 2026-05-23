import TreasuryStatsRow from "@/components/sections/admin/treasury/TreasuryStatsRow";
import TreasuryTransactionTable from "@/components/sections/admin/treasury/TreasuryTransactionTable";
import {
  TREASURY_STATS,
  TREASURY_TRANSACTIONS,
} from "@/components/sections/admin/treasury/mockData";

export const metadata = {
  title: "Trésorerie | CIE Admin",
  description: "Suivi de la caisse, des entrées et des dépenses du club",
};

export default function TreasuryPage() {
  return (
    <>
      <TreasuryStatsRow stats={TREASURY_STATS} />

      <TreasuryTransactionTable transactions={TREASURY_TRANSACTIONS} />
    </>
  );
}
