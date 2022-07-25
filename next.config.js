/**
 * @link https://nextjs.org/docs/api-reference/next.config.js/introduction
 * @type {import('next').NextConfig}
 */

module.exports = {
  reactStrictMode: true,
  experimental: {
    images: {
      allowFutureImage: true
    }
  },
  images: {
    domains: [
      'localhost',
      'lh3.googleusercontent.com',
      'images.unsplash.com',
      'external-content.duckduckgo.com',
      'www.tailwind-kit.com'
    ]
  }
};
