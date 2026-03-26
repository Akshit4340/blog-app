import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{
      hostname: "images.unsplash.com",
      protocol: "https",
      port: "",
    },
    {
      hostname: "lovable-bloodhound-237.convex,cloud",
      protocol: "https",
      port: "",
    },
    {
      hostname: "brave-oriole-196.eu-west-1.convex.cloud",
      protocol: "https",
      port: ""
    }
  ]
  }
};

export default nextConfig;
