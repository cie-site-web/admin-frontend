/*
 * FullCalendar + modals (thème Admin-html), adapté pour Next.js :
 * — init / destroy exposés sur window
 * — getCieCalendarEvents() expose les événements courants
 * — cieCalendarEventsChanged dispatché à chaque ajout / modif / suppression
 */
(function () {
  var calendarInstance = null;
  var draggableInstance = null;
  var formSubmitHandler = null;

  function fireEventsChanged() {
    window.dispatchEvent(new CustomEvent("cieCalendarEventsChanged"));
  }

  function destroyCieAppsCalendar() {
    if (calendarInstance) {
      calendarInstance.destroy();
      calendarInstance = null;
    }
    if (draggableInstance && typeof draggableInstance.destroy === "function") {
      draggableInstance.destroy();
      draggableInstance = null;
    }
    var form = document.getElementById("form-event");
    if (form && formSubmitHandler) {
      form.removeEventListener("submit", formSubmitHandler);
      formSubmitHandler = null;
    }
  }

  function getCieCalendarEvents() {
    return calendarInstance ? calendarInstance.getEvents() : [];
  }

  function initCieAppsCalendar() {
    destroyCieAppsCalendar();

    var today = new Date();
    var y = today.getFullYear();
    var m = today.getMonth();
    var d = today.getDate();

    var calendarEl = document.getElementById("calendar");
    if (!calendarEl || typeof FullCalendar === "undefined") {
      return;
    }

    var eventTitleInput = document.getElementById("calendar-event-title");
    var eventStartDateInput = document.getElementById("calendar-event-date-start");
    var eventEndDateInput = document.getElementById("calendar-event-date-end");
    var eventDescriptionInput = document.getElementById("description");
    var eventIdInput = document.getElementById("calendar-event-id");

    var events = [
      { id: "1", title: "World Braille Day", start: "2024-10-01", className: "bg-success-subtle", allDay: true, extendedProps: { label: "Formation", description: "Celebrating the importance of Braille." } },
      { id: "2", title: "World Leprosy Day", start: "2024-10-22", className: "bg-danger-subtle", allDay: true, extendedProps: { label: "Meeting", description: "Raising awareness about leprosy." } },
      { id: "3", title: "All Day Event", start: new Date(y, m, 1), className: "bg-danger-subtle", allDay: true, extendedProps: { label: "Meeting", description: "General all-day event." } },
      { id: "4", title: "Birthday Party", start: new Date(y, m, d + 1), className: "bg-primary-subtle", allDay: true, extendedProps: { label: "Conférence", description: "Celebrating a friend's birthday." } },
      { id: "5", title: "Repeating Event", start: new Date(y, m, d + 4), end: new Date(y, m, d + 9), className: "bg-warning-subtle", allDay: true, extendedProps: { label: "Projet", description: "A repeating event over multiple days." } },
      { id: "6", title: "Weekend Trip", start: new Date(y, m, d + 15), className: "bg-success-subtle", allDay: true, extendedProps: { label: "Formation", description: "Weekend trip to relax and enjoy nature." } },
      { id: "7", title: "Medical Leave", start: new Date(y, m, d - 2), className: "bg-info-subtle", allDay: true, extendedProps: { label: "Sick Leave", description: "Medical leave due to illness." } },
      { id: "8", title: "Company Annual Meeting", start: new Date(y, m, d + 10), className: "bg-danger-subtle", allDay: true, extendedProps: { label: "Meeting", description: "Annual company-wide meeting." } },
      { id: "9", title: "Project Deadline", start: new Date(y, m, d + 18), className: "bg-warning-subtle", allDay: true, extendedProps: { label: "Projet", description: "Final submission deadline for project." } },
      { id: "15", title: "National Holiday", start: new Date(y, m, d + 20), className: "bg-success-subtle", allDay: true, extendedProps: { label: "Formation", description: "Public national holiday." } },
      { id: "16", title: "Training Session", start: new Date(y, m, d + 11), className: "bg-danger-subtle", allDay: true, extendedProps: { label: "Meeting", description: "Employee training and skill development." } },
      { id: "17", title: "Financial Report Submission", start: new Date(y, m, d + 9), className: "bg-warning-subtle", allDay: true, extendedProps: { label: "Projet", description: "Deadline for financial report submission." } },
      { id: "18", title: "Kids' Sports Day", start: new Date(y, m, d + 6), className: "bg-primary-subtle", allDay: true, extendedProps: { label: "Conférence", description: "A fun sports event for kids." } },
      { id: "19", title: "Camping Trip", start: new Date(y, m, d + 14), className: "bg-success-subtle", allDay: true, extendedProps: { label: "Formation", description: "Outdoor camping with friends and family." } },
      { id: "20", title: "Health Checkup", start: new Date(y, m, d - 1), className: "bg-info-subtle", allDay: true, extendedProps: { label: "Sick Leave", description: "Routine health checkup." } },
    ];

    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: "dayGridMonth",
      selectable: true,
      editable: true,
      droppable: true,
      events: events,
      eventReceive: function () {
        fireEventsChanged();
      },
      eventClick: function (info) {
        var event = info.event;

        var titleEl = document.getElementById("eventDetailsTitleText");
        var labelEl = document.getElementById("eventDetailsLabel");
        var startEl = document.getElementById("eventDetailsStart");
        var endEl = document.getElementById("eventDetailsEnd");
        var descEl = document.getElementById("eventDetailsDescription");

        if (titleEl) titleEl.innerText = event.title || "No Title";
        if (labelEl) labelEl.innerText = event.extendedProps.label || "No Label";
        if (startEl) startEl.innerText = event.start ? event.start.toISOString().split("T")[0] : "N/A";
        if (endEl) endEl.innerText = event.end ? event.end.toISOString().split("T")[0] : "N/A";
        if (descEl) descEl.innerText = event.extendedProps.description || "No Description";

        if (eventIdInput) eventIdInput.value = event.id || "";

        var detailsModal = new bootstrap.Modal(document.getElementById("eventDetailsModal"));
        detailsModal.show();

        document.getElementById("deleteEventBtn").onclick = function () {
          var hideAndRemove = function () {
            event.remove();
            fireEventsChanged();
            var eventModalEl = document.getElementById("eventDetailsModal");
            var eventModal = bootstrap.Modal.getInstance(eventModalEl);
            if (eventModal) eventModal.hide();
          };

          if (typeof Swal !== "undefined") {
            Swal.fire({
              title: "Êtes-vous sûr ?",
              text: "Cette action est irréversible.",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#d33",
              cancelButtonColor: "#3085d6",
              confirmButtonText: "Oui, supprimer",
              cancelButtonText: "Annuler",
            }).then(function (result) {
              if (result.isConfirmed) {
                hideAndRemove();
                Swal.fire("Supprimé !", "L'événement a été supprimé.", "success");
              }
            });
          } else if (window.confirm("Supprimer cet événement ?")) {
            hideAndRemove();
          }
        };

        document.getElementById("editEventBtn").onclick = function () {
          var detailsModalEl = document.getElementById("eventDetailsModal");
          var detailsModal = bootstrap.Modal.getInstance(detailsModalEl);
          detailsModal.hide();

          var titleInput = document.getElementById("calendar-event-title");
          var labelInput = document.getElementById("form-select-01");
          var startInput = document.getElementById("calendar-event-date-start");
          var endInput = document.getElementById("calendar-event-date-end");
          var descInput = document.getElementById("description");

          if (titleInput) titleInput.value = event.title || "";
          if (labelInput) labelInput.value = event.extendedProps.label || "";
          if (startInput) startInput.value = event.start ? event.start.toISOString().split("T")[0] : "";
          if (endInput) endInput.value = event.end ? event.end.toISOString().split("T")[0] : "";
          if (descInput) descInput.value = event.extendedProps.description || "";

          var editModal = new bootstrap.Modal(document.getElementById("exampleModalToggle"));
          editModal.show();
        };
      },

      dateClick: function (info) {
        if (eventStartDateInput) eventStartDateInput.value = info.dateStr;
        if (eventEndDateInput) eventEndDateInput.value = info.dateStr;
        if (eventTitleInput) eventTitleInput.value = "";
        if (eventDescriptionInput) eventDescriptionInput.value = "";
        if (eventIdInput) eventIdInput.value = "";
        var modal = new bootstrap.Modal(document.getElementById("exampleModalToggle"));
        modal.show();
      },
    });

    calendar.render();
    calendarInstance = calendar;
    fireEventsChanged();

    window.setTimeout(function () {
      if (calendarInstance === calendar) {
        try {
          calendar.updateSize();
        } catch (e) {
          /* noop */
        }
      }
    }, 50);

    var form = document.getElementById("form-event");
    if (form) {
      formSubmitHandler = function (e) {
        e.preventDefault();

        var eventId = eventIdInput ? eventIdInput.value : "";
        var title = eventTitleInput ? eventTitleInput.value : "";
        var start = eventStartDateInput ? eventStartDateInput.value : "";
        var end = (eventEndDateInput && eventEndDateInput.value) || start;
        var description = eventDescriptionInput ? eventDescriptionInput.value : "";
        var labelSelect = document.getElementById("form-select-01");
        var label = labelSelect && labelSelect.selectedOptions[0] ? labelSelect.selectedOptions[0].text : "";

        if (!title.trim()) {
          var titleErr = document.getElementById("titleErr");
          if (titleErr) titleErr.innerText = "Event title is required!";
          return;
        } else {
          var titleErr2 = document.getElementById("titleErr");
          if (titleErr2) titleErr2.innerText = "";
        }

        start = new Date(start + "T00:00:00");
        end = new Date(end + "T23:59:59");
        var existing = calendar.getEventById(eventId);
        if (existing) {
          existing.setProp("title", title);
          existing.setStart(start);
          existing.setEnd(end);
          existing.setExtendedProp("description", description);
          existing.setExtendedProp("label", label);
        } else {
          calendar.addEvent({
            title: title,
            start: start,
            end: end,
            allDay: true,
            className: "bg-info-subtle",
            extendedProps: {
              label: label,
              description: description,
            },
          });
        }

        fireEventsChanged();

        form.reset();
        var modalElement = document.getElementById("exampleModalToggle");
        var modalInstance = bootstrap.Modal.getInstance(modalElement);
        if (modalInstance) modalInstance.hide();
      };
      form.addEventListener("submit", formSubmitHandler);
    }

    var externalEventsContainer = document.getElementById("external-events-container");
    if (externalEventsContainer && FullCalendar.Draggable) {
      draggableInstance = new FullCalendar.Draggable(externalEventsContainer, {
        itemSelector: ".external-event",
        eventData: function (eventEl) {
          return {
            title: eventEl.getAttribute("data-title"),
            classNames: [eventEl.getAttribute("data-class")],
            allDay: true,
          };
        },
      });
    }
  }

  window.initCieAppsCalendar = initCieAppsCalendar;
  window.destroyCieAppsCalendar = destroyCieAppsCalendar;
  window.getCieCalendarEvents = getCieCalendarEvents;
})();
