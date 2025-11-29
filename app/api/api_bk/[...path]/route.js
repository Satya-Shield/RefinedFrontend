// Use environment variable for backend URL, fallback to localhost
const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000";

export async function POST(req, { params }) {
  // Next.js 15 requires awaiting params
  const { path } = await params;
  const backendURL = `${BACKEND_BASE_URL}/api/${path.join("/")}`;

  try {
    const body = await req.text(); // get the raw request body

    const response = await fetch(backendURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });

    // read backend response
    const text = await response.text();

    return new Response(text, {
      status: response.status,
      headers: {
        "Content-Type":
          response.headers.get("content-type") || "application/json",
      },
    });
  } catch (err) {
    console.error("Proxy error:", err);
    return new Response(
      JSON.stringify({ error: "Proxy failed", details: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function GET(req, { params }) {
  // Next.js 15 requires awaiting params
  const { path } = await params;
  const backendURL = `${BACKEND_BASE_URL}/api/${path.join("/")}`;

  try {
    const response = await fetch(backendURL);
    const text = await response.text();

    return new Response(text, {
      status: response.status,
      headers: {
        "Content-Type":
          response.headers.get("content-type") || "application/json",
      },
    });
  } catch (err) {
    console.error("Proxy error (GET):", err);
    return new Response(
      JSON.stringify({ error: "Proxy failed", details: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
