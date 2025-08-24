import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Search,
  Users,
  Briefcase,
  UserCheck,
  Loader2,
} from "lucide-react";

// Types
interface Staff {
  _id: string;
  name: string;
  role: string;
  department: "Animal Care" | "Maintenance" | "Security" | "Management" | "";
  contact_number: string;
  email: string;
  joining_date: string;
}

interface StaffFormData {
  name: string;
  role: string;
  department: "Animal Care" | "Maintenance" | "Security" | "Management" | "";
  contact_number: string;
  email: string;
  joining_date: string;
}

// Mock API functions (replace with actual API calls)
const mockApiCall = (delay: number = 1000) => 
  new Promise(resolve => setTimeout(resolve, delay));

const StaffAdminDashboard: React.FC = () => {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [formData, setFormData] = useState<StaffFormData>({
    name: "",
    role: "",
    department: "",
    contact_number: "",
    email: "",
    joining_date: "",
  });

  // Mock data for demonstration
  const mockStaffData: Staff[] = [
    {
      _id: "1",
      name: "John Doe",
      role: "Zookeeper",
      department: "Animal Care",
      contact_number: "+1234567890",
      email: "john.doe@zoo.com",
      joining_date: "2023-01-15"
    },
    {
      _id: "2",
      name: "Jane Smith",
      role: "Veterinarian",
      department: "Animal Care",
      contact_number: "+1234567891",
      email: "jane.smith@zoo.com",
      joining_date: "2022-08-20"
    },
    {
      _id: "3",
      name: "Mike Johnson",
      role: "Security Officer",
      department: "Security",
      contact_number: "+1234567892",
      email: "mike.johnson@zoo.com",
      joining_date: "2023-03-10"
    }
  ];

  // API Functions (using mock data for demonstration)
  const fetchStaff = async (): Promise<void> => {
    try {
      setLoading(true);
      await mockApiCall(800);
      // In real implementation: const response = await fetch('/api/v1/staff');
      // const data = await response.json();
      setStaff(mockStaffData);
    } catch (error) {
      console.error("Error fetching staff:", error);
      alert("Failed to fetch staff");
    } finally {
      setLoading(false);
    }
  };

  const createStaff = async (staffData: StaffFormData): Promise<void> => {
    try {
      setSubmitting(true);
      await mockApiCall(500);
      
      // Create new staff with generated ID
      const newStaff: Staff = {
        ...staffData,
        _id: Date.now().toString(), // Simple ID generation for demo
      };
      
      // In real implementation:
      // const response = await fetch('/api/v1/staff', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(staffData)
      // });
      // const data = await response.json();
      
      setStaff((prev) => [...prev, newStaff]);
      resetForm();
      alert("Staff created successfully!");
    } catch (error) {
      console.error("Error creating staff:", error);
      alert("Failed to create staff");
    } finally {
      setSubmitting(false);
    }
  };

  const updateStaff = async (
    id: string,
    staffData: StaffFormData
  ): Promise<void> => {
    try {
      setSubmitting(true);
      await mockApiCall(500);
      
      // In real implementation:
      // const response = await fetch(`/api/v1/staff/${id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(staffData)
      // });
      // const updatedStaff = await response.json();
      
      setStaff((prev) =>
        prev.map((s) => (s._id === id ? { ...staffData, _id: id } : s))
      );
      resetForm();
      alert("Staff updated successfully!");
    } catch (error) {
      console.error("Error updating staff:", error);
      alert("Failed to update staff");
    } finally {
      setSubmitting(false);
    }
  };

  const deleteStaff = async (id: string): Promise<void> => {
    if (!window.confirm("Are you sure you want to delete this staff member?")) return;

    try {
      await mockApiCall(300);
      
      // In real implementation:
      // await fetch(`/api/v1/staff/${id}`, { method: 'DELETE' });
      
      setStaff((prev) => prev.filter((s) => s._id !== id));
      alert("Staff deleted successfully!");
    } catch (error) {
      console.error("Error deleting staff:", error);
      alert("Failed to delete staff");
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const filteredStaff = staff.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();
    
    if (
      !formData.name.trim() ||
      !formData.role.trim() ||
      !formData.email.trim()
    ) {
      alert("Please fill in all required fields");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address");
      return;
    }

    if (editingStaff) {
      await updateStaff(editingStaff._id, formData);
    } else {
      await createStaff(formData);
    }
  };

  const handleEdit = (s: Staff): void => {
    setEditingStaff(s);
    setFormData({
      name: s.name,
      role: s.role,
      department: s.department,
      contact_number: s.contact_number,
      email: s.email,
      joining_date: s.joining_date,
    });
    setShowModal(true);
  };

  const resetForm = (): void => {
    setFormData({
      name: "",
      role: "",
      department: "",
      contact_number: "",
      email: "",
      joining_date: "",
    });
    setEditingStaff(null);
    setShowModal(false);
  };

  const handleDepartmentChange = (value: string): void => {
    setFormData({
      ...formData,
      department: value as "Animal Care" | "Maintenance" | "Security" | "Management" | "",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading staff...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            Staff Dashboard
          </h1>
          <p className="text-gray-600">Manage your zoo's staff members</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search by name, role, or department..."
                className="pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 text-white px-4 py-2 text-sm rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Staff
            </button>
          </div>
        </div>

        {/* Staff Count Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Total Staff</p>
                <p className="text-2xl font-bold text-gray-900">{staff.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center">
              <Briefcase className="h-8 w-8 text-green-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Departments</p>
                <p className="text-2xl font-bold text-gray-900">
                  {new Set(staff.map(s => s.department).filter(d => d)).size}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center">
              <UserCheck className="h-8 w-8 text-purple-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold text-gray-900">{filteredStaff.length}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStaff.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                      {searchTerm ? "No staff members found matching your search." : "No staff members found."}
                    </td>
                  </tr>
                ) : (
                  filteredStaff.map((s) => (
                    <tr key={s._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {s.name}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {s.role}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          s.department === 'Animal Care' ? 'bg-green-100 text-green-800' :
                          s.department === 'Security' ? 'bg-blue-100 text-blue-800' :
                          s.department === 'Maintenance' ? 'bg-yellow-100 text-yellow-800' :
                          s.department === 'Management' ? 'bg-purple-100 text-purple-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {s.department || 'Unassigned'}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {s.email}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {s.contact_number}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleEdit(s)}
                          className="text-blue-600 hover:text-blue-900 mr-3 p-1"
                          disabled={submitting}
                          title="Edit staff member"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteStaff(s._id)}
                          className="text-red-600 hover:text-red-900 p-1"
                          disabled={submitting}
                          title="Delete staff member"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
            <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md mx-auto">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {editingStaff ? "Edit Staff" : "Add New Staff"}
                </h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Enter full name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                      Role *
                    </label>
                    <input
                      id="role"
                      type="text"
                      placeholder="Enter job role"
                      value={formData.role}
                      onChange={(e) =>
                        setFormData({ ...formData, role: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                      Department
                    </label>
                    <select
                      id="department"
                      value={formData.department}
                      onChange={(e) => handleDepartmentChange(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Department</option>
                      <option value="Animal Care">Animal Care</option>
                      <option value="Maintenance">Maintenance</option>
                      <option value="Security">Security</option>
                      <option value="Management">Management</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Number
                    </label>
                    <input
                      id="contact"
                      type="tel"
                      placeholder="Enter contact number"
                      value={formData.contact_number}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          contact_number: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Enter email address"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="joining_date" className="block text-sm font-medium text-gray-700 mb-1">
                      Joining Date
                    </label>
                    <input
                      id="joining_date"
                      type="date"
                      value={formData.joining_date}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          joining_date: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                      disabled={submitting}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                      disabled={submitting}
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="inline h-4 w-4 mr-2 animate-spin" />
                          {editingStaff ? "Updating..." : "Creating..."}
                        </>
                      ) : (
                        editingStaff ? "Update Staff" : "Create Staff"
                      )}
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

export default StaffAdminDashboard;