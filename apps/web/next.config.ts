import type { NextConfig } from "next";

// Next.js "Multi Zones": this app owns the domain; requests under /admin are
// transparently proxied (server-side, URL bar stays the same) to the admin
// app, which is configured with basePath: "/admin" on its own side.
const ADMIN_ORIGIN = process.env.ADMIN_ORIGIN ?? "http://localhost:3002";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/admin", destination: `${ADMIN_ORIGIN}/admin` },
      { source: "/admin/:path*", destination: `${ADMIN_ORIGIN}/admin/:path*` },
    ];
  },
};

export default nextConfig;
