"use client";

import { useState } from "react";
import { formatMontant, formatSolde } from "./mockData";
import type { TreasuryTransaction, TreasuryTransactionType } from "@/types/treasury";

interface TreasuryTransactionTableProps {
  transactions: TreasuryTransaction[];
}

const TYPE_VARIANT: Record<TreasuryTransactionType, string> = {
  Entrée: "bg-success-subtle text-success border-success",
  Dépense: "bg-danger-subtle text-danger border-danger",
};

const FILTER_OPTIONS = ["Toutes", "Entrées", "Dépenses"];
const PERIOD_OPTIONS = ["Ce mois", "Ce trimestre", "Cette année", "Tout"];
const PAGE_SIZE = 8;

export default function TreasuryTransactionTable({
  transactions,
}: TreasuryTransactionTableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(transactions.length / PAGE_SIZE));
  const paginated = transactions.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <div className="row position-relative z-1">
      <div className="col-12">
        <div className="card">
          <div className="card-header flex-wrap gap-3">
            <h4 className="mb-0">Journal des transactions</h4>
            <div className="d-flex flex-wrap gap-2 align-items-center">
              <button type="button" className="btn btn-primary btn-sm">
                <i className="ri-add-line me-1"></i>Nouvelle opération
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
                  {FILTER_OPTIONS.map((opt) => (
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
                  Période
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  {PERIOD_OPTIONS.map((opt) => (
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
              <table className="table table-hover align-middle treasury-transactions-table">
                <thead className="table-light border-0">
                  <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Nom</th>
                    <th>Rôle</th>
                    <th>Contact</th>
                    <th>Objectif</th>
                    <th className="text-end">Montant</th>
                    <th className="text-end">Caisse</th>
                    <th className="text-end"></th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((trx) => (
                    <tr key={trx.id}>
                      <td className="text-nowrap text-muted">{trx.date}</td>
                      <td>
                        <span
                          className={`badge py-1 rounded-3 border ${TYPE_VARIANT[trx.type]}`}
                        >
                          {trx.type}
                        </span>
                      </td>
                      <td className="fw-medium">{trx.nom}</td>
                      <td>{trx.role}</td>
                      <td className="text-muted">{trx.contact}</td>
                      <td className="treasury-objectif-cell">{trx.objectif}</td>
                      <td
                        className={`text-end fw-semibold text-nowrap ${
                          trx.montant >= 0 ? "text-success" : "text-danger"
                        }`}
                      >
                        {formatMontant(trx.montant)}
                      </td>
                      <td className="text-end fw-medium text-nowrap">
                        {formatSolde(trx.soldeApres)}
                      </td>
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
                                <i className="ri-eye-line me-2"></i>Détails
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                <i className="ri-file-download-line me-2"></i>Reçu
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
                {transactions.length === 0
                  ? "Aucune transaction"
                  : `${(currentPage - 1) * PAGE_SIZE + 1}–${Math.min(currentPage * PAGE_SIZE, transactions.length)} sur ${transactions.length}`}
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
