"use client";

import { useState } from "react";
import type { Member, MemberStatus, MemberType } from "@/types/member";

interface MemberTableProps {
  members: Member[];
}

const TYPE_CHIP_CLASS: Record<MemberType, string> = {
  Membre: "member-type-chip--membre",
  Bureau: "member-type-chip--bureau",
  Partenaire: "member-type-chip--partenaire",
  Visiteur: "member-type-chip--visiteur",
};

const STATUS_VARIANT: Record<MemberStatus, string> = {
  Actif: "bg-success-subtle text-success border-success",
  Inactif: "bg-secondary-subtle text-secondary border-secondary",
};

function MemberTypeChip({ label, type }: { label: string; type: MemberType }) {
  return (
    <span className={`member-type-chip ${TYPE_CHIP_CLASS[type]}`}>
      <i className="member-type-chip-icon ri-price-tag-3-line" aria-hidden></i>
      {label}
    </span>
  );
}

function MemberStatusBadge({ label, variant }: { label: string; variant: string }) {
  return (
    <span className={`badge py-1 rounded-3 border fw-medium member-status-badge ${variant}`}>
      {label}
    </span>
  );
}

const TYPE_FILTER_OPTIONS: Array<"Tous" | MemberType> = [
  "Tous",
  "Membre",
  "Bureau",
  "Partenaire",
  "Visiteur",
];

const STATUS_FILTER_OPTIONS: Array<"Tous" | MemberStatus> = ["Tous", "Actif", "Inactif"];

const PAGE_SIZE = 8;

export default function MemberTable({ members }: MemberTableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(members.length / PAGE_SIZE));
  const paginated = members.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <div className="row position-relative z-1">
      <div className="col-12">
        <div className="card">
          <div className="card-header flex-wrap gap-3">
            <h4 className="mb-0">Liste de membre & partenaire</h4>
            <div className="d-flex flex-wrap gap-2 align-items-center">
              <button type="button" className="btn btn-primary btn-sm">
                <i className="ri-add-line me-1"></i>Ajouter
              </button>
              <div className="form-icon">
                <input
                  type="text"
                  className="form-control form-control-sm form-control-icon"
                  placeholder="Rechercher..."
                />
                <i className="ri-search-2-line text-muted"></i>
              </div>
              <div className="btn-group">
                <button
                  className="btn btn-outline-primary btn-sm dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Type
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  {TYPE_FILTER_OPTIONS.map((opt) => (
                    <li key={opt}>
                      <a className="dropdown-item" href="#">
                        {opt}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="btn-group">
                <button
                  className="btn btn-outline-primary btn-sm dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Statut
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  {STATUS_FILTER_OPTIONS.map((opt) => (
                    <li key={opt}>
                      <a className="dropdown-item" href="#">
                        {opt}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="table-box table-responsive">
              <table className="table table-hover align-middle member-table">
                <thead className="table-light border-0">
                  <tr>
                    <th>Nom</th>
                    <th>Contact</th>
                    <th>Type</th>
                    <th>Statut</th>
                    <th>Date</th>
                    <th className="text-end"></th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((member) => (
                    <tr key={member.id}>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          {member.avatarUrl && (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img
                              src={member.avatarUrl}
                              className="avatar-sm rounded-2"
                              alt=""
                            />
                          )}
                          <span className="fw-medium">{member.nom}</span>
                        </div>
                      </td>
                      <td className="text-muted">{member.contact}</td>
                      <td>
                        <MemberTypeChip label={member.type} type={member.type} />
                      </td>
                      <td>
                        <MemberStatusBadge
                          label={member.status}
                          variant={STATUS_VARIANT[member.status]}
                        />
                      </td>
                      <td className="text-nowrap text-muted">{member.date}</td>
                      <td className="text-end">
                        <div className="dropdown">
                          <button
                            className="btn btn-light btn-sm"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            aria-label="Actions"
                          >
                            <i className="ri-more-2-fill"></i>
                          </button>
                          <ul className="dropdown-menu dropdown-menu-end">
                            <li>
                              <a className="dropdown-item" href="#">
                                <i className="ri-eye-line me-2"></i>Voir
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                <i className="ri-pencil-line me-2"></i>Modifier
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                <i className="ri-user-settings-line me-2"></i>Changer le statut
                              </a>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap gap-2">
              <span className="text-muted fs-13">
                {members.length === 0
                  ? "Aucun membre"
                  : `${(currentPage - 1) * PAGE_SIZE + 1}–${Math.min(currentPage * PAGE_SIZE, members.length)} sur ${members.length}`}
              </span>
              <nav>
                <ul className="pagination pagination-sm mb-0">
                  <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                    <button
                      type="button"
                      className="page-link"
                      onClick={() => setCurrentPage((p) => p - 1)}
                      disabled={currentPage === 1}
                    >
                      <i className="ri-arrow-left-s-line"></i>
                    </button>
                  </li>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <li
                      key={page}
                      className={`page-item ${page === currentPage ? "active" : ""}`}
                    >
                      <button
                        type="button"
                        className="page-link"
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </button>
                    </li>
                  ))}
                  <li
                    className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
                  >
                    <button
                      type="button"
                      className="page-link"
                      onClick={() => setCurrentPage((p) => p + 1)}
                      disabled={currentPage === totalPages}
                    >
                      <i className="ri-arrow-right-s-line"></i>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
