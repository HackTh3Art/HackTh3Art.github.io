---
layout: page
title: Calendar
icon: fas fa-calendar
order: 5
---

<style>
/* Mobile-friendly modal */
#event-modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  z-index: 1000;
  justify-content: center;
  align-items: flex-end;
  padding: 0;
}

#event-modal .modal-content {
  background: var(--card-bg, white);
  padding: 1.5rem;
  border-radius: 16px 16px 0 0;
  width: 100%;
  max-width: 100%;
  max-height: 85vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 -4px 20px rgba(0,0,0,0.15);
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from { transform: translateY(100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

#event-modal #modal-close {
  position: absolute;
  top: 12px;
  right: 16px;
  cursor: pointer;
  font-size: 1.5rem;
  color: var(--secondary-text, #666);
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background 0.2s;
}

#event-modal #modal-close:hover {
  background: var(--hover-bg, #f0f0f0);
}

#event-modal #modal-title {
  margin: 0 0 1rem;
  font-size: 1.25rem;
  line-height: 1.4;
}

#event-modal #modal-body p {
  margin: 0.75rem 0;
  line-height: 1.6;
}

#event-modal #modal-body strong {
  display: inline-block;
  min-width: 100px;
  color: var(--primary-text, #333);
}

#event-modal #modal-actions {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

#event-modal #modal-actions .btn {
  width: 100%;
  justify-content: center;
  padding: 0.875rem 1rem;
  font-size: 1rem;
  border-radius: 10px;
}

/* Desktop modal overrides */
@media (min-width: 640px) {
  #event-modal {
    align-items: center;
  }
  
  #event-modal .modal-content {
    border-radius: 12px;
    max-width: 500px;
    max-height: 80vh;
  }
  
  #event-modal #modal-actions {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-end;
  }
  
  #event-modal #modal-actions .btn {
    width: auto;
    min-width: 140px;
  }
}

/* Mobile calendar tweaks */
@media (max-width: 639px) {
  #calendar {
    font-size: 0.85rem;
  }
  
  .fc-header-toolbar {
    flex-wrap: wrap !important;
    gap: 0.5rem !important;
  }
  
  .fc-header-toolbar .fc-toolbar-chunk {
    flex: 1 1 auto !important;
  }
  
  .fc-button {
    padding: 0.4rem 0.6rem !important;
    font-size: 0.8rem !important;
  }
  
  .fc-daygrid-event {
    font-size: 0.75rem !important;
    padding: 1px 4px !important;
  }
  
  .fc-timegrid-event {
    font-size: 0.75rem !important;
  }
  
  .fc-list-event {
    font-size: 0.85rem !important;
  }
}

/* Touch-friendly event dots */
.fc-daygrid-event-dot {
  width: 8px !important;
  height: 8px !important;
}

/* Better tap targets */
.fc-button {
  min-height: 40px;
  min-width: 40px;
}
</style>

<div style="margin-bottom: 1rem;">
  <a href="/calendar.ics" class="btn btn-primary" target="_blank">
    <i class="fas fa-calendar-plus"></i> Subscribe to Calendar
  </a>
</div>

<div id="calendar"></div>

<!-- Event Details Modal -->
<div id="event-modal" class="modal">
  <div class="modal-content">
    <span id="modal-close" aria-label="Close">&times;</span>
    <h3 id="modal-title"></h3>
    <div id="modal-body"></div>
    <div id="modal-actions"></div>
  </div>
</div>

<link href="https://cdn.jsdelivr.net/npm/fullcalendar@5.11.5/main.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/fullcalendar@5.11.5/main.min.js"></script>

<script>
document.addEventListener('DOMContentLoaded', function() {
  initCalendar();
});

