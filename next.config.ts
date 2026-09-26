import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // NOTE: keep these explicit (no /about/:path* wildcard) so the
      // static assets in public/about/*.webp|png keep serving with 200
      // instead of being redirected to /about-us/* (broken images).
      { source: "/about", destination: "/about-us", permanent: true },
      { source: "/about/team", destination: "/about-us/team", permanent: true },
      {
        source: "/about/mission",
        destination: "/about-us/mission",
        permanent: true,
      },
      { source: "/contact", destination: "/contact-us", permanent: true },
    ];
  },
};

export default nextConfig;
