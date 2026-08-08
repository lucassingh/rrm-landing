import type { NextConfig } from "next";

// Served under /admin on the same domain as apps/web via Next.js "Multi Zones"
// (apps/web's next.config.ts rewrites /admin/* here). basePath makes every
// route/asset/redirect this app generates resolve under that prefix automatically.
const nextConfig: NextConfig = {
  basePath: "/admin",
};

export default nextConfig;
