"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

type TheWildLife = {
  description: string;
  type: string;
  enclosure: string;
  src: string;
};

export const TheWildLife = ({
  theWildLife,
  autoplay = false,
}: {
  theWildLife: TheWildLife[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % theWildLife.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + theWildLife.length) % theWildLife.length);
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const getCardProps = (index: number) => {
    const isActive = index === active;
    const isNext = index === (active + 1) % theWildLife.length;
    const isPrev =
      index === (active - 1 + theWildLife.length) % theWildLife.length;

    if (isActive) {
      return {
        x: 0,
        y: 0,
        scale: 1,
        rotateY: 0,
        zIndex: 30,
        opacity: 1,
      };
    } else if (isNext) {
      return {
        x: 50,
        y: 20,
        scale: 0.9,
        rotateY: -15,
        zIndex: 20,
        opacity: 0.7,
      };
    } else if (isPrev) {
      return {
        x: -50,
        y: 20,
        scale: 0.9,
        rotateY: 15,
        zIndex: 10,
        opacity: 0.7,
      };
    } else {
      return {
        x: 0,
        y: 40,
        scale: 0.8,
        rotateY: 0,
        zIndex: 1,
        opacity: 0.3,
      };
    }
  };

  return (
    <div className="mx-auto max-w-sm px-4 py-20 font-sans antialiased md:max-w-6xl md:px-8 lg:px-12">
      <div className="relative grid grid-cols-1 gap-10 md:grid-cols-2 lg:gap-52">
        <div className="flex justify-center items-center">
          <div className="relative w-80 h-96 perspective-1000">
            {theWildLife.map((item, index) => {
              const cardProps = getCardProps(index);
              return (
                <motion.div
                  key={index}
                  className="absolute inset-0 w-full h-full"
                  animate={cardProps}
                  transition={{
                    duration: 0.6,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  style={{
                    transformStyle: "preserve-3d",
                    zIndex: cardProps.zIndex,
                  }}
                >
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
                    <img
                      src={item.src}
                      alt={item.type}
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col justify-center py-4 space-y-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{
                y: 20,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: -20,
                opacity: 0,
              }}
              transition={{
                duration: 0.4,
                ease: "easeInOut",
              }}
              className="space-y-4"
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                {theWildLife[active].type}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {theWildLife[active].enclosure}
              </p>
              <motion.p
                className="text-xl leading-relaxed text-gray-700 dark:text-gray-300 max-w-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                {theWildLife[active].description}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center gap-4">
            <button
              onClick={handlePrev}
              aria-label="Previous item"
              className="group flex h-6 w-7 items-center justify-center rounded-full bg-gray-900 dark:bg-gray-100 hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-200 shadow-lg"
            >
              <IconArrowLeft className="h-4 w-6 text-white dark:text-gray-900 transition-transform duration-200 group-hover:-translate-x-0.5" />
            </button>

            <div className="flex space-x-2">
              {theWildLife.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActive(index)}
                  className={`h-2 rounded-full transition-all duration-200 ${
                    index === active
                      ? "w-8 bg-gray-900 dark:bg-gray-100"
                      : "w-2 bg-gray-400 dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* <button
              onClick={handleNext}
              aria-label="Next item"
              className="group flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 dark:bg-gray-100 hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-200 shadow-lg"
            >
              <IconArrowRight className="h-6 w-6 text-white dark:text-gray-900 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};
