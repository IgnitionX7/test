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
