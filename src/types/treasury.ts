export type TreasuryTransactionType = "Entrée" | "Dépense";

export interface TreasuryStatItem {
  icon: string;
  value: string;
  label: string;
  caption?: string;
  captionHighlight?: string;
  highlightColor?: "success" | "danger" | "primary" | "warning";
  trend?: "up" | "down" | "none";
}

export interface TreasuryTransaction {
  id: string;
  date: string;
  type: TreasuryTransactionType;
  nom: string;
  role: string;
  contact: string;
  objectif: string;
  montant: number;
  /** Solde total des finances après cette transaction */
  soldeApres: number;
}
