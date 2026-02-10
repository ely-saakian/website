/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  turbopack: {},
  experimental: {
    viewTransition: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "repository-images.githubusercontent.com",
      },
    ],
  },
  trailingSlash: true,
};
