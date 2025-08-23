"use client";

import { IconArrowLeft } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
  useWillChange,
} from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const willChangeCard = useWillChange();

  // Scroll hooks
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const isCardsInView = useInView(cardsRef, { once: true, margin: "-50px" });
  const isTextInView = useInView(textRef, { once: true, margin: "-50px" });

  // Transform values based on scroll
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.5, 1, 1, 0.5]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.9, 1, 1, 0.9]
  );

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % theWildLife.length);
  }, [theWildLife.length]);

  const handlePrev = useCallback(() => {
    setActive((prev) => (prev - 1 + theWildLife.length) % theWildLife.length);
  }, [theWildLife.length]);

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, handleNext]);

  const getCardProps = useCallback(
    (index: number) => {
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
    },
    [active, theWildLife.length]
  );

  return (
    <motion.div
      ref={containerRef}
      className="mx-auto max-w-sm px-4 py-20 font-sans antialiased md:max-w-6xl md:px-8 lg:px-12"
      style={{ opacity, scale, y }}
    >
      <div className="relative grid grid-cols-1 gap-10 md:grid-cols-2 lg:gap-52">
        <motion.div
          ref={cardsRef}
          className="flex justify-center items-center"
          initial={{ x: -50, opacity: 0 }}
          animate={
            isCardsInView ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }
          }
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
        >
          <div
            className="relative w-72 sm:w-96 h-96"
            style={{ perspective: "1000px" }}
          >
            {theWildLife.map((item, index) => {
              const cardProps = getCardProps(index);
              return (
                <motion.div
                  key={index}
                  className="absolute inset-0 w-full h-full"
                  animate={cardProps}
                  transition={{
                    duration: 0.5,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  style={{
                    ...(willChangeCard as React.CSSProperties),
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
                      loading="lazy"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          ref={textRef}
          className="flex flex-col justify-center items-center md:items-start md:ml-5 text-center md:text-left py-4"
          initial={{ x: 50, opacity: 0 }}
          animate={isTextInView ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
            delay: 0.2,
          }}
        >
          {/* Fixed height container to prevent button movement */}
          <div className="min-h-[320px] flex flex-col justify-between w-full max-w-lg">
            <div className="flex-1">
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
                    duration: 0.3,
                    ease: "easeInOut",
                  }}
                  className="space-y-4"
                >
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    {theWildLife[active].type}
                  </h2>
                  <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
                    {theWildLife[active].enclosure}
                  </p>
                  <p className="text-lg lg:text-xl leading-relaxed text-gray-700 dark:text-gray-300">
                    {theWildLife[active].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Fixed position controls */}
            <motion.div
              className="flex items-center gap-4 mt-8 justify-center md:justify-start"
              initial={{ y: 30, opacity: 0 }}
              animate={
                isTextInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }
              }
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: 0.4,
              }}
            >
              <button
                onClick={handlePrev}
                aria-label="Previous item"
                className="group flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 dark:bg-gray-100 hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-200 shadow-lg"
              >
                <IconArrowLeft className="h-4 w-4 text-white dark:text-gray-900 transition-transform duration-200 group-hover:-translate-x-0.5" />
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
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
