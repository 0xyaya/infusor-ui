/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_KEY_SECRET:
      process.env.NEXT_PUBLIC_API_KEY_SECRET,
  },
  // Can be safely removed in newer versions of Next.js
  // by default, if you customize webpack config, they switch back to version 4.
  // Looks like backward compatibility approach.
  webpack5: true,

  webpack(config) {
    config.resolve.fallback = {
      // if you miss it, all the other options in fallback, specified
      // by next.js will be dropped.
      ...config.resolve.fallback,

      fs: false, // the solution
    };

    return config;
  },
};

module.exports = nextConfig;
