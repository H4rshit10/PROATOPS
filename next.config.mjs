import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // HTTPS only, including subdomains, for a year — the site already
          // redirects apex to www over HTTPS, this just makes browsers skip
          // the redirect on repeat visits.
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          // Stops a browser from guessing a response's MIME type and running
          // it as something else (e.g. treating an upload as executable JS).
          { key: "X-Content-Type-Options", value: "nosniff" },
          // No page here is meant to be framed by another site.
          { key: "X-Frame-Options", value: "DENY" },
          // Full URL to same-origin links, only the origin cross-origin —
          // avoids leaking the current page's full path (with any query
          // params) to third parties an outbound link points at.
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Nothing on this site uses camera, microphone, or geolocation.
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
