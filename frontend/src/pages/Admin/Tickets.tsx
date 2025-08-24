import React, { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Eye,
  Users,
  X,
  UserPlus,
  DollarSign,
  RefreshCw,
  Ticket,
  CheckCircle2,
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// == Types ==
interface TicketType {
  _id: string;
  visitorId: string[];
  enclosureType: "Safari" | "Bird Sanctuary" | "Reptile House";
  priceCategory: "Adult" | "Child";
  priceAmount: number;
  entryTime?: Date | string | null;
  exitTime?: Date | string | null;
  issuedAt?: Date | string;
  expiresAt?: Date | string;
  status?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

interface CreateTicketData {
  visitorId: string[];
  enclosureType: "Safari" | "Bird Sanctuary" | "Reptile House";
  priceCategory: "Adult" | "Child";
  priceAmount: number;
}

type TicketAPIResponse = {
  success: boolean;
  data: {
    tickets: TicketType[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalCount: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  };
  message?: string;
};

type CreateTicketResponse = {
  success: boolean;
  data: {
    ticket: TicketType;
  };
  message?: string;
};

// == API Methods ==
async function fetchTickets(
  queryParams?: Record<string, string | number>
): Promise<TicketAPIResponse> {
  try {
    const params = new URLSearchParams();
    if (queryParams) {
      for (const [key, value] of Object.entries(queryParams)) {
        if (value !== undefined && value !== null && value !== "") {
          params.append(key, String(value));
        }
      }
    }

    const url = `http://localhost:5000/api/v1/tickets${
      params.toString() ? `?${params.toString()}` : ""
    }`;
    console.log("Fetching tickets from:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    console.log("Response status:", response);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Fetch error:", errorText);
      throw new Error(
        `Failed to fetch tickets: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log("Fetched data:", data);

    // Handle different response structures
    if (data.success) {
      return data;
    } else if (Array.isArray(data)) {
      // If API returns array directly
      return {
        success: true,
        data: {
          tickets: data,
          pagination: {
            currentPage: 1,
            totalPages: 1,
            totalCount: data.length,
            hasNext: false,
            hasPrev: false,
          },
        },
      };
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error) {
    console.error("Error fetching tickets:", error);
    throw error;
  }
}

async function postTicket(data: CreateTicketData): Promise<TicketType> {
  try {
    console.log("Creating ticket with data:", data);

    const response = await fetch("http://localhost:5000/api/v1/tickets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    console.log("Create response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Create error:", errorText);
      throw new Error(
        `Failed to create ticket: ${response.status} ${response.statusText}`
      );
    }

    const json: CreateTicketResponse = await response.json();
    console.log("Created ticket response:", json);

    if (json.success && json.data?.ticket) {
      return json.data.ticket;
    } else if (json.data) {
      // Handle different response structures
      return json.data as any;
    } else {
      throw new Error("Invalid response format from server");
    }
  } catch (error) {
    console.error("Error creating ticket:", error);
    throw error;
  }
}

// == React Query Hooks ==
function useTickets(queryParams: Record<string, string | number>) {
  return useQuery({
    queryKey: ["tickets", queryParams],
    queryFn: () => fetchTickets(queryParams),
    retry: 2,
    staleTime: 30000, // 30 seconds
    refetchOnWindowFocus: false,
  });
}

// == Modal for creating a ticket ==
function CreateTicketModal({
  isOpen,
  onClose,
  onSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: postTicket,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
      onSuccess(); // closes modal
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });

  const [visitorId, setVisitorId] = useState("");
  const [enclosureType, setEnclosureType] = useState<
    "Safari" | "Bird Sanctuary" | "Reptile House"
  >("Safari");
  const [priceCategory, setPriceCategory] = useState<"Adult" | "Child">(
    "Adult"
  );
  const [priceAmount, setPriceAmount] = useState<number>(100);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!visitorId.trim()) {
      alert("Please enter at least one visitor ID");
      return;
    }

    const visitorIds = visitorId
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean);

    if (visitorIds.length === 0) {
      alert("Please enter valid visitor IDs");
      return;
    }

    mutation.mutate({
      visitorId: visitorIds,
      enclosureType,
      priceCategory,
      priceAmount: Number(priceAmount),
    });
  }

  function resetForm() {
    setVisitorId("");
    setEnclosureType("Safari");
    setPriceCategory("Adult");
    setPriceAmount(100);
  }

  // Reset form when closed
  React.useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md relative max-h-[90vh] overflow-y-auto">
        <button
          className="absolute right-2 top-2 p-1 hover:bg-gray-100 rounded"
          onClick={onClose}
          type="button"
        >
          <X />
        </button>
        <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
          <Plus /> Create Ticket
        </h2>
        <form className="space-y-3" onSubmit={handleSubmit}>
          <label className="block">
            <span className="font-medium">Visitor IDs (comma separated) *</span>
            <input
              value={visitorId}
              onChange={(e) => setVisitorId(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., visitor1, visitor2"
              required
            />
          </label>
          <label className="block">
            <span className="font-medium">Enclosure Type *</span>
            <select
              value={enclosureType}
              onChange={(e) =>
                setEnclosureType(
                  e.target.value as
                    | "Safari"
                    | "Bird Sanctuary"
                    | "Reptile House"
                )
              }
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="Safari">Safari</option>
              <option value="Bird Sanctuary">Bird Sanctuary</option>
              <option value="Reptile House">Reptile House</option>
            </select>
          </label>
          <label className="block">
            <span className="font-medium">Price Category *</span>
            <select
              value={priceCategory}
              onChange={(e) =>
                setPriceCategory(e.target.value as "Adult" | "Child")
              }
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="Adult">Adult</option>
              <option value="Child">Child</option>
            </select>
          </label>
          <label className="block">
            <span className="font-medium">Price Amount (₹) *</span>
            <input
              type="number"
              value={priceAmount}
              min={1}
              step={1}
              onChange={(e) => setPriceAmount(Number(e.target.value))}
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </label>
          <div className="flex gap-2 pt-2">
            <button
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-bold flex gap-2 items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <RefreshCw className="animate-spin" size={16} />
              ) : (
                <UserPlus size={16} />
              )}
              {mutation.isPending ? "Creating..." : "Create Ticket"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg font-medium"
              disabled={mutation.isPending}
            >
              Cancel
            </button>
          </div>
          {mutation.error && (
            <div className="text-red-700 text-sm py-2 px-3 bg-red-50 rounded border border-red-200">
              {mutation.error instanceof Error
                ? mutation.error.message
                : "Failed to create ticket. Please try again."}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

// == MAIN DASHBOARD ==
const TicketDashboard: React.FC = () => {
  // UI state for filtering/pagination/modal
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterEnclosure, setFilterEnclosure] = useState("");
  const [page, setPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Query params are memoized, so that useTickets only refetches when they change
  const queryParams = useMemo(() => {
    const p: Record<string, string | number> = { page, limit: 10 };
    if (searchTerm.trim()) p.search = searchTerm.trim();
    if (filterStatus) p.status = filterStatus;
    if (filterEnclosure) p.enclosureType = filterEnclosure;
    return p;
  }, [searchTerm, filterStatus, filterEnclosure, page]);

  // React Query
  const { data, isLoading, error, refetch, isFetching } =
    useTickets(queryParams);

  const tickets: TicketType[] = data?.data?.tickets ?? [];
  const pagination = data?.data?.pagination ?? {
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    hasNext: false,
    hasPrev: false,
  };

  function formatDate(dt?: string | Date | null) {
    if (!dt) return "N/A";
    try {
      return new Date(dt).toLocaleString("en-IN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      return "Invalid Date";
    }
  }

  const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800";
      case "used":
        return "bg-blue-100 text-blue-800";
      case "expired":
        return "bg-red-100 text-red-800";
      case "cancelled":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  const handleRefresh = () => {
    refetch();
  };

  const resetFilters = () => {
    setSearchTerm("");
    setFilterStatus("");
    setFilterEnclosure("");
    setPage(1);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      <CreateTicketModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={() => setShowCreateModal(false)}
      />

      <div className="max-w-7xl mx-auto">
        <p
          className="text-lg lg:text-xl font-bold text-center text-gray-900 mb-4 cursor-pointer hover:text-blue-600 transition-colors"
          onClick={() => (window.location.href = "/admin/dashboard")}
        >
          {`⬅️ Back To Dashboard`}
        </p>
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                <Ticket size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-1">
                  Zoo Ticket Management
                </h1>
                <p className="text-gray-600">
                  Manage zoo tickets and visitor entries efficiently
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 font-medium transition-colors"
            >
              <Plus size={20} /> Create New Ticket
            </button>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">
                  Total Tickets
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {isLoading ? "..." : pagination.totalCount.toLocaleString()}
                </p>
                <p className="text-xs text-green-600 mt-1">
                  {isLoading ? "Loading..." : "All time"}
                </p>
              </div>
              <div className="p-4 bg-blue-100 rounded-xl">
                <Ticket className="text-blue-600" size={28} />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">
                  Active Tickets
                </p>
                <p className="text-3xl font-bold text-green-600 mt-1">
                  {isLoading
                    ? "..."
                    : tickets.filter(
                        (t) => t.status?.toLowerCase() === "active"
                      ).length}
                </p>
                <p className="text-xs text-green-600 mt-1">Currently active</p>
              </div>
              <div className="p-4 bg-green-100 rounded-xl">
                <CheckCircle2 className="text-green-600" size={28} />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">
                  Total Revenue
                </p>
                <p className="text-3xl font-bold text-purple-600 mt-1">
                  ₹
                  {isLoading
                    ? "..."
                    : tickets
                        .reduce((sum, t) => sum + (t.priceAmount || 0), 0)
                        .toLocaleString("en-IN")}
                </p>
                <p className="text-xs text-green-600 mt-1">Current page</p>
              </div>
              <div className="p-4 bg-purple-100 rounded-xl">
                <DollarSign className="text-purple-600" size={28} />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">
                  Avg. Visitors/Ticket
                </p>
                <p className="text-3xl font-bold text-orange-600 mt-1">
                  {isLoading
                    ? "..."
                    : tickets.length > 0
                    ? (
                        tickets.reduce(
                          (sum, t) =>
                            sum + (t.visitorId ? t.visitorId.length : 0),
                          0
                        ) / tickets.length
                      ).toFixed(1)
                    : "0"}
                </p>
                <p className="text-xs text-blue-600 mt-1">Group bookings</p>
              </div>
              <div className="p-4 bg-orange-100 rounded-xl">
                <Users className="text-orange-600" size={28} />
              </div>
            </div>
          </div>
        </div>

        {/* FILTERS & SEARCH */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
          <div className="flex flex-wrap gap-4">
            <div className="relative flex-1 min-w-[200px]">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search by ticket ID, visitor ID, or enclosure..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Used">Used</option>
              <option value="Expired">Expired</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <select
              value={filterEnclosure}
              onChange={(e) => setFilterEnclosure(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Enclosures</option>
              <option value="Safari">🦁 Safari</option>
              <option value="Bird Sanctuary">🦅 Bird Sanctuary</option>
              <option value="Reptile House">🐍 Reptile House</option>
            </select>
            <button
              onClick={handleRefresh}
              disabled={isFetching}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
            >
              <RefreshCw
                size={20}
                className={isFetching ? "animate-spin" : ""}
              />
              {isFetching ? "Loading..." : "Refresh"}
            </button>
            <button
              onClick={resetFilters}
              className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-3 rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* ERROR */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-800 px-4 py-3 rounded mb-4">
            <p className="font-semibold">Error fetching tickets:</p>
            <p className="text-sm">
              {String((error as Error)?.message || error)}
            </p>
            <button
              onClick={handleRefresh}
              className="mt-2 text-sm underline hover:no-underline"
            >
              Try again
            </button>
          </div>
        )}

        {/* TICKETS TABLE */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Ticket size={20} />
              Ticket Records ({isLoading ? "..." : tickets.length})
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ticket Info
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Visitors
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Enclosure & Category
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timing
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <RefreshCw className="animate-spin mx-auto mb-2" />
                      Loading tickets...
                    </td>
                  </tr>
                ) : tickets.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      <Ticket className="mx-auto mb-2" size={48} />
                      <p className="text-lg">No tickets found</p>
                      <p className="text-sm">
                        Try adjusting your filters or create a new ticket
                      </p>
                    </td>
                  </tr>
                ) : (
                  tickets.map((ticket) => (
                    <tr key={ticket._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-mono text-sm">
                            #{ticket._id.slice(-8)}
                          </div>
                          <div className="text-xs text-gray-500">
                            {formatDate(ticket.issuedAt)}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          <Users size={14} className="mr-1" />
                          {ticket.visitorId?.length || 0} visitor
                          {(ticket.visitorId?.length || 0) !== 1 ? "s" : ""}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <div className="font-medium">
                            {ticket.enclosureType}
                          </div>
                          <div className="text-gray-500">
                            {ticket.priceCategory}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold">
                          ₹{ticket.priceAmount?.toLocaleString("en-IN") || 0}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            ticket.status
                          )}`}
                        >
                          {ticket.status || "Active"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-gray-500">
                        <div>Entry: {formatDate(ticket.entryTime)}</div>
                        <div>Exit: {formatDate(ticket.exitTime)}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            title="View"
                            className="p-1 hover:bg-gray-100 rounded"
                          >
                            <Eye size={16} className="text-gray-600" />
                          </button>
                          <button
                            title="Edit"
                            className="p-1 hover:bg-gray-100 rounded"
                          >
                            <Edit2 size={16} className="text-gray-600" />
                          </button>
                          <button
                            title="Delete"
                            className="p-1 hover:bg-gray-100 rounded"
                          >
                            <Trash2 size={16} className="text-red-600" />
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

        {/* PAGINATION */}
        {tickets.length > 0 && (
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              disabled={!pagination.hasPrev || isLoading}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {pagination.currentPage} of {pagination.totalPages}(
              {pagination.totalCount} total tickets)
            </span>
            <button
              disabled={!pagination.hasNext || isLoading}
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketDashboard;
