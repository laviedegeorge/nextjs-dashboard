/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'avatars.githubusercontent.com',
            port: '',
            pathname: '/u/**',
          },
          {
            protocol: 'https',
            hostname: 'github.githubassets.com',
            port: '',
            pathname: '/images/modules/profile/achievements/**',
          },
        ],
      },
};

module.exports = nextConfig;
