/* eslint-env browser */
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Manrope } from "next/font/google";
import RootWrapper from "./RootApp";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} min-h-screen bg-[#424F40] text-white antialiased`}
      >
        <RootWrapper>{children}</RootWrapper>
      </body>
    </html>
  );
}