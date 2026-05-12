"use client";

import React, { useState, useRef, useEffect } from "react";

interface DropdownFormProps {
  label?: string;
  onSubmit?: (data: { email: string; password: string; remember: boolean }) => void;
  className?: string;
}

export default function DropdownForm({
  label = "Forms",
  onSubmit,
  className = "",
}: DropdownFormProps) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({ email, password, remember });
    setOpen(false);
  };

  return (
    <div ref={ref} className={`btn-group${open ? " show" : ""} ${className}`.trim()}>
      <button
        type="button"
        className="btn btn-light dropdown-toggle"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {label}
      </button>

      <div className={`dropdown-menu p-4 min-w-200px${open ? " show" : ""}`}>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="form-label" htmlFor="dropdownFormEmail">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="dropdownFormEmail"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label className="form-label" htmlFor="dropdownFormPassword">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="dropdownFormPassword"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <div className="form-check form-check-sm custom-checkbox d-flex align-items-center gap-2 mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="dropdownRememberCheck"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="dropdownRememberCheck">
                Remember me
              </label>
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}