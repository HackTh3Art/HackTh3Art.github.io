(() => {
  const form = document.querySelector("#newsletter-form");
  const status = document.querySelector("#newsletter-status");

  if (!(form instanceof HTMLFormElement) || !(status instanceof HTMLElement)) {
    return;
  }

  const button = form.querySelector('button[type="submit"]');
  const query = new URLSearchParams(window.location.search);

  if (query.get("subscribed") === "1") {
    status.textContent = "You are subscribed to the HackTheArt newsletter.";
    status.dataset.state = "success";
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    status.textContent = "Subscribing…";
    status.dataset.state = "pending";

    if (button instanceof HTMLButtonElement) {
      button.disabled = true;
    }

    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        headers: {
          Accept: "application/json"
        },
        body: new URLSearchParams({
          name: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
          website: String(data.get("website") ?? ""),
          consent: data.get("consent") === "yes" ? "yes" : "no"
        })
      });

      const result = await response.json();
      if (!response.ok || result.success !== true) {
        throw new Error(typeof result.message === "string" ? result.message : "Could not subscribe.");
      }

      form.reset();
      status.textContent = result.message;
      status.dataset.state = "success";
    } catch (error) {
      status.textContent = error instanceof Error ? error.message : "Could not subscribe. Please try again.";
      status.dataset.state = "error";
    } finally {
      if (button instanceof HTMLButtonElement) {
        button.disabled = false;
      }
    }
  });
})();
