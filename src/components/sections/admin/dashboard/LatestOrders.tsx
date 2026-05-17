"use client";

import React from "react";
import type { Order, OrderStatus } from "@/types/dashboard";

interface LatestOrdersProps {
  orders: Order[];
}

/** Mapping statut -> classes Bootstrap pour le badge */
const STATUS_VARIANT: Record<OrderStatus, string> = {
  "On Way": "bg-warning-subtle text-warning border-warning",
  Waiting: "bg-primary-subtle text-primary border-primary",
  Pending: "bg-danger-subtle text-danger border-danger",
  Delivered: "bg-success-subtle text-success border-success",
  Canceled: "bg-secondary-subtle text-secondary border-secondary",
};

const FILTER_OPTIONS = [
  "Weekly",
  "In Transit",
  "Delivered",
  "Pending",
  "Delayed",
  "Canceled",
];

export default function LatestOrders({ orders }: LatestOrdersProps) {
  return (
    <div className="row">
      <div className="col-12">
        <div className="card">
          <div className="card-header">
            <h4>Latest Order</h4>
            <div className="d-flex gap-3 align-items-center">
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
                  Weekly
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
                    <th>Customer ID</th>
                    <th>Email</th>
                    <th>Product</th>
                    <th>Status</th>
                    <th>Tracking</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
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
                              <a className="dropdown-item" href="#">
                                Edit
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                View
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                Track
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
          </div>
        </div>
      </div>
    </div>
  );
}