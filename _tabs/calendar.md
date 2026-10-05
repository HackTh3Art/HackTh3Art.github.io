---
layout: page
title: Calendar
icon: fas fa-calendar
order: 5
---

<div style="margin-bottom: 1rem;">
  <a href="/calendar.ics" class="btn btn-primary" target="_blank">
    <i class="fas fa-calendar-plus"></i> Subscribe to Calendar
  </a>
</div>

<div id="calendar"></div>

<!-- Event Details Modal -->
<div id="event-modal" class="modal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 1000; justify-content: center; align-items: center;">
  <div class="modal-content" style="background: var(--card-bg, white); padding: 1.5rem; border-radius: 8px; max-width: 500px; width: 90%; max-height: 80vh; overflow-y: auto; position: relative;">
    <span id="modal-close" style="position: absolute; top: 10px; right: 15px; cursor: pointer; font-size: 1.5rem;">&times;</span>
    <h3 id="modal-title" style="margin-top: 0;"></h3>
    <div id="modal-body"></div>
    <div id="modal-actions" style="margin-top: 1rem; display: flex; gap: 0.5rem; flex-wrap: wrap;"></div>
  </div>
</div>

<link href="https://cdn.jsdelivr.net/npm/fullcalendar@5.11.5/main.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/fullcalendar@5.11.5/main.min.js"></script>

<script>
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

const calendarEl = document.getElementById("calendar");

const calendar = new FullCalendar.Calendar(calendarEl, {
  initialView: "dayGridMonth",

  header: {
    left: "prev,next today",
    center: "title",
    right: "dayGridMonth,timeGridWeek,listWeek"
  },

  events: events,

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
</script>