import { FocusCardAnimals } from "../ui/focus-card-animal";
import { useMemo } from "react";

interface Animal {
  _id: string;
  name: string;
  species: string;
  date_of_birth: string;
  gender: string;
  health_status: string;
  imageUrl: string;
  description?: string;
  arrival_date: string;
  enclosure?: {
    name: string;
    type: string;
    location: string;
  };
}

const transformAnimalsToCards = (animals: Animal[]) => {
  return animals.map((animal) => ({
    id: animal._id,
    name: animal.name,
    species: animal.species,
    date_of_birth: new Date(animal.date_of_birth).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    health_status: animal.health_status,
    gender: animal.gender,
    description:
      animal.description ||
      `Meet ${animal.name}, a wonderful ${animal.species.toLowerCase()}.`,
    enclosure: animal.enclosure?.name || "Wildlife Habitat",
    enclosure_location: animal.enclosure?.location || "Zoo Grounds",
    arrival_date: new Date(animal.arrival_date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    src: animal.imageUrl,
  }));
};

export function AnimalFocusCards({ animals = [] }: { animals: Animal[] }) {
  const cards = useMemo(() => {
    if (!animals || animals.length === 0) {
      // Fallback data if no animals provided
      return [
        {
          id: "fallback-1",
          name: "Loading...",
          species: "Wildlife",
          date_of_birth: "Coming Soon",
          health_status: "Healthy",
          gender: "Unknown",
          description: "Amazing wildlife coming soon!",
          enclosure: "Zoo Habitat",
          enclosure_location: "Zoo Grounds",
          arrival_date: "Recently",
          src: "https://images.unsplash.com/photo-1518710843675-2540dd79065c?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
      ];
    }

    return transformAnimalsToCards(animals);
  }, [animals]);

  const groupedCards = useMemo(() => {
    const grouped = cards.reduce((acc, card) => {
      const species = card.species;
      if (!acc[species]) {
        acc[species] = [];
      }
      acc[species].push(card);
      return acc;
    }, {} as Record<string, typeof cards>);

    return grouped;
  }, [cards]);

  if (Object.keys(groupedCards).length > 1 && animals.length > 6) {
    return (
      <div className="space-y-16">
        {Object.entries(groupedCards).map(([species, speciesCards]) => (
          <div key={species} className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {species}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {speciesCards.length} {species.toLowerCase()}
                {speciesCards.length !== 1 ? "s" : ""} in our collection
              </p>
            </div>

            <FocusCardAnimals cards={speciesCards} />
          </div>
        ))}
      </div>
    );
  }

  return <FocusCardAnimals cards={cards} />;
}
