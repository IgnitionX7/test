HomePage---------------------------------------------
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { usePathname } from "next/navigation";
// import { BellIcon } from "@heroicons/react/outline";
// import Header from "@/components/Header";
import CircularProgress from "@/components/CircularProgress";
import { menuItems } from "@/constants/menuItems";

export default function Home() {
  const [progress, setProgress] = useState([45, 75, 30, 80, 50, 20]);
  const [currentTime, setCurrentTime] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };
      setCurrentTime(now.toLocaleString("en-GB", options).replace(",", " |"));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center ">
      <div className="grid grid-cols-2 gap-4 w-full max-w-md mt-4">
        {menuItems.map((item, index) => (
          <Link
            key={item.label}
            href={item.href}
            className="bg-gray-200 rounded-lg p-4 flex flex-col items-center justify-center relative"
          >
            <div className="text-lg font-semibold">{item.label}</div>
            <CircularProgress percentage={progress[index]} />
          </Link>
        ))}
      </div>
      <Link
        href="/view-detail"
        className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-full shadow-md hover:bg-blue-700 transition-all"
      >
        VIEW DETAIL
      </Link>
      <div className="mt-4 text-lg font-medium text-gray-700">
        {currentTime}
      </div>
    </div>
  );
}
----------------------------------------------------------------------------
CircularProgress------------------------------------------------------------------------------
"use client";

import { motion } from "framer-motion";

export default function CircularProgress({ percentage }) {
  return (
    <div className="relative w-16 h-16 mt-2">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          className="text-gray-300 stroke-current"
          strokeWidth="10"
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
        />
        <motion.circle
          className="text-blue-500 stroke-current"
          strokeWidth="10"
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          strokeDasharray="251.2"
          strokeDashoffset={251.2 - (251.2 * percentage) / 100}
          initial={{ strokeDashoffset: 251.2 }}
          animate={{ strokeDashoffset: 251.2 - (251.2 * percentage) / 100 }}
          transition={{ duration: 1 }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-sm font-bold">
        {percentage.toFixed(1)}%
      </div>
    </div>
  );
}
------------------------------------------------------------------
Header------------------------------------------------------
"use client";

import { usePathname } from "next/navigation";
import { BellIcon } from "@heroicons/react/24/outline";
import { menuItems } from "@/constants/menuItems";
import Link from "next/link";

export default function Header() {
  const pathname = usePathname();
  const title =
    pathname === "/"
      ? "Home"
      : menuItems.find((item) => item.href === pathname)?.label || "Page";

  return (
    <div className="w-full p-4 bg-white shadow-md fixed top-0 left-0 right-0 z-10 h-20 flex flex-col justify-center">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center space-x-3">
          <Link href="/">
            <div className="flex flex-col space-y-1">
              <div className="w-6 h-1 bg-gray-800 rounded-full"></div>
              <div className="w-4 h-1 bg-gray-800 rounded-full"></div>
              <div className="w-3 h-1 bg-gray-800 rounded-full"></div>
            </div>
          </Link>
          <h1 className="text-xl font-semibold">{title}</h1>
        </div>
        <BellIcon className="w-6 h-6 text-gray-800" />
      </div>
      <div className="flex flex-col w-full text-sm text-gray-700 mt-1">
        <div>Shan Amin</div>
        <div>Employee</div>
      </div>
    </div>
  );
}
----------------------------------------------------------------------------
layout.js----------------------------------------------------------
"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { menuItems } from "@/constants/menuItems";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({ children }) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Wrapper for the entire page */}
        <div className="min-h-screen flex flex-col">
          {/* Header stays fixed at the top */}
          <Header
            title={
              pathname === "/"
                ? "Home"
                : menuItems.find((item) => item.href === pathname)?.label ||
                  "Page"
            }
          />

          {/* This ensures the header doesn't overlap the content */}
          <main className="flex-1 p-4 pt-20">{children}</main>
        </div>
      </body>
    </html>
  );
}
