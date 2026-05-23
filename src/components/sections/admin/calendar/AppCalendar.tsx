"use client";

import { useCallback, useEffect, useState } from "react";
type CalendarWindow = Window & {
  initCieAppsCalendar?: () => void;
  destroyCieAppsCalendar?: () => void;
  getCieCalendarEvents?: () => RawCalEvent[];
  FullCalendar?: unknown;
};

type RawCalEvent = {
  id: string;
  title: string;
  start: Date | null;
  end: Date | null;
  classNames: string[];
  extendedProps: { label?: string; description?: string };
};

type CalEvent = {
  id: string;
  title: string;
  start: Date;
  end: Date | null;
  label: string;
};

const LABEL_CONFIG: Record<string, { bg: string; text: string; icon: string }> = {
  Formation: { bg: "bg-success-subtle", text: "text-success", icon: "ri-presentation-line" },
  Conférence: { bg: "bg-primary-subtle", text: "text-primary", icon: "ri-mic-line" },
  Projet: { bg: "bg-warning-subtle", text: "text-warning", icon: "ri-folder-chart-line" },
  Meeting: { bg: "bg-danger-subtle", text: "text-danger", icon: "ri-video-on-fill" },
  "Sick Leave": { bg: "bg-info-subtle", text: "text-info", icon: "ri-heart-pulse-line" },
};

function formatDate(date: Date): string {
  return date.toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
}

const scriptPromises = new Map<string, Promise<void>>();

function loadScriptOnce(src: string): Promise<void> {
  const cached = scriptPromises.get(src);
  if (cached) return cached;
  const p = new Promise<void>((resolve, reject) => {
    const s = document.createElement("script");
    s.src = src;
    s.async = false;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.body.appendChild(s);
  });
  scriptPromises.set(src, p);
  return p;
}

function waitForGlobal(name: "FullCalendar", timeoutMs = 5000): Promise<void> {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const tick = () => {
      if ((window as unknown as Record<string, unknown>)[name] !== undefined) {
        resolve();
        return;
      }
      if (Date.now() - start > timeoutMs) {
        reject(new Error(`${name} global not available`));
        return;
      }
      window.setTimeout(tick, 30);
    };
    tick();
  });
}

