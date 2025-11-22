import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import Navbar from "@/components/navbar";
import { AuthProvider } from "@/context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bricolageGrotesque = localFont({
  src: [
    {
      path: "../public/fonts/BricolageGrotesque-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/BricolageGrotesque-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/BricolageGrotesque-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/BricolageGrotesque-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-bricolage-grotesque",
});

const momoSignature = localFont({
  src: [
    {
      path: "../public/fonts/MomoSignature-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-momo-signature",
});

export const metadata: Metadata = {
  title: "Wasto",
  description: "Your Waste Management App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bricolageGrotesque.className} ${momoSignature.variable} antialiased`}
      >
        <AuthProvider>
          <Navbar />
          <div className="pt-[64px]  min-h-screen">{children}</div>
        </AuthProvider>
      </body>
    </html>
  );
}
