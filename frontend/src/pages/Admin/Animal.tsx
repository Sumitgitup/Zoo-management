import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Search,
  BarChart3,
  Users,
  Heart,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import axios from "axios";

interface Enclosure {
  id: string;
  name: string;
}

interface Animal {
  _id: string;
  name: string;
  species: string;
  date_of_birth: string;
  gender: "Male" | "Female" | "";
  health_status: "Healthy" | "Under Observation" | "Requires Attention" | "";
  description?: string;
  imageUrl?: string;
  arrival_date: string;
  enclosure?: Enclosure;
}

interface AnimalFormData {
  name: string;
  species: string;
  date_of_birth: string;
  gender: "Male" | "Female" | "";
  health_status: "Healthy" | "Under Observation" | "Requires Attention" | "";
  description: string;
  arrival_date: string;
}

interface Stats {
  total: number;
  healthy: number;
  underObservation: number;
  requiresAttention: number;
  males: number;
  females: number;
  recentArrivals: number;
  species: number;
}

type FilterStatus =
  | "all"
  | "Healthy"
  | "Under Observation"
  | "Requires Attention";

// Mock API responses for development (remove in production)
// const mockApiResponses = {
//   getAnimals: (): Promise<AxiosResponse<Animal[]>> =>
//     new Promise((resolve) =>
//       setTimeout(
//         () =>
//           resolve({
//             data: [
//               {
//                 id: 1,
//                 name: "Leo",
//                 species: "Lion",
//                 date_of_birth: "2020-03-15",
//                 gender: "Male" as const,
//                 health_status: "Healthy" as const,
//                 description: "Adult male lion, very active",
//                 arrival_date: "2020-05-01",
//                 enclosure: { name: "Savanna Habitat", id: "ENC001" },
//               },
//               {
//                 id: 2,
//                 name: "Bella",
//                 species: "Elephant",
//                 date_of_birth: "2018-08-22",
//                 gender: "Female" as const,
//                 health_status: "Under Observation" as const,
//                 description: "Young elephant, friendly with visitors",
//                 arrival_date: "2019-01-15",
//                 enclosure: { name: "Elephant Sanctuary", id: "ENC002" },
//               },
//               {
//                 id: 3,
//                 name: "Charlie",
//                 species: "Chimpanzee",
//                 date_of_birth: "2019-12-10",
//                 gender: "Male" as const,
//                 health_status: "Requires Attention" as const,
//                 description: "Playful and intelligent",
//                 arrival_date: "2020-02-28",
//                 enclosure: { name: "Primate House", id: "ENC003" },
//               },
//               {
//                 id: 4,
//                 name: "Maya",
//                 species: "Tiger",
//                 date_of_birth: "2021-01-20",
//                 gender: "Female" as const,
//                 health_status: "Healthy" as const,
//                 description: "Young female tiger, loves swimming",
//                 arrival_date: "2024-01-10",
//                 enclosure: { name: "Tiger Territory", id: "ENC004" },
//               },
//             ],
//             status: 200,
//             statusText: "OK",
//             headers: {},
//             config: {} as any,
//           }),
//         500
//       )
//     ),

//   createAnimal: (data: AnimalFormData): Promise<AxiosResponse<Animal>> =>
//     new Promise((resolve) =>
//       setTimeout(
//         () =>
//           resolve({
//             data: { ...data, id: Date.now() } as Animal,
//             status: 201,
//             statusText: "Created",
//             headers: {},
//             config: {} as any,
//           }),
//         300
//       )
//     ),

//   updateAnimal: (data: AnimalFormData): Promise<AxiosResponse<Animal>> =>
//     new Promise((resolve) =>
//       setTimeout(
//         () =>
//           resolve({
//             data: data as Animal,
//             status: 200,
//             statusText: "OK",
//             headers: {},
//             config: {} as any,
//           }),
//         300
//       )
//     ),

//   deleteAnimal: (): Promise<AxiosResponse<{ success: boolean }>> =>
//     new Promise((resolve) =>
//       setTimeout(
//         () =>
//           resolve({
//             data: { success: true },
//             status: 200,
//             statusText: "OK",
//             headers: {},
//             config: {} as any,
//           }),
//         300
//       )
//     ),
// };

// const API_BASE_URL = "http://localhost:4000/api/v1/animals";

