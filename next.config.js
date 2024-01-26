/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'placehold.co',
      'scontent-cph2-1.cdninstagram.com',
      'scontent.cdninstagram.com',
    ],
    dangerouslyAllowSVG: true,
  },
}

module.exports = nextConfig
