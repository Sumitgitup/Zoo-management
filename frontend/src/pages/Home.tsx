import { motion } from "framer-motion";
import Layout from "@/layouts/Layout";
import { TheWildLife } from "@/components/cards/TheWildLife";
import { TheWildLifeV2 } from "@/components/cards/TheWildLifeV2";
import { useEffect, useState } from "react";
import { fetchAnimals } from "@/api/animalsApi";

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

const transformAnimalData = (animals: Animal[]) => {
  return animals.map((animal) => ({
    description:
      animal.description ||
      `Meet ${
        animal.name
      }, a magnificent ${animal.species.trim()}. This ${animal.gender.toLowerCase()} is in ${animal.health_status.toLowerCase()} condition and arrived on ${new Date(
        animal.arrival_date
      ).toLocaleDateString()}.`,
    type: animal.species.trim(),
    enclosure:
      animal.enclosure?.name ||
      animal.enclosure?.location ||
      `${animal.species.trim()} Habitat`,
    src: animal.imageUrl,
    animalName: animal.name,
    gender: animal.gender,
    healthStatus: animal.health_status,
  }));
};

const groupAnimalsBySpecies = (animals: any[]) => {
  const grouped = animals.reduce((acc, animal) => {
    const species = animal.type;
    if (!acc[species]) {
      acc[species] = [];
    }
    acc[species].push(animal);
    return acc;
  }, {} as Record<string, any[]>);

  return grouped;
};

function Home() {
  const [animalData, setAnimalData] = useState<any[]>([]);
  const [groupedAnimals, setGroupedAnimals] = useState<Record<string, any[]>>(
    {}
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleExplore = () => {
    const main = document.getElementById("main");

    if (main) {
      main.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  useEffect(() => {
    const loadAnimals = async () => {
      try {
        setLoading(true);
        setError(null);

        const animals = await fetchAnimals({
          limit: 20,
          page: 1,
        });

        console.log("Fetched animals:", animals);

        if (Array.isArray(animals) && animals.length > 0) {
          const transformedData = transformAnimalData(animals);
          setAnimalData(transformedData);

          const grouped = groupAnimalsBySpecies(transformedData);
          setGroupedAnimals(grouped);

          console.log("Grouped animals by species:", grouped);
        } else {
          console.warn("No animals data received or invalid format");
          throw new Error("No animals data available");
        }
      } catch (err) {
        console.error("Error fetching animals:", err);
        setError("Failed to load animal data");

        // Fallback to default data if API fails
        const fallbackData = [
          {
            description:
              "The majestic African Lion is known as the king of the jungle. These powerful predators live in social groups called prides.",
            type: "Lion",
            enclosure: "African Savanna",
            src: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=500&h=400&fit=crop",
            animalName: "Simba",
            gender: "Male",
            healthStatus: "Healthy",
          },
          {
            description:
              "African Elephants are the largest land mammals on Earth. They are known for their intelligence and strong family bonds.",
            type: "Elephant",
            enclosure: "Elephant Sanctuary",
            src: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=500&h=400&fit=crop",
            animalName: "Dumbo",
            gender: "Female",
            healthStatus: "Healthy",
          },
          {
            description:
              "Giraffes are the tallest mammals in the world. Their long necks help them reach leaves high up in trees.",
            type: "Giraffe",
            enclosure: "African Plains",
            src: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=500&h=400&fit=crop",
            animalName: "Gerald",
            gender: "Male",
            healthStatus: "Healthy",
          },
          {
            description:
              "Bengal Tigers are magnificent striped cats native to India. They are excellent swimmers and powerful hunters.",
            type: "Tiger",
            enclosure: "Asian Forest",
            src: "https://images.unsplash.com/photo-1605554399710-0aa8c365ca3a?w=500&h=400&fit=crop",
            animalName: "Raja",
            gender: "Male",
            healthStatus: "Healthy",
          },
        ];

        setAnimalData(fallbackData);
        const grouped = groupAnimalsBySpecies(fallbackData);
        setGroupedAnimals(grouped);
      } finally {
        setLoading(false);
      }
    };

    loadAnimals();
  }, []);

  if (loading) {
    return (
      <Layout>
        <section id="Hero">
          <div className="inset-0 h-screen w-full overflow-hidden">
            <video
              src="/banner.mp4"
              autoPlay
              loop
              muted
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
            <div className="relative z-10 my-50 flex flex-col justify-end-safe items-center h-1/2 text-center text-white px-4">
              <motion.h1
                className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 0.5 }}
                transition={{ duration: 1 }}
              >
                Welcome to Wildlife Zoo!
              </motion.h1>
              <motion.p
                className="text-sm sm:text-lg md:text-xl mb-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                Explore animals, habitats, and adventures!
              </motion.p>
              <motion.button
                className="px-3 md:px-4 py-2 md:py-3 bg-green-600 text-sm md:text-inherit rounded-lg hover:bg-green-700"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                onClick={handleExplore}
              >
                Explore Now
              </motion.button>
            </div>
          </div>
        </section>

        <section id="main">
          <div className="container mx-auto overflow-hidden px-5">
            <div className="text-center mt-20 mb-10">
              <h1 className="text-2xl md:text-3xl font-bold mb-5">
                The Wildlife
              </h1>
              <p className="text-sm md:text-base">
                Loading amazing animals from around the world...
              </p>
              <div className="flex justify-center mt-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section id="Hero">
        <div className="inset-0 h-screen w-full overflow-hidden">
          <video
            src="/banner.mp4"
            autoPlay
            loop
            muted
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
          <div className="relative z-10 my-50 flex flex-col justify-end-safe items-center h-1/2 text-center text-white px-4">
            <motion.h1
              className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 0.5 }}
              transition={{ duration: 1 }}
            >
              Welcome to Wildlife Zoo!
            </motion.h1>
            <motion.p
              className="text-sm sm:text-lg md:text-xl mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              Explore animals, habitats, and adventures!
            </motion.p>
            <motion.button
              className="px-3 md:px-4 py-2 md:py-3 bg-green-600 text-sm md:text-inherit rounded-lg hover:bg-green-700"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              onClick={handleExplore}
            >
              Explore Now
            </motion.button>
          </div>
        </div>
      </section>

      <section id="main">
        <div className="container mx-auto overflow-hidden px-5">
          <div className="text-center mt-20 mb-10">
            <h1 className="text-2xl md:text-3xl font-bold mb-5">
              The Wildlife
            </h1>
            <p className="text-sm md:text-base">
              Discover amazing animals from around the world in their natural
              habitats
            </p>
            {error && (
              <p className="text-red-500 mt-2 text-sm">
                {error} - Showing fallback data
              </p>
            )}
          </div>

          {Object.keys(groupedAnimals).length > 0 ? (
            Object.entries(groupedAnimals).map(([species, animals], index) => (
              <div key={species} className="mb-16">
                <div className="text-center mb-8">
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    {species} Collection
                  </h2>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                    {animals.length} {species}
                    {animals.length !== 1 ? "s" : ""} in our collection
                  </p>
                </div>

                {index % 2 === 0 ? (
                  <TheWildLife
                    theWildLife={animals}
                    autoplay={true}
                    key={`wildlife-${species}`}
                  />
                ) : (
                  <TheWildLifeV2
                    theWildLife={animals}
                    autoplay={true}
                    key={`wildlife-v2-${species}`}
                  />
                )}
              </div>
            ))
          ) : (
            <>
              <TheWildLife theWildLife={animalData} autoplay />
              <TheWildLifeV2 theWildLife={animalData} autoplay />
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}

export default Home;
