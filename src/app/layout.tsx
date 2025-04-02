import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import GlobalNav from "@/components/navigation/GlobalNav";
import AuthContext from "@/context/AuthContext";
import SWRConfigContext from "@/context/SWRConfigContext";

const openSans = Open_Sans({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Tell your Voice",
    template: "Tell your Voice | %s",
  },
  description: "Listen your neighbor's story",
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
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="preconnect"
          href="https://lh3.googleusercontent.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://cdn.sanity.io"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${openSans.className} w-full bg-neutral-50`}>
        <AuthContext>
          <div className="max-w-screen-xl mx-auto">
            <GlobalNav />
          </div>
          <main className="w-full flex justify-center">
            <SWRConfigContext>{children}</SWRConfigContext>
          </main>
        </AuthContext>
        <div id="portal" />
      </body>
    </html>
  );
}
