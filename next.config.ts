const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        port: '',
        pathname: '/images/**',
        search: '',
      },
    ],
  },
  env: {
    // 환경별 환경 변수 설정
    NEXT_PUBLIC_APP_URL:
      process.env.NODE_ENV === 'production'
        ? process.env.NEXT_PUBLIC_APP_URL_PROD ||
          'https://your-production-domain.com'
        : process.env.NEXT_PUBLIC_APP_URL_DEV || 'http://localhost:3000',
  },
};

export default nextConfig;