const AnimalAdminDashboard: React.FC = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editingAnimal, setEditingAnimal] = useState<Animal | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [formData, setFormData] = useState<AnimalFormData>({
    name: "",
    species: "",
    date_of_birth: "",
    gender: "",
    health_status: "",
    description: "",
    arrival_date: "",
  });

  // API Functions
  const fetchAnimals = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/v1/animals");
      console.log(response.data.data);
      setAnimals(response.data.data);
    } catch (error) {
      console.error("Error fetching animals:", error);
      alert("Failed to fetch animals");
    } finally {
      setLoading(false);
    }
  };

  const createAnimal = async (animalData: AnimalFormData): Promise<void> => {
    try {
      console.log("Before", animalData);
      setSubmitting(true);
      const response = await axios.post<Animal>(
        "http://localhost:5000/api/v1/animals",
        animalData
      );
      setAnimals((prev) => [...prev, response.data]);
      resetForm();
      alert("Animal created successfully!");
    } catch (error) {
      console.error("Error creating animal:", error);
      alert("Failed to create animal");
    } finally {
      setSubmitting(false);
    }
  };

  const updateAnimal = async (
    id: string,
    animalData: AnimalFormData
  ): Promise<void> => {
    try {
      setSubmitting(true);
      const response = await axios.put<Animal>(
        `http://localhost:5000/api/v1/animals/${id}`,
        animalData
      );
      setAnimals((prev) =>
        prev.map((animal) =>
          animal._id === id ? { ...response.data, id } : animal
        )
      );
      resetForm();
      alert("Animal updated successfully!");
    } catch (error) {
      console.error("Error updating animal:", error);
      alert("Failed to update animal");
    } finally {
      setSubmitting(false);
    }
  };

  const deleteAnimal = async (id: string): Promise<void> => {
    if (!confirm("Are you sure you want to delete this animal?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/v1/animals/${id}`);
      setAnimals((prev) => prev.filter((animal) => animal._id !== id));
      alert("Animal deleted successfully!");
    } catch (error) {
      console.error("Error deleting animal:", error);
      alert("Failed to delete animal");
    }
  };

  // Load animals on component mount
  useEffect(() => {
    fetchAnimals();
  }, []);

  // Calculate statistics
  const stats: Stats = {
    total: animals.length,
    healthy: animals.filter((a) => a.health_status === "Healthy").length,
    underObservation: animals.filter(
      (a) => a.health_status === "Under Observation"
    ).length,
    requiresAttention: animals.filter(
      (a) => a.health_status === "Requires Attention"
    ).length,
    males: animals.filter((a) => a.gender === "Male").length,
    females: animals.filter((a) => a.gender === "Female").length,
    recentArrivals: animals.filter((a) => {
      const arrivalDate = new Date(a.arrival_date);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return arrivalDate > thirtyDaysAgo;
    }).length,
    species: new Set(animals.map((a) => a.species)).size,
  };

  // Filter animals based on search and filter
  const filteredAnimals: Animal[] = animals.filter((animal) => {
    const matchesSearch =
      animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      animal.species.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || animal.health_status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();

    // Basic form validation
    if (
      !formData.name.trim() ||
      !formData.species.trim() ||
      !formData.arrival_date
    ) {
      alert("Please fill in all required fields");
      return;
    }

    if (editingAnimal) {
      await updateAnimal(editingAnimal._id, formData);
    } else {
      await createAnimal(formData);
    }
  };

  const handleEdit = (animal: Animal): void => {
    setEditingAnimal(animal);
    setFormData({
      name: animal.name,
      species: animal.species,
      date_of_birth: animal.date_of_birth,
      gender: animal.gender,
      health_status: animal.health_status,
      description: animal.description || "",
      arrival_date: animal.arrival_date,
    });
    setShowModal(true);
  };

  const handleDelete = (id: string): void => {
    deleteAnimal(id);
  };

  const resetForm = (): void => {
    setFormData({
      name: "",
      species: "",
      date_of_birth: "",
      gender: "",
      health_status: "",
      description: "",
      arrival_date: "",
    });
    setEditingAnimal(null);
    setShowModal(false);
  };

  const getHealthStatusColor = (status: string): string => {
    switch (status) {
      case "Healthy":
        return "text-green-600 bg-green-100";
      case "Under Observation":
        return "text-yellow-600 bg-yellow-100";
      case "Requires Attention":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const calculateAge = (birthDate: string): number => {
    const today = new Date();
    const birth = new Date(birthDate);
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      return age - 1;
    }
    return age;
  };

  const handleFormInputChange = (
    field: keyof AnimalFormData,
    value: string
  ): void => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading animals...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <p
            className="text-lg lg:text-xl font-bold text-center text-gray-900 mb-2 cursor-pointer hover:text-blue-600 transition-colors"
            onClick={() => (window.location.href = "/admin/dashboard")}
          >
            {`⬅️ Back To Dashboard`}
          </p>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            Staff Dashboard
          </h2>
          <p className="text-gray-600">Manage your zoo's animal collection</p>
        </div>

        {/* Compact Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 lg:gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4 text-center">
            <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <div className="text-xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-xs text-gray-600">Total</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 text-center">
            <Heart className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <div className="text-xl font-bold text-gray-900">
              {stats.healthy}
            </div>
            <div className="text-xs text-gray-600">Healthy</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 text-center">
            <AlertTriangle className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
            <div className="text-xl font-bold text-gray-900">
              {stats.underObservation}
            </div>
            <div className="text-xs text-gray-600">Observing</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 text-center">
            <AlertTriangle className="h-6 w-6 text-red-600 mx-auto mb-2" />
            <div className="text-xl font-bold text-gray-900">
              {stats.requiresAttention}
            </div>
            <div className="text-xs text-gray-600">Attention</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 text-center">
            <BarChart3 className="h-6 w-6 text-purple-600 mx-auto mb-2" />
            <div className="text-xl font-bold text-gray-900">
              {stats.species}
            </div>
            <div className="text-xs text-gray-600">Species</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 text-center">
            <Plus className="h-6 w-6 text-indigo-600 mx-auto mb-2" />
            <div className="text-xl font-bold text-gray-900">
              {stats.recentArrivals}
            </div>
            <div className="text-xs text-gray-600">Recent</div>
          </div>
        </div>

        {/* Gender Stats - Compact Row */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-700">
              Gender Distribution
            </h3>
            <div className="flex space-x-6">
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">
                  {stats.males}
                </div>
                <div className="text-xs text-gray-600">Males</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-pink-600">
                  {stats.females}
                </div>
                <div className="text-xs text-gray-600">Females</div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls - Compact */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-48"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filterStatus}
                onChange={(e) =>
                  setFilterStatus(e.target.value as FilterStatus)
                }
              >
                <option value="all">All Status</option>
                <option value="Healthy">Healthy</option>
                <option value="Under Observation">Under Observation</option>
                <option value="Requires Attention">Requires Attention</option>
              </select>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 text-white px-4 py-2 text-sm rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Animal
            </button>
          </div>
        </div>

        {/* Animals Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Species
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Age
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Gender
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Enclosure
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAnimals.map((animal) => (
                  <tr key={animal._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {animal.name}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {animal.species}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {calculateAge(animal.date_of_birth)} yrs
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {animal.gender}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs leading-4 font-medium rounded-full ${getHealthStatusColor(
                          animal.health_status
                        )}`}
                      >
                        {animal.health_status === "Under Observation"
                          ? "Observing"
                          : animal.health_status === "Requires Attention"
                          ? "Attention"
                          : animal.health_status}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {animal.enclosure?.name || "Unassigned"}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEdit(animal)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                        disabled={submitting}
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(animal._id)}
                        className="text-red-600 hover:text-red-900"
                        disabled={submitting}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {editingAnimal ? "Edit Animal" : "Add New Animal"}
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.name}
                      onChange={(e) =>
                        handleFormInputChange("name", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Species *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.species}
                      onChange={(e) =>
                        handleFormInputChange("species", e.target.value)
                      }
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.date_of_birth}
                        onChange={(e) =>
                          handleFormInputChange("date_of_birth", e.target.value)
                        }
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Gender
                      </label>
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.gender}
                        onChange={(e) =>
                          handleFormInputChange(
                            "gender",
                            e.target.value as "Male" | "Female" | ""
                          )
                        }
                      >
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Health Status
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.health_status}
                      onChange={(e) =>
                        handleFormInputChange(
                          "health_status",
                          e.target.value as
                            | "Healthy"
                            | "Under Observation"
                            | "Requires Attention"
                            | ""
                        )
                      }
                    >
                      <option value="">Select Status</option>
                      <option value="Healthy">Healthy</option>
                      <option value="Under Observation">
                        Under Observation
                      </option>
                      <option value="Requires Attention">
                        Requires Attention
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Arrival Date *
                    </label>
                    <input
                      type="date"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.arrival_date}
                      onChange={(e) =>
                        handleFormInputChange("arrival_date", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.description}
                      onChange={(e) =>
                        handleFormInputChange("description", e.target.value)
                      }
                    />
                  </div>

                  <div className="flex justify-end space-x-3 mt-6">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                      disabled={submitting}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                      disabled={submitting}
                    >
                      {submitting && (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      )}
                      {editingAnimal ? "Update" : "Create"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimalAdminDashboard;
