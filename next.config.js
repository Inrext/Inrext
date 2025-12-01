module.exports = {
  // ...existing config...
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      'ui-avatars.com',
      'inrext-backend.vercel.app',
      'inrext.s3.ap-south-1.amazonaws.com',
      // add other domains as needed
    ],
  },
};