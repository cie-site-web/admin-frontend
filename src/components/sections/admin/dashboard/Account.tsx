"use client";

import React, { useState } from "react";
import type { Order, OrderStatus } from "@/types/dashboard";

interface AccountProps {
  orders: Order[];
}

const STATUS_VARIANT: Record<OrderStatus, string> = {
  Actif: "bg-success-subtle text-success border-success",
  Inactif: "bg-secondary-subtle text-secondary border-secondary",
};

const FILTER_OPTIONS = ["Actuel bureau", "Ancien bureau"];
const PAGE_SIZE = 5;

export default function Account({ orders }: AccountProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(orders.length / PAGE_SIZE));
  const paginated = orders.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div className="row">
      <div className="col-12">
        <div className="card">
          <div className="card-header">
            <h4>Comptes Admin</h4>
            <div className="d-flex gap-3 align-items-center">
              <button type="button" className="btn btn-primary">
                <i className="ri-add-line me-1"></i>Ajouter
              </button>
              <div className="form-icon">
                <input
                  type="text"
                  className="form-control form-control-icon"
                  placeholder="Search Here ..."
                />
                <i className="ri-search-2-line text-muted"></i>
              </div>
              <div className="btn-group">
                <button
                  className="btn btn-outline-primary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Filtre
                </button>
                <div className="dropdown-menu dropdown-menu-start">
                  {FILTER_OPTIONS.map((opt) => (
                    <a key={opt} className="dropdown-item" href="#">
                      {opt}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="table-box table-responsive">
              <table className="table table-hover text-nowrap">
                <thead className="table-light border-0">
                  <tr>
                    <th>Poste</th>
                    <th>Telephone</th>
                    <th>Classe</th>
                    <th>Statut</th>
                    <th>Annee</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((order) => (
                    <tr key={order.id}>
                      <td>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultChecked={order.checked}
                          />
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={order.avatarUrl}
                            className="avatar-sm rounded-2 mx-2"
                            alt="Avatar"
                          />
                          {order.id}
                        </div>
                      </td>
                      <td>{order.email}</td>
                      <td>{order.product}</td>
                      <td>
                        <span
                          className={`badge py-1 rounded-3 border ${STATUS_VARIANT[order.status]}`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td>{order.tracking}</td>
                      <td>
                        <div className="dropdown dropdown-menu-end">
                          <button
                            className="btn p-0"
                            type="button"
                            data-bs-toggle="dropdown"
                          >
                            <i className="bi bi-three-dots"></i>
                          </button>
                          <ul className="dropdown-menu">
                            <li>
                              <a className="dropdown-item" href="#">Edit</a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">View</a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">Changer status</a>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="d-flex justify-content-between align-items-center mt-3">
              <span className="text-muted fs-13">
                {orders.length === 0
                  ? "Aucun résultat"
                  : `${(currentPage - 1) * PAGE_SIZE + 1}–${Math.min(currentPage * PAGE_SIZE, orders.length)} sur ${orders.length}`}
              </span>
              <nav>
                <ul className="pagination pagination-sm mb-0">
                  <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage((p) => p - 1)}
                      disabled={currentPage === 1}
                    >
                      <i className="ri-arrow-left-s-line"></i>
                    </button>
                  </li>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <li key={page} className={`page-item ${page === currentPage ? "active" : ""}`}>
                      <button className="page-link" onClick={() => setCurrentPage(page)}>
                        {page}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                    <button
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
