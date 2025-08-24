import { AnimalFocusCards } from "@/components/cards/AnimalFocusCards";
import Layout from "@/layouts/Layout";
import { useAnimals } from "@/hooks/useAnimals";
import { useState } from "react";

// Animal interface based on your API response
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

function Animals() {
  const [selectedSpecies, setSelectedSpecies] = useState<string>("");
  const [selectedHealthStatus, setSelectedHealthStatus] = useState<string>("");

  // Fetch animals data with optional filters
  const {
    data: animalsResponse,
    isLoading,
    error,
  } = useAnimals({
    limit: 50,
    page: 1,
    ...(selectedSpecies && { species: selectedSpecies }),
    ...(selectedHealthStatus && { health_status: selectedHealthStatus }),
  });

  // Extract unique species and health statuses for filters
  const getUniqueValues = (
    animals: Animal[],
    field: keyof Animal
  ): string[] => {
    if (!animals) return [];
    return [
      ...new Set(
        animals.map((animal) => {
          const value = animal[field];
          // Ensure we only return strings
          return typeof value === "string" ? value : "";
        })
      ),
    ].filter(Boolean);
  };

  const animals = animalsResponse?.data || animalsResponse || [];
  const uniqueSpecies = getUniqueValues(animals, "species");
  const uniqueHealthStatuses = getUniqueValues(animals, "health_status");

  if (isLoading) {
    return (
      <Layout>
        <section className="my-30">
          <div className="container mx-auto px-5">
            <div className="text-center mt-20 mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-5">
                Our Amazing Animals
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Loading our wonderful collection...
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

  if (error) {
    return (
      <Layout>
        <section className="my-30">
          <div className="container mx-auto px-5">
            <div className="text-center mt-20 mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-5 text-red-500">
                Oops! Something went wrong
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Failed to load animal data. Please try again later.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Reload Page
              </button>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="my-30">
        <div className="container mx-auto px-5">
          {/* Header Section */}
          <div className="text-center mt-20 mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-5">
              Our Amazing Animals
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Discover the incredible diversity of wildlife in our care
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="bg-green-100 dark:bg-green-900 px-4 py-2 rounded-full">
                <span className="text-green-800 dark:text-green-200 font-semibold">
                  {animals.length} Animals
                </span>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900 px-4 py-2 rounded-full">
                <span className="text-blue-800 dark:text-blue-200 font-semibold">
                  {uniqueSpecies.length} Species
                </span>
              </div>
            </div>
          </div>

          {/* Filter Section */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Filter by Species
              </label>
              <select
                value={selectedSpecies}
                onChange={(e) => setSelectedSpecies(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">All Species</option>
                {uniqueSpecies.map((species, index) => (
                  <option
                    key={`species-${index}-${species}`}
                    value={species as string}
                  >
                    {species as string}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Filter by Health Status
              </label>
              <select
                value={selectedHealthStatus}
                onChange={(e) => setSelectedHealthStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">All Status</option>
                {uniqueHealthStatuses.map((status, index) => (
                  <option
                    key={`status-${index}-${status}`}
                    value={status as string}
                  >
                    {status as string}
                  </option>
                ))}
              </select>
            </div>

            {(selectedSpecies || selectedHealthStatus) && (
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSelectedSpecies("");
                    setSelectedHealthStatus("");
                  }}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>

          {/* Animals Grid */}
          <div className="mt-20">
            <AnimalFocusCards animals={animals} />
          </div>

          {/* Results Count */}
          {(selectedSpecies || selectedHealthStatus) && (
            <div className="text-center mt-8">
              <p className="text-gray-600 dark:text-gray-400">
                Showing {animals.length} animals
                {selectedSpecies && ` in ${selectedSpecies}`}
                {selectedHealthStatus && ` with ${selectedHealthStatus} status`}
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

export default Animals;
