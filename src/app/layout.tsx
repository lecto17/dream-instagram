import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import GlobalNav from "@/components/navigation/GlobalNav";

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
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${openSans.className} w-full mx-auto max-w-screen-xl`}>
        <GlobalNav />
        <main>{children}</main>
      </body>
    </html>
  );
}
