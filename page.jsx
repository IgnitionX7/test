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
