import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.css';
import GlobalNav from '@/components/navigation/GlobalNav';
import SWRConfigContext from '@/context/SWRConfigContext';
import { getAuthenticatedUser } from '@/actions/action';
import { getMyProfile } from '@/service/supa-user';
import type { ReactNode } from 'react';

const openSans = Open_Sans({
  variable: '--font-open-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Share your Voice',
    template: '%s | Share your Voice',
  },
  description: "Listen your neighbor's story",
  keywords: [
    'instagram',
    'social media',
    'story',
    'voice',
    'community',
    'sharing',
  ],
  authors: [{ name: 'hnoo' }],
  creator: 'hnoo',
  publisher: 'hnoo',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
  ),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: '/',
    title: 'Share your Voice',
    description: "Listen your neighbor's story",
    siteName: 'Share your Voice',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: "Share your Voice - Listen your neighbor's story",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Share your Voice',
    description: "Listen your neighbor's story",
    images: ['/opengraph-image'],
    creator: '@hnoo',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? undefined,
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },
};

// 현재(nextjs 15버전) viewport는 아래와 같은 방식으로 넣을 수 있는데, 기본적으로 setting이 되는 사항이여서,
// 별도로 넣을 필요는 없다.(Good to know: The viewport meta tag is automatically set, and manual configuration is usually unnecessary as the default is sufficient. However, the information is provided for completeness.)
// import type { Viewport } from "next";

// // export const viewport: Viewport = {
// //   width: "device-width",
// //   initialScale: 1,
// //   maximumScale: 1,
// //   userScalable: false,
// // };

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  // 전역적으로 사용자 정보와 프로필 정보 가져오기
  const user = await getAuthenticatedUser();
  const profile = user ? await getMyProfile(user.id) : null;

  return (
    <html lang="ko">
      <head>
        <link
          rel="preconnect"
          href="https://lh3.googleusercontent.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${openSans.className} w-full h-full bg-neutral-50`}>
        {/* <AuthContext> */}
        <div className="max-w-screen-lg mx-auto h-16">
          <GlobalNav user={profile} />
        </div>
        <main className="w-full h-[calc(100%-64px)] flex justify-center">
          <SWRConfigContext>{children}</SWRConfigContext>
        </main>
        {/* </AuthContext> */}
        <div id="portal" />
      </body>
    </html>
  );
}
