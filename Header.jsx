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
