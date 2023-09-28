/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_KEY_SECRET:
      process.env.NEXT_PUBLIC_API_KEY_SECRET,
  },
};

module.exports = nextConfig;
