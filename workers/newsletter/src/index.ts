const MAX_BODY_BYTES = 2_048;
const MAX_NAME_LENGTH = 100;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SubscriptionInput = {
  email: string;
  name: string;
  consent: boolean;
  website: string;
};

function jsonResponse(body: Record<string, unknown>, status: number, allowedOrigin?: string): Response {
  const headers = new Headers({
    "Cache-Control": "no-store",
    "Content-Type": "application/json",
    "X-Content-Type-Options": "nosniff"
  });
  if (allowedOrigin !== undefined) {
    headers.set("Access-Control-Allow-Origin", allowedOrigin);
    headers.set("Vary", "Origin");
  }

  return Response.json(body, {
    status,
    headers
  });
}

function wantsHtml(request: Request): boolean {
  return request.headers.get("Accept")?.includes("text/html") ?? false;
}

function parseConsent(value: unknown): boolean {
  return value === true || value === "true" || value === "on" || value === "yes";
}

function normalizeInput(value: unknown): SubscriptionInput | null {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return null;
  }

  const record = value as Record<string, unknown>;
  const email = typeof record.email === "string" ? record.email.trim().toLowerCase() : "";
  const name = typeof record.name === "string" ? record.name.trim() : "";
  const website = typeof record.website === "string" ? record.website.trim() : "";

  if (
    email.length === 0 ||
    email.length > 254 ||
    !EMAIL_PATTERN.test(email) ||
    name.length > MAX_NAME_LENGTH
  ) {
    return null;
  }

  return {
    email,
    name,
    consent: parseConsent(record.consent),
    website
  };
}

async function readInput(request: Request): Promise<SubscriptionInput | null> {
  const declaredSize = Number(request.headers.get("Content-Length") ?? "0");
  if (Number.isFinite(declaredSize) && declaredSize > MAX_BODY_BYTES) {
    return null;
  }

  const contentType = request.headers.get("Content-Type")?.split(";", 1)[0].trim().toLowerCase();

  if (contentType !== "application/json" && contentType !== "application/x-www-form-urlencoded") {
    return null;
  }

  const reader = request.body?.getReader();
  if (reader === undefined) {
    return null;
  }

  const chunks: Uint8Array[] = [];
  let receivedBytes = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }

    receivedBytes += value.byteLength;
    if (receivedBytes > MAX_BODY_BYTES) {
      await reader.cancel("Request body is too large");
      return null;
    }
    chunks.push(value);
  }

  const bytes = new Uint8Array(receivedBytes);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  const text = new TextDecoder().decode(bytes);

  if (contentType === "application/json") {
    try {
      return normalizeInput(JSON.parse(text));
    } catch {
      return null;
    }
  }

  return normalizeInput(Object.fromEntries(new URLSearchParams(text)));
}

function safePostaUrl(baseUrl: string): URL | null {
  try {
    const url = new URL(baseUrl);
    const localDevelopment = url.protocol === "http:" && ["localhost", "127.0.0.1"].includes(url.hostname);
    if (url.protocol !== "https:" && !localDevelopment) {
      return null;
    }
    url.pathname = "/api/v1/subscriber-lists/subscribe";
    url.search = "";
    url.hash = "";
    return url;
  } catch {
    return null;
  }
}

function successResponse(request: Request, origin: string): Response {
  if (wantsHtml(request)) {
    return Response.redirect(`${origin}/newsletter/?subscribed=1`, 303);
  }

  return jsonResponse(
    {
      success: true,
      message: "You are subscribed to the HackTheArt newsletter."
    },
    200,
    origin
  );
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const requestId = crypto.randomUUID();
    const url = new URL(request.url);

    if (url.pathname !== "/api/newsletter") {
      return jsonResponse({ success: false, message: "Not found." }, 404);
    }

    if (request.method !== "POST") {
      return new Response(null, {
        status: 405,
        headers: {
          Allow: "POST",
          "Cache-Control": "no-store"
        }
      });
    }

    if (request.headers.get("Origin") !== env.ALLOWED_ORIGIN) {
      return jsonResponse({ success: false, message: "Request origin is not allowed." }, 403);
    }

    try {
      const input = await readInput(request);
      if (input === null) {
        return jsonResponse({ success: false, message: "Enter a valid email address." }, 400, env.ALLOWED_ORIGIN);
      }

      // Silently accept bot-filled honeypot submissions without forwarding them.
      if (input.website !== "") {
        return successResponse(request, env.ALLOWED_ORIGIN);
      }

      if (!input.consent) {
        return jsonResponse(
          { success: false, message: "Consent is required to subscribe." },
          400,
          env.ALLOWED_ORIGIN
        );
      }

      const postaUrl = safePostaUrl(env.POSTA_BASE_URL);
      if (postaUrl === null) {
        console.error(JSON.stringify({ event: "newsletter.configuration_error", requestId }));
        return jsonResponse(
          { success: false, message: "Newsletter signup is temporarily unavailable." },
          503,
          env.ALLOWED_ORIGIN
        );
      }

      const postaResponse = await fetch(postaUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${env.POSTA_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: input.email,
          name: input.name,
          list: env.POSTA_LIST_NAME
        }),
        // Never forward the Posta API key to a redirect target.
        redirect: "manual",
        signal: AbortSignal.timeout(10_000)
      });

      if (!postaResponse.ok) {
        console.error(
          JSON.stringify({
            event: "newsletter.posta_rejected",
            requestId,
            status: postaResponse.status
          })
        );
        return jsonResponse(
          { success: false, message: "Newsletter signup is temporarily unavailable." },
          502,
          env.ALLOWED_ORIGIN
        );
      }

      console.log(JSON.stringify({ event: "newsletter.subscribed", requestId }));
      return successResponse(request, env.ALLOWED_ORIGIN);
    } catch (error) {
      console.error(
        JSON.stringify({
          event: "newsletter.unhandled_error",
          requestId,
          error: error instanceof Error ? error.message : "Unknown error"
        })
      );
      return jsonResponse(
        { success: false, message: "Newsletter signup is temporarily unavailable." },
        500,
        env.ALLOWED_ORIGIN
      );
    }
  }
} satisfies ExportedHandler<Env>;
