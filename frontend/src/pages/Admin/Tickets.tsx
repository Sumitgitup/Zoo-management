import React, { useState, useEffect, useMemo, useCallback } from "react"; // Added useCallback
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Eye,
  Filter,
  Calendar,
  Users,
  MapPin,
  X,
  UserPlus,
  UserCheck,
} from "lucide-react";
import axios from "axios";

// Types based on your schema
interface Ticket {
  _id: string;
  visitorId: string[];
  enclosureType: "Safari" | "Bird Sanctuary" | "Reptile House";
  priceCategory: "Adult" | "Child";
  priceAmount: number;
  entryTime?: Date | null;
  exitTime?: Date | null;
  issuedAt?: Date;
  expiresAt?: Date;
  status?: string;
}

interface CreateTicketData {
  visitorId: string[];
  enclosureType: "Safari" | "Bird Sanctuary" | "Reptile House";
  priceCategory: "Adult" | "Child";
  priceAmount: number;
  entryTime?: Date | null;
  exitTime?: Date | null;
  issuedAt?: Date;
  expiresAt?: Date;
  status?: string;
}

// NEW: Visitor Interface
interface Visitor {
  _id: string;
  name: string;
  email: string;
  age: number;
  nationality?: "Indian" | "Foreigner";
  phone?: string;
}

// ===========================================================================
// CreateVisitorModal Component
// ===========================================================================
interface CreateVisitorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVisitorCreated: (visitorId: string) => void;
}

const CreateVisitorModal: React.FC<CreateVisitorModalProps> = ({
  isOpen,
  onClose,
  onVisitorCreated,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [nationality, setNationality] = useState<"Indian" | "Foreigner">(
    "Indian"
  );
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_VISITORS_URL = "/api/v1/visitors";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (name.trim().length < 3) {
      setError("Name must be at least 3 characters long.");
      setLoading(false);
      return;
    }
    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }
    const parsedAge = parseInt(age);
    if (isNaN(parsedAge) || parsedAge <= 0) {
      setError("Age must be a positive number.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(API_VISITORS_URL, {
        name,
        email,
        age: parsedAge,
        nationality,
        phone: phone.trim() || undefined,
      });
      onVisitorCreated(response.data._id);
      handleClose();
    } catch (err) {
      setError("Failed to create visitor. Please try again.");
      console.error("Error creating visitor:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setName("");
    setEmail("");
    setAge("");
    setNationality("Indian");
    setPhone("");
    setError(null);
    setLoading(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 font-sans">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">
            Create New Visitor
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded-lg text-sm"
              role="alert"
            >
              {error}
            </div>
          )}
          <div>
            <label
              htmlFor="visitorName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="visitorName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow disabled:bg-gray-100"
              required
            />
          </div>
          <div>
            <label
              htmlFor="visitorEmail"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="visitorEmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow disabled:bg-gray-100"
              required
            />
          </div>
          <div>
            <label
              htmlFor="visitorAge"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Age
            </label>
            <input
              type="number"
              id="visitorAge"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow disabled:bg-gray-100"
              required
            />
          </div>
          <div>
            <label
              htmlFor="visitorNationality"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nationality
            </label>
            <select
              id="visitorNationality"
              value={nationality}
              onChange={(e) =>
                setNationality(e.target.value as "Indian" | "Foreigner")
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow disabled:bg-gray-100"
            >
              <option value="Indian">Indian</option>
              <option value="Foreigner">Foreigner</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="visitorPhone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone (Optional)
            </label>
            <input
              type="text"
              id="visitorPhone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow disabled:bg-gray-100"
            />
          </div>
          <div className="flex justify-end gap-2 pt-4 border-t border-gray-200 mt-6">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <Plus size={20} />
              )}
              Create Visitor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ===========================================================================
// SelectVisitorModal Component
// ===========================================================================
interface SelectVisitorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVisitorSelected: (visitorId: string) => void;
  existingVisitors: Visitor[];
  loadingVisitors: boolean;
  fetchVisitors: () => void; // Function to refresh visitors list
}

