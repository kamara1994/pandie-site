"use client";

// Self-contained global error boundary. Renders its own <html>/<body> and uses
// no context/providers, so it can prerender safely and catch root-level errors.

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a1a10",
          color: "#fff",
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
          padding: "24px",
        }}
      >
        <div style={{ maxWidth: 460 }}>
          <p style={{ fontSize: 12, letterSpacing: "0.28em", textTransform: "uppercase", color: "#c9962a", fontWeight: 700 }}>
            Pandie Foundation
          </p>
          <h1 style={{ fontSize: 32, margin: "16px 0 8px" }}>Something went wrong</h1>
          <p style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>
            We hit an unexpected error. Please try again — if it keeps happening, email{" "}
            <a href="mailto:info@pandiefoundation.org" style={{ color: "#e8b84b" }}>
              info@pandiefoundation.org
            </a>.
          </p>
          <button
            onClick={() => reset()}
            style={{
              marginTop: 24,
              background: "#c9962a",
              color: "#0a1a10",
              border: 0,
              borderRadius: 12,
              padding: "12px 28px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
