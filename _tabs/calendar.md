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

    const event = info.event.extendedProps;

    const choice = prompt(
      `Add "${info.event.title}" to your calendar:\n\n` +
      `1 = Download .ics\n` +
      `2 = Google Calendar`
    );

    if (choice === "1") {
      downloadICS({
        id: info.event.id,
        title: info.event.title,
        description: event.description,
        location: event.location,
        startUtc: event.startUtc,
        endUtc: event.endUtc
      });
    }

    if (choice === "2") {
      window.open(
        googleCalendarURL({
          title: info.event.title,
          description: event.description,
          location: event.location,
          startUtc: event.startUtc,
          endUtc: event.endUtc
        }),
        "_blank"
      );
    }
  }
});

calendar.render();
</script>