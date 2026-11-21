import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
  // Старі адреси Webflow-версії → нові маршрути (301, щоб не втратити індексацію)
  async redirects() {
    return [
      { source: "/index.htm", destination: "/", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/privacy-policy.html", destination: "/privacy-policy", permanent: true },
      { source: "/public-offert.html", destination: "/public-offert", permanent: true },
      { source: "/success", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