export default function AppCalendar() {
  const [upcomingEvents, setUpcomingEvents] = useState<CalEvent[]>([]);
  const [pastEvents, setPastEvents] = useState<CalEvent[]>([]);

  const syncEvents = useCallback(() => {
    const raw = (window as CalendarWindow).getCieCalendarEvents?.() ?? [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcoming: CalEvent[] = [];
    const past: CalEvent[] = [];

    raw.forEach((ev) => {
      if (!ev.start) return;
      const start = new Date(ev.start);
      const item: CalEvent = {
        id: ev.id,
        title: ev.title,
        start,
        end: ev.end ? new Date(ev.end) : null,
        label: ev.extendedProps?.label ?? "",
      };
      if (start >= today) {
        upcoming.push(item);
      } else {
        past.push(item);
      }
    });

    upcoming.sort((a, b) => a.start.getTime() - b.start.getTime());
    past.sort((a, b) => b.start.getTime() - a.start.getTime());

    setUpcomingEvents(upcoming);
    setPastEvents(past);
  }, []);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      try {
        await loadScriptOnce("/assets/libs/fullcalendar/index.global.min.js");
        if (cancelled) return;
        await waitForGlobal("FullCalendar");
        if (cancelled) return;
        loadScriptOnce(
          "https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.all.min.js",
        ).catch(() => undefined);
        // Recharge systématiquement l'init pour capter getCieCalendarEvents
        scriptPromises.delete("/assets/js/app/apps-calendar.init.js");
        await loadScriptOnce("/assets/js/app/apps-calendar.init.js");
        if (cancelled) return;
        (window as CalendarWindow).initCieAppsCalendar?.();
        syncEvents();
      } catch (e) {
        console.error("[AppCalendar] init failed", e);
      }
    })();

    const handleChange = () => syncEvents();
    window.addEventListener("cieCalendarEventsChanged", handleChange);

    return () => {
      cancelled = true;
      (window as CalendarWindow).destroyCieAppsCalendar?.();
      window.removeEventListener("cieCalendarEventsChanged", handleChange);
    };
  }, [syncEvents]);

  return (
    <>
      <div className="row position-relative z-1">
        <div className="col-xl-9">
          <div className="card">
            <div className="card-body">
              <div id="calendar" style={{ minHeight: 600 }} />
            </div>
          </div>
        </div>
        <div className="col-xl-3">
          {/* Bouton créer + événements draggables */}
          <div className="card">
            <div className="p-5 pb-0">
              <div>
                <button
                  type="button"
                  className="btn btn-primary w-100"
                  data-bs-target="#exampleModalToggle"
                  data-bs-toggle="modal"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="d-inline-block align-middle me-1"
                    aria-hidden
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  Créer un événement
                </button>
                <div id="external-events-container">
                  <div
                    className="external-event bg-success-subtle border-2 border-start border-success text-success py-2 my-1"
                    data-class="bg-success-subtle"
                    data-title="Formation"
                    data-description="Session de formation"
                  >
                    <i className="mdi mdi-checkbox-blank-circle me-2" /> Formation
                  </div>
                  <div
                    className="external-event bg-primary-subtle border-2 border-start border-primary text-primary py-2 my-1"
                    data-class="bg-primary-subtle"
                    data-title="Conférence"
                    data-description="Conférence ou réunion publique"
                  >
                    <i className="mdi mdi-checkbox-blank-circle me-2" /> Conférence
                  </div>
                  <div
                    className="external-event bg-warning-subtle border-2 border-start border-warning text-warning py-2 my-1"
                    data-class="bg-warning-subtle"
                    data-title="Projet"
                    data-description="Échéance ou jalon de projet"
                  >
                    <i className="mdi mdi-checkbox-blank-circle me-2" /> Projet
                  </div>
                  <div
                    className="external-event bg-danger-subtle border-2 border-start border-danger text-danger py-2 my-1"
                    data-class="bg-danger-subtle"
                    data-title="Meeting"
                    data-description="Réunion interne"
                  >
                    <i className="mdi mdi-checkbox-blank-circle me-2" /> Meeting
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Événements en cours et à venir */}
          <div className="card">
            <div className="card-header">
              <h4>Événements à venir</h4>
            </div>
            <div className="card-body p-0" data-simplebar style={{ height: 280 }}>
              <ul className="list-unstyled mb-0 px-3 pt-2">
                {upcomingEvents.length === 0 ? (
                  <li className="text-center text-muted py-3 fs-12">
                    Aucun événement à venir
                  </li>
                ) : (
                  upcomingEvents.map((ev, i) => {
                    const cfg = LABEL_CONFIG[ev.label] ?? {
                      bg: "bg-secondary-subtle",
                      text: "text-secondary",
                      icon: "ri-calendar-line",
                    };
                    return (
                      <li key={ev.id}>
                        {i > 0 && <hr className="my-2" />}
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h6 className="mb-0">{ev.title}</h6>
                            <span className="fs-12">{formatDate(ev.start)}</span>
                          </div>
                          <div>
                            <span className={`badge ${cfg.bg} rounded-4 ${cfg.text}`}>
                              <i className={cfg.icon} /> {ev.label}
                            </span>
                          </div>
                        </div>
                      </li>
                    );
                  })
                )}
              </ul>
            </div>
          </div>

          {/* Événements passés */}
          <div className="card">
            <div className="card-header">
              <h4>Événements passés</h4>
            </div>
            <div className="card-body p-0" data-simplebar style={{ height: 280 }}>
              <ul className="list-unstyled mb-0 px-3 pt-2">
                {pastEvents.length === 0 ? (
                  <li className="text-center text-muted py-3 fs-12">
                    Aucun événement passé
                  </li>
                ) : (
                  pastEvents.map((ev, i) => {
                    const cfg = LABEL_CONFIG[ev.label] ?? {
                      bg: "bg-secondary-subtle",
                      text: "text-secondary",
                      icon: "ri-calendar-line",
                    };
                    return (
                      <li key={ev.id}>
                        {i > 0 && <hr className="my-2" />}
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h6 className="mb-0">{ev.title}</h6>
                            <span className="fs-12">{formatDate(ev.start)}</span>
                          </div>
                          <div>
                            <span className={`badge ${cfg.bg} rounded-4 ${cfg.text}`}>
                              <i className={cfg.icon} /> {ev.label}
                            </span>
                          </div>
                        </div>
                      </li>
                    );
                  })
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Modal — Ajouter / modifier un événement */}
      <div
        className="modal fade"
        id="exampleModalToggle"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabIndex={-1}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0">
            <div className="modal-header p-3">
              <h5 className="modal-title">Ajouter un événement</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Fermer"
              />
            </div>
            <div className="modal-body p-4">
              <form className="needs-validation" name="event-form" id="form-event">
                <input type="hidden" id="calendar-event-id" />
                <label htmlFor="calendar-event-title" className="mb-2">
                  Titre :
                </label>
                <input
                  type="text"
                  placeholder="Titre de l'événement"
                  className="form-control moving-placeholder"
                  id="calendar-event-title"
                  required
                />
                <div className="text-danger mt-2" id="titleErr" />
                <label className="mb-2" htmlFor="form-select-01">
                  Libellé :
                </label>
                <select
                  className="form-select mb-2"
                  id="form-select-01"
                  name="form-select-01"
                  aria-label="Choisir un libellé"
                  defaultValue=""
                >
                  <option value="">Ouvrir le menu</option>
                  <option value="bg-danger-subtle">Danger</option>
                  <option value="bg-warning-subtle">Warning</option>
                  <option value="bg-primary-subtle">Primary</option>
                  <option value="bg-success-subtle">Success</option>
                </select>
                <div className="col-12 mb-2">
                  <label htmlFor="calendar-event-date-start" className="form-label">
                    Du :
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="calendar-event-date-start"
                  />
                </div>
                <div className="col-12 mb-2">
                  <label htmlFor="calendar-event-date-end" className="form-label">
                    Au :
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="calendar-event-date-end"
                  />
                </div>
                <div className="col-12">
                  <div className="mb-3">
                    <label className="form-label" htmlFor="description">
                      Description
                    </label>
                    <textarea
                      className="form-control d-block"
                      id="description"
                      placeholder="Description"
                      rows={3}
                      spellCheck={false}
                    />
                  </div>
                </div>
                <div className="hstack gap-2 justify-content-end">
                  <button type="submit" className="btn btn-primary">
                    Ajouter
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Modal — Détails d'un événement */}
      <div
        className="modal fade"
        id="eventDetailsModal"
        aria-hidden="true"
        aria-labelledby="eventDetailsModalLabel"
        tabIndex={-1}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0">
            <div className="modal-header p-3">
              <h5 className="modal-title" id="eventDetailsTitle">
                Détails
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Fermer"
              />
            </div>
            <div className="modal-body">
              <p id="eventDetailsTitleText" />
              <p id="eventDetailsLabel" />
              <p id="eventDetailsStart" />
              <p id="eventDetailsEnd" />
              <p id="eventDetailsDescription" />
            </div>
            <div className="modal-footer">
              <button type="button" id="editEventBtn" className="btn btn-primary">
                Modifier
              </button>
              <button type="button" id="deleteEventBtn" className="btn btn-danger">
                Supprimer
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
