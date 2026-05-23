export type MemberType = "Membre" | "Bureau" | "Partenaire" | "Visiteur";

export type MemberStatus = "Actif" | "Inactif";

export interface Member {
  id: string;
  nom: string;
  contact: string;
  type: MemberType;
  status: MemberStatus;
  date: string;
  avatarUrl?: string;
}
