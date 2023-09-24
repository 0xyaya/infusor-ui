/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_KEY_SECRET: process.env.API_KEY_SECRET,
  },
};

module.exports = nextConfig;
