"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

type CardType = {
  id: string;
  name: string;
  species: string;
  date_of_birth: string;
  health_status: string;
  gender?: string;
  description?: string;
  enclosure?: string;
  enclosure_location?: string;
  arrival_date?: string;
  src: string;
};

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
  }: {
    card: CardType;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }) => {
    // Function to get health status color
    const getHealthStatusColor = (status: string) => {
      switch (status.toLowerCase()) {
        case "healthy":
          return "text-green-400";
        case "under observation":
          return "text-yellow-400";
        case "requires attention":
          return "text-orange-400";
        case "critical":
          return "text-red-400";
        default:
          return "text-gray-400";
      }
    };

    // Function to get gender icon
    const getGenderIcon = (gender?: string) => {
      if (!gender) return "";
      if (gender.toLowerCase() === "male") return "♂️";
      if (gender.toLowerCase() === "female") return "♀️";
      return "";
    };

    return (
      <div
        onMouseEnter={() => setHovered(index)}
        onMouseLeave={() => setHovered(null)}
        className={cn(
          "rounded-xl relative bg-white dark:bg-neutral-900 overflow-hidden h-60 md:h-96 w-full transition-all duration-300 ease-out cursor-pointer group",
          hovered !== null && hovered !== index && "blur-sm scale-[0.98]",
          "shadow-lg hover:shadow-2xl"
        )}
      >
        {/* Image */}
        <img
          src={card.src}
          alt={card.name}
          className={cn(
            "h-full w-full object-cover transition-all duration-500",
            hovered === index ? "scale-110" : "scale-100"
          )}
          loading="lazy"
          onError={(e) => {
            // Fallback image if the original fails to load
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=500&h=400&fit=crop";
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Content Overlay */}
        <div
          className={cn(
            "absolute inset-0 flex flex-col justify-between p-4 md:p-6 transition-opacity duration-300",
            hovered === index ? "opacity-100" : "opacity-0 md:opacity-70"
          )}
        >
          {/* Top Section - Species Badge */}
          <div className="flex justify-between items-start">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs md:text-sm font-medium">
              {card.species}
            </span>
            <span className="text-white text-lg">
              {getGenderIcon(card.gender)}
            </span>
          </div>

          {/* Bottom Section - Animal Info */}
          <div className="space-y-2">
            {/* Animal Name */}
            <h3 className="text-xl md:text-2xl font-bold text-white">
              {card.name}
            </h3>

            {/* Health Status */}
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "w-2 h-2 rounded-full",
                  card.health_status?.toLowerCase() === "healthy"
                    ? "bg-green-400"
                    : card.health_status?.toLowerCase() === "under observation"
                    ? "bg-yellow-400"
                    : card.health_status?.toLowerCase() === "requires attention"
                    ? "bg-orange-400"
                    : "bg-gray-400"
                )}
              />
              <span
                className={cn(
                  "text-sm md:text-base font-medium",
                  getHealthStatusColor(card.health_status)
                )}
              >
                {card.health_status}
              </span>
            </div>

            {/* Additional Info - Only visible on hover */}
            <div
              className={cn(
                "space-y-1 transition-all duration-300",
                hovered === index
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2"
              )}
            >
              <p className="text-white/90 text-xs md:text-sm">
                <span className="text-white/70">Born:</span>{" "}
                {card.date_of_birth}
              </p>
              {card.enclosure && (
                <p className="text-white/90 text-xs md:text-sm">
                  <span className="text-white/70">Home:</span> {card.enclosure}
                </p>
              )}
              {card.arrival_date && (
                <p className="text-white/90 text-xs md:text-sm">
                  <span className="text-white/70">Arrived:</span>{" "}
                  {card.arrival_date}
                </p>
              )}
              {card.description && (
                <p className="text-white/80 text-xs md:text-sm line-clamp-2 mt-2">
                  {card.description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Hover Effect Border */}
        <div
          className={cn(
            "absolute inset-0 border-2 rounded-xl transition-all duration-300",
            hovered === index ? "border-white/50" : "border-transparent"
          )}
        />
      </div>
    );
  }
);

Card.displayName = "Card";

export function FocusCardAnimals({ cards }: { cards: CardType[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  if (!cards || cards.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          No animals to display at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto px-4 w-full">
      {cards.map((card, index) => (
        <Card
          key={card.id}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </div>
  );
}
