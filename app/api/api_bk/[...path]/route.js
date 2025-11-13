export async function POST(req, { params }) {
  const path = params.path.join("/");
  const backendURL = `http://34.93.122.16:8000/api/${path}`;

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
  const path = params.path.join("/");
  const backendURL = `http://34.93.122.16:8000/api/${path}`;

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