const SelectVisitorModal: React.FC<SelectVisitorModalProps> = ({
  isOpen,
  onClose,
  onVisitorSelected,
  existingVisitors,
  loadingVisitors,
  fetchVisitors,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVisitorId, setSelectedVisitorId] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (isOpen) {
      // Fetch visitors when modal opens
      fetchVisitors();
      // Reset selected visitor when modal opens
      setSelectedVisitorId(null);
      setSearchTerm("");
    }
  }, [isOpen, fetchVisitors]); // fetchVisitors is now memoized, preventing infinite loop

  const filteredVisitors = useMemo(() => {
    return existingVisitors.filter(
      (visitor) =>
        visitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        visitor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        visitor._id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [existingVisitors, searchTerm]);

  const handleSelect = () => {
    if (selectedVisitorId) {
      onVisitorSelected(selectedVisitorId);
      // onClose is called by onVisitorSelected callback in TicketDashboard
    }
  };

  const handleClose = () => {
    setSearchTerm("");
    setSelectedVisitorId(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 font-sans">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">
            Select Existing Visitor
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mb-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search visitors by name, email, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
            />
          </div>
        </div>

        <div className="h-64 overflow-y-auto border border-gray-200 rounded-lg p-2 mb-4 bg-gray-50">
          {loadingVisitors ? (
            <p className="text-center text-gray-500 py-4">
              Loading visitors...
            </p>
          ) : filteredVisitors.length === 0 ? (
            <p className="text-center text-gray-500 py-4">No visitors found.</p>
          ) : (
            <ul className="space-y-2">
              {filteredVisitors.map((visitor) => (
                <li
                  key={visitor._id}
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedVisitorId === visitor._id
                      ? "bg-blue-100 border-blue-500 border"
                      : "bg-white hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedVisitorId(visitor._id)}
                >
                  <div>
                    <p className="font-medium text-gray-900">{visitor.name}</p>
                    <p className="text-sm text-gray-600">{visitor.email}</p>
                    <p className="text-xs text-gray-500">
                      ID: {visitor._id.slice(-6)}
                    </p>
                  </div>
                  {selectedVisitorId === visitor._id && (
                    <UserCheck size={20} className="text-blue-600" />
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t border-gray-200 mt-6">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSelect}
            disabled={!selectedVisitorId}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <UserCheck size={20} />
            Select Visitor
          </button>
        </div>
      </div>
    </div>
  );
};

// ===========================================================================
// TicketDashboard Component
// ===========================================================================
const TicketDashboard: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingVisitors, setLoadingVisitors] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterEnclosure, setFilterEnclosure] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [showCreateVisitorModal, setShowCreateVisitorModal] = useState(false);
  const [showSelectVisitorModal, setShowSelectVisitorModal] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit" | "view">(
    "create"
  );
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [formData, setFormData] = useState<CreateTicketData>({
    visitorId: [""],
    enclosureType: "Safari",
    priceCategory: "Adult",
    priceAmount: 0,
    entryTime: null,
    exitTime: null,
    status: "Active",
  });

  const API_BASE_URL = "http://localhost:5000/api/v1/tickets";
  const API_VISITORS_URL = "http://localhost:5000/api/v1/visitors";

  const fetchTickets = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_BASE_URL);
      setTickets(response.data.data.tickets);
    } catch (err) {
      setError("Failed to fetch tickets");
      console.error("Error fetching tickets:", err);
    } finally {
      setLoading(false);
    }
  };

  // Memoized fetchVisitors function to prevent re-renders
  const fetchVisitors = useCallback(async () => {
    setLoadingVisitors(true);
    try {
      const response = await axios.get(API_VISITORS_URL);
      setVisitors(response.data.data.visitors);
    } catch (err) {
      console.error("Error fetching visitors:", err);
    } finally {
      setLoadingVisitors(false);
    }
  }, [API_VISITORS_URL]); // Dependency on constant URL

  const createTicket = async () => {
    try {
      const payload = {
        ...formData,
        visitorId: formData.visitorId.filter((id) => id.trim() !== ""),
        issuedAt: new Date(),
      };
      const response = await axios.post(API_BASE_URL, payload);
      setTickets([...tickets, response.data.data.tickets]);
      resetForm();
      setShowModal(false);
    } catch (err) {
      setError("Failed to create ticket");
      console.error("Error creating ticket:", err);
    }
  };

  const updateTicket = async () => {
    if (!selectedTicket) {
      setError("No ticket selected for update.");
      return;
    }
    try {
      const response = await axios.put(
        `${API_BASE_URL}/${selectedTicket._id}`,
        {
          ...formData,
          visitorId: formData.visitorId.filter((id) => id.trim() !== ""),
        }
      );
      setTickets(
        tickets.map((t) => (t._id === selectedTicket._id ? response.data : t))
      );
      resetForm();
      setShowModal(false);
    } catch (err) {
      setError("Failed to update ticket");
      console.error("Error updating ticket:", err);
    }
  };

  const deleteTicket = async (id: string) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this ticket?"
    );
    if (!userConfirmed) return;

    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      setTickets(tickets.filter((t) => t._id !== id));
    } catch (err) {
      setError("Failed to delete ticket");
      console.error("Error deleting ticket:", err);
    }
  };

  const resetForm = () => {
    setFormData({
      visitorId: [""],
      enclosureType: "Safari",
      priceCategory: "Adult",
      priceAmount: 0,
      entryTime: null,
      exitTime: null,
      status: "Active",
    });
    setSelectedTicket(null);
  };

  const openModal = (mode: "create" | "edit" | "view", ticket?: Ticket) => {
    setModalMode(mode);
    if (ticket) {
      setSelectedTicket(ticket);
      setFormData({
        visitorId: ticket.visitorId,
        enclosureType: ticket.enclosureType,
        priceCategory: ticket.priceCategory,
        priceAmount: ticket.priceAmount,
        entryTime: ticket.entryTime,
        exitTime: ticket.exitTime,
        status: ticket.status || "Active",
      });
    } else {
      resetForm();
    }
    setShowModal(true);
  };

  const updateVisitorId = (index: number, value: string) => {
    const newVisitorIds = [...formData.visitorId];
    newVisitorIds[index] = value;
    setFormData({ ...formData, visitorId: newVisitorIds });
  };

  const addVisitorIdField = () => {
    if (formData.visitorId.length < 10) {
      setFormData({ ...formData, visitorId: [...formData.visitorId, ""] });
    }
  };

  const removeVisitorId = (index: number) => {
    if (formData.visitorId.length > 1) {
      const newVisitorIds = formData.visitorId.filter((_, i) => i !== index);
      setFormData({ ...formData, visitorId: newVisitorIds });
    } else {
      setFormData({ ...formData, visitorId: [""] });
    }
  };

  const handleVisitorCreated = (newVisitorId: string) => {
    setFormData((prevFormData) => {
      const updatedVisitorIds = [...prevFormData.visitorId];
      const emptyIndex = updatedVisitorIds.findIndex((id) => id.trim() === "");

      if (emptyIndex !== -1) {
        updatedVisitorIds[emptyIndex] = newVisitorId;
      } else {
        updatedVisitorIds.push(newVisitorId);
      }
      return { ...prevFormData, visitorId: updatedVisitorIds };
    });
    setShowCreateVisitorModal(false);
    fetchVisitors(); // Refresh visitors list to include the new one
  };

  const handleVisitorSelected = (selectedVisitorId: string) => {
    setFormData((prevFormData) => {
      const updatedVisitorIds = [...prevFormData.visitorId];
      if (!updatedVisitorIds.includes(selectedVisitorId)) {
        const emptyIndex = updatedVisitorIds.findIndex(
          (id) => id.trim() === ""
        );
        if (emptyIndex !== -1) {
          updatedVisitorIds[emptyIndex] = selectedVisitorId;
        } else if (updatedVisitorIds.length < 10) {
          updatedVisitorIds.push(selectedVisitorId);
        } else {
          setError(
            "Maximum of 10 visitor IDs allowed per ticket. Could not add more."
          );
          console.error("Maximum of 10 visitor IDs allowed per ticket.");
          return prevFormData; // Do not update if max reached
        }
      } else {
        setError("Visitor ID already added to this ticket.");
        console.warn("Visitor ID already exists in the list.");
        return prevFormData; // Do not update if already present
      }
      return { ...prevFormData, visitorId: updatedVisitorIds };
    });
    // Only close the modal if a new ID was successfully added or it was already present
    // This allows the error message to be seen if max IDs is hit
    if (
      formData.visitorId.length < 10 &&
      !formData.visitorId.includes(selectedVisitorId)
    ) {
      setShowSelectVisitorModal(false);
    }
  };

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.visitorId.some((id) =>
        id.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      ticket.enclosureType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || ticket.status === filterStatus;
    const matchesEnclosure =
      filterEnclosure === "all" || ticket.enclosureType === filterEnclosure;

    return matchesSearch && matchesStatus && matchesEnclosure;
  });

  const formatDate = (date: Date | string | null | undefined) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    fetchTickets();
    fetchVisitors();
  }, [fetchVisitors]); // Added fetchVisitors to dependency array, now safe because it's memoized

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Ticket Management
              </h1>
              <p className="text-gray-600">
                Manage zoo tickets and visitor entries
              </p>
            </div>
            <button
              onClick={() => openModal("create")}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Plus size={20} />
              Create Ticket
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Tickets</p>
                <p className="text-2xl font-bold text-gray-900">
                  {tickets.length}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Users className="text-blue-600" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Tickets</p>
                <p className="text-2xl font-bold text-green-600">
                  {tickets.filter((t) => t.status === "Active").length}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Calendar className="text-green-600" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-purple-600">
                  $
                  {tickets
                    .reduce((sum, t) => sum + t.priceAmount, 0)
                    .toFixed(2)}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <MapPin className="text-purple-600" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Visitors/Ticket</p>
                <p className="text-2xl font-bold text-orange-600">
                  {tickets.length > 0
                    ? (
                        tickets.reduce(
                          (sum, t) => sum + t.visitorId.length,
                          0
                        ) / tickets.length
                      ).toFixed(1)
                    : "0"}
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Users className="text-orange-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search by visitor ID or enclosure..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Used">Used</option>
              <option value="Expired">Expired</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <select
              value={filterEnclosure}
              onChange={(e) => setFilterEnclosure(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
            >
              <option value="all">All Enclosures</option>
              <option value="Safari">Safari</option>
              <option value="Bird Sanctuary">Bird Sanctuary</option>
              <option value="Reptile House">Reptile House</option>
            </select>
            <button
              onClick={fetchTickets}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center justify-center gap-2 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              <Filter size={20} />
              Refresh
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6"
            role="alert"
          >
            {error}
          </div>
        )}

        {/* Tickets Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ticket ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Visitors
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Enclosure
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Issued At
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      Loading tickets...
                    </td>
                  </tr>
                ) : filteredTickets.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No tickets found
                    </td>
                  </tr>
                ) : (
                  filteredTickets.map((ticket) => (
                    <tr
                      key={ticket._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {ticket._id.slice(-6)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {ticket.visitorId.length} visitor
                          {ticket.visitorId.length !== 1 ? "s" : ""}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {ticket.enclosureType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {ticket.priceCategory}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${ticket.priceAmount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            ticket.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : ticket.status === "Used"
                              ? "bg-gray-100 text-gray-800"
                              : ticket.status === "Expired"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {ticket.status || "Active"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(ticket.issuedAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openModal("view", ticket)}
                            className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50 transition-colors"
                            title="View details"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => openModal("edit", ticket)}
                            className="text-green-600 hover:text-green-900 p-1 rounded-full hover:bg-green-50 transition-colors"
                            title="Edit ticket"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => deleteTicket(ticket._id)}
                            className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50 transition-colors"
                            title="Delete ticket"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Ticket Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 font-sans">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800">
                  {modalMode === "create"
                    ? "Create New Ticket"
                    : modalMode === "edit"
                    ? "Edit Ticket"
                    : "Ticket Details"}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                {/* Visitor IDs */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Visitor IDs (
                    {formData.visitorId.filter((id) => id.trim() !== "").length}
                    /10)
                  </label>
                  {formData.visitorId.map((id, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={id}
                        onChange={(e) => updateVisitorId(index, e.target.value)}
                        placeholder="Enter visitor ID"
                        disabled={modalMode === "view"}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow disabled:bg-gray-100"
                      />
                      {modalMode !== "view" && (
                        <button
                          onClick={() => removeVisitorId(index)}
                          className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remove visitor ID"
                          type="button"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                  {modalMode !== "view" && formData.visitorId.length < 10 && (
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {" "}
                      {/* Added flex-wrap for responsiveness */}
                      <button
                        onClick={addVisitorIdField}
                        className="text-gray-600 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-lg text-sm flex items-center gap-1 transition-colors"
                        type="button"
                      >
                        <Plus size={16} /> Add ID Input
                      </button>
                      <button
                        onClick={() => setShowSelectVisitorModal(true)}
                        className="text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-lg text-sm flex items-center gap-1 transition-colors"
                        type="button"
                      >
                        <UserCheck size={16} /> Select Existing Visitor
                      </button>
                      <button
                        onClick={() => setShowCreateVisitorModal(true)}
                        className="text-purple-600 bg-purple-50 hover:bg-purple-100 px-3 py-1 rounded-lg text-sm flex items-center gap-1 transition-colors"
                        type="button"
                      >
                        <UserPlus size={16} /> Create New Visitor
                      </button>
                    </div>
                  )}
                </div>

                {/* Enclosure Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enclosure Type
                  </label>
                  <select
                    value={formData.enclosureType}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        enclosureType: e.target.value as any,
                      })
                    }
                    disabled={modalMode === "view"}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow disabled:bg-gray-100"
                  >
                    <option value="Safari">Safari</option>
                    <option value="Bird Sanctuary">Bird Sanctuary</option>
                    <option value="Reptile House">Reptile House</option>
                  </select>
                </div>

                {/* Price Category and Amount */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price Category
                    </label>
                    <select
                      value={formData.priceCategory}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          priceCategory: e.target.value as any,
                        })
                      }
                      disabled={modalMode === "view"}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow disabled:bg-gray-100"
                    >
                      <option value="Adult">Adult</option>
                      <option value="Child">Child</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price Amount ($)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.priceAmount}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          priceAmount: parseFloat(e.target.value) || 0,
                        })
                      }
                      disabled={modalMode === "view"}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow disabled:bg-gray-100"
                    />
                  </div>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status || "Active"}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    disabled={modalMode === "view"}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow disabled:bg-gray-100"
                  >
                    <option value="Active">Active</option>
                    <option value="Used">Used</option>
                    <option value="Expired">Expired</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                {/* Entry and Exit Times */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Entry Time (Optional)
                    </label>
                    <input
                      type="datetime-local"
                      value={
                        formData.entryTime
                          ? new Date(formData.entryTime)
                              .toISOString()
                              .slice(0, 16)
                          : ""
                      }
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          entryTime: e.target.value
                            ? new Date(e.target.value)
                            : null,
                        })
                      }
                      disabled={modalMode === "view"}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Exit Time (Optional)
                    </label>
                    <input
                      type="datetime-local"
                      value={
                        formData.exitTime
                          ? new Date(formData.exitTime)
                              .toISOString()
                              .slice(0, 16)
                          : ""
                      }
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          exitTime: e.target.value
                            ? new Date(e.target.value)
                            : null,
                        })
                      }
                      disabled={modalMode === "view"}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow disabled:bg-gray-100"
                    />
                  </div>
                </div>

                {/* Expires At */}
                {modalMode !== "create" && selectedTicket && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expires At
                    </label>
                    <input
                      type="datetime-local"
                      value={
                        selectedTicket.expiresAt
                          ? new Date(selectedTicket.expiresAt)
                              .toISOString()
                              .slice(0, 16)
                          : ""
                      }
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 disabled:cursor-not-allowed"
                    />
                  </div>
                )}
              </div>

              {/* Modal Actions */}
              <div className="flex justify-end gap-2 pt-4 border-t border-gray-200 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
                  type="button"
                >
                  {modalMode === "view" ? "Close" : "Cancel"}
                </button>
                {modalMode === "create" && (
                  <button
                    onClick={createTicket}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="submit"
                  >
                    Create Ticket
                  </button>
                )}
                {modalMode === "edit" && (
                  <button
                    onClick={updateTicket}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
                    type="submit"
                  >
                    Update Ticket
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Render CreateVisitorModal */}
        <CreateVisitorModal
          isOpen={showCreateVisitorModal}
          onClose={() => setShowCreateVisitorModal(false)}
          onVisitorCreated={handleVisitorCreated}
        />

        {/* Render SelectVisitorModal */}
        <SelectVisitorModal
          isOpen={showSelectVisitorModal}
          onClose={() => setShowSelectVisitorModal(false)}
          onVisitorSelected={handleVisitorSelected}
          existingVisitors={visitors}
          loadingVisitors={loadingVisitors}
          fetchVisitors={fetchVisitors}
        />
      </div>
    </div>
  );
};

export default TicketDashboard;