function initCalendar() {
  const calendarEl = document.getElementById("calendar");
  if (!calendarEl) {
    console.error('Calendar element not found');
    return;
  }

  if (typeof FullCalendar === 'undefined') {
    console.error('FullCalendar not loaded');
    calendarEl.innerHTML = '<p style="color: red; padding: 1rem;">Calendar library failed to load.</p>';
    return;
  }

  const events = [
    {% for event in site.data.events %}
    {
      id: {{ event.id | jsonify }},
      title: {{ event.title | jsonify }},
      start: {{ event.start | jsonify }},
      end: {{ event.end | jsonify }},
      location: {{ event.location | jsonify }},
      description: {{ event.description | jsonify }},
      startUtc: {{ event.start_utc | jsonify }},
      endUtc: {{ event.end_utc | jsonify }}
    }{% unless forloop.last %},{% endunless %}
    {% endfor %}
  ];

  function escapeICS(text) {
    return String(text || "")
      .replace(/\\/g, "\\\\")
      .replace(/;/g, "\\;")
      .replace(/,/g, "\\,")
      .replace(/\r?\n/g, "\\n");
  }

  function formatDateTime(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  function makeICS(event) {
    return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//HackTheArt//Calendar//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:${escapeICS(event.id)}@hacktheart.ro
DTSTAMP:${formatUTC(new Date())}
DTSTART:${event.startUtc}
DTEND:${event.endUtc}
SUMMARY:${escapeICS(event.title)}
DESCRIPTION:${escapeICS(event.description)}
LOCATION:${escapeICS(event.location)}
URL:https://hacktheart.ro/calendar
END:VEVENT
END:VCALENDAR`;
  }

  function formatUTC(date) {
    const pad = n => String(n).padStart(2, "0");

    return (
      date.getUTCFullYear() +
      pad(date.getUTCMonth() + 1) +
      pad(date.getUTCDate()) +
      "T" +
      pad(date.getUTCHours()) +
      pad(date.getUTCMinutes()) +
      pad(date.getUTCSeconds()) +
      "Z"
    );
  }

  function downloadICS(event) {
    const blob = new Blob(
      [makeICS(event)],
      { type: "text/calendar;charset=utf-8" }
    );

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = `${event.id}.ics`;

    document.body.appendChild(a);
    a.click();
    a.remove();

    URL.revokeObjectURL(url);
  }

  function googleCalendarURL(event) {
    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: event.title,
      dates: `${event.startUtc}/${event.endUtc}`,
      details: event.description,
      location: event.location
    });

    return `https://calendar.google.com/calendar/render?${params}`;
  }

  function openEventModal(event) {
    const modal = document.getElementById('event-modal');
    const titleEl = document.getElementById('modal-title');
    const bodyEl = document.getElementById('modal-body');
    const actionsEl = document.getElementById('modal-actions');

    titleEl.textContent = event.title;
    
    bodyEl.innerHTML = `
      <p><strong>Date & Time:</strong> ${formatDateTime(event.start)} - ${formatDateTime(event.end)}</p>
      <p><strong>Location:</strong> ${event.location || 'TBD'}</p>
      <p><strong>Description:</strong> ${event.description || 'No description available.'}</p>
    `;

    actionsEl.innerHTML = `
      <button class="btn btn-primary" onclick="downloadICS({id: '${event.id}', title: '${event.title.replace(/'/g, "\\'")}', description: '${event.description.replace(/'/g, "\\'")}', location: '${event.location.replace(/'/g, "\\'")}', startUtc: '${event.startUtc}', endUtc: '${event.endUtc}'}); closeModal();">
        <i class="fas fa-download"></i> Download .ics
      </button>
      <button class="btn btn-secondary" onclick="window.open('${googleCalendarURL(event)}', '_blank'); closeModal();">
        <i class="fab fa-google"></i> Add to Google Calendar
      </button>
      <button class="btn btn-outline" onclick="closeModal()">
        Close
      </button>
    `;

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    document.getElementById('event-modal').style.display = 'none';
    document.body.style.overflow = '';
  }

  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('event-modal').addEventListener('click', function(e) {
    if (e.target === this) closeModal();
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeModal();
  });

  const isMobile = window.innerWidth < 640;

  try {
    const calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: isMobile ? "listWeek" : "dayGridMonth",

      header: {
        left: "prev,next today",
        center: "title",
        right: isMobile ? "listWeek,dayGridMonth" : "dayGridMonth,timeGridWeek,listWeek"
      },

      height: isMobile ? "auto" : undefined,
      contentHeight: isMobile ? "auto" : undefined,

      events: events,

      // v5 compatible time format
      eventTimeFormat: {
        hour: '2-digit',
        minute: '2-digit',
        meridiem: 'short'
      },

      // Better touch handling
      selectable: false,
      eventClick: function(info) {
        info.jsEvent.preventDefault();

        const event = {
          id: info.event.id,
          title: info.event.title,
          start: info.event.start,
          end: info.event.end,
          location: info.event.extendedProps.location,
          description: info.event.extendedProps.description,
          startUtc: info.event.extendedProps.startUtc,
          endUtc: info.event.extendedProps.endUtc
        };

        openEventModal(event);
      }
    });

    calendar.render();
    console.log('FullCalendar rendered successfully');
  } catch (err) {
    console.error('FullCalendar error:', err);
    calendarEl.innerHTML = '<p style="color: red; padding: 1rem;">Calendar failed to load. Check console for details.</p>';
  }
}
</script>