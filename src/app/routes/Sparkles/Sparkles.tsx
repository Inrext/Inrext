"use client";

import { motion } from "framer-motion";
import React from "react";

type SparklesProps = {
  numSparkles?: number;
};

const Sparkles: React.FC<SparklesProps> = ({ numSparkles = 500 }) => {
  const sparkles = Array.from({ length: numSparkles });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {sparkles.map((_, i) => {
        const size = Math.random() * 2 + 1; // Random size
        const duration = Math.random() * 1 + 1; // Random duration
        const delay = Math.random() * 2; // Random delay
        const left = Math.random() * 100; // Random horizontal position
        const top = Math.random() * 100; // Random vertical position

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
              x: [0, Math.random() * 10 - 5, 0],
              y: [0, Math.random() * 10 - 5, 0],
            }}
            transition={{
              duration,
              repeat: Infinity,
              repeatType: "loop",
              delay,
            }}
            className="absolute bg-white rounded-full shadow-lg"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${left}%`,
              top: `${top}%`,
            }}
          />
        );
      })}
    </div>
  );
};

export default Sparkles;