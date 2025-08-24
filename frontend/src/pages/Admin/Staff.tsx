import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Search,
  Users,
  Briefcase,
  Shield,
  Loader2,
  UserCheck,
  UserX,
} from "lucide-react";
import axios from "axios";

// This interface represents the full data structure from the backend
interface Staff {
  _id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: "Admin" | "Veterinarian" | "Caretaker" | "Volunteer" | "Receptionist";
  department: "Medical" | "Operations" | "Adoption" | "Administration" | "Maintenance";
  isActive: boolean;
  hireDate: string;
}

// This interface represents only the data we will manage in the form
interface StaffFormData {
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  phone: string;
  role: "Admin" | "Veterinarian" | "Caretaker" | "Volunteer" | "Receptionist" | "";
  department: "Medical" | "Operations" | "Adoption" | "Administration" | "Maintenance" | "";
  hireDate: string;
  isActive: boolean;
}

interface StaffStats {
  total: number;
  active: number;
  inactive: number;
  veterinarians: number;
  caretakers: number;
}

type FilterRole = "all" | "Admin" | "Veterinarian" | "Caretaker" | "Volunteer" | "Receptionist";

const StaffAdminDashboard: React.FC = () => {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterRole, setFilterRole] = useState<FilterRole>("all");
  
  const initialFormData: StaffFormData = {
    employeeId: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    role: "",
    department: "",
    hireDate: "",
    isActive: true,
  };
  const [formData, setFormData] = useState<StaffFormData>(initialFormData);

  // API Functions
  const fetchStaff = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/v1/staffs");
      setStaff(response.data?.data?.staffs || response.data?.data || response.data || []);
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
      const response = await axios.post("http://localhost:5000/api/v1/staffs", staffData);
      const newStaff = response.data?.data || response.data;
      setStaff((prev) => [...prev, newStaff]);
      resetForm();
      alert("Staff member created successfully!");
    } catch (error) {
      console.error("Error creating staff member:", error);
      alert("Failed to create staff member");
    } finally {
      setSubmitting(false);
    }
  };

  const updateStaff = async (id: string, staffData: StaffFormData): Promise<void> => {
    try {
      setSubmitting(true);
      const { password, ...updateData } = staffData; // Never send password on update
      const response = await axios.put(`http://localhost:5000/api/v1/staffs/${id}`, updateData);
      const updatedStaff = response.data?.data || response.data;
      setStaff((prev) => prev.map((s) => (s._id === id ? { ...updatedStaff, _id: id } : s)));
      resetForm();
      alert("Staff member updated successfully!");
    } catch (error) {
      console.error("Error updating staff member:", error);
      alert("Failed to update staff member");
    } finally {
      setSubmitting(false);
    }
  };

  const deleteStaff = async (id: string): Promise<void> => {
    if (!confirm("Are you sure you want to delete this staff member?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/v1/staffs/${id}`);
      setStaff((prev) => prev.filter((s) => s._id !== id));
      alert("Staff member deleted successfully!");
    } catch (error) {
      console.error("Error deleting staff member:", error);
      alert("Failed to delete staff member");
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const stats: StaffStats = {
    total: staff.length,
    active: staff.filter((s) => s.isActive).length,
    inactive: staff.filter((s) => !s.isActive).length,
    veterinarians: staff.filter((s) => s.role === "Veterinarian").length,
    caretakers: staff.filter((s) => s.role === "Caretaker").length,
  };

  const filteredStaff = staff.filter((s) => {
    const fullName = `${s.firstName} ${s.lastName}`;
    const matchesSearch =
      fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterRole === "all" || s.role === filterRole;
    return matchesSearch && matchesFilter;
  });

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();
    if (!formData.employeeId || !formData.firstName || !formData.lastName || !formData.email) {
      alert("Please fill in Employee ID, Name, and Email.");
      return;
    }
    if (editingStaff) {
      await updateStaff(editingStaff._id, formData);
    } else {
      if (!formData.password || formData.password.length < 6) {
        alert("Password is required for new staff and must be at least 6 characters.");
        return;
      }
      await createStaff(formData);
    }
  };

  const handleEdit = (staffMember: Staff): void => {
    setEditingStaff(staffMember);
    setFormData({
      employeeId: staffMember.employeeId,
      firstName: staffMember.firstName,
      lastName: staffMember.lastName,
      email: staffMember.email,
      phone: staffMember.phone,
      role: staffMember.role,
      department: staffMember.department,
      hireDate: staffMember.hireDate ? staffMember.hireDate.split("T")[0] : "",
      isActive: staffMember.isActive,
    });
    setShowModal(true);
  };

  const resetForm = (): void => {
    setFormData(initialFormData);
    setEditingStaff(null);
    setShowModal(false);
  };

  const handleFormInputChange = (field: keyof StaffFormData, value: string | boolean): void => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" /> <p className="ml-4">Loading staff data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">Staff Dashboard</h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
            <StatCard icon={<Users/>} title="Total Staff" value={stats.total} color="blue"/>
            <StatCard icon={<UserCheck/>} title="Active" value={stats.active} color="green"/>
            <StatCard icon={<UserX/>} title="Inactive" value={stats.inactive} color="yellow"/>
            <StatCard icon={<Shield/>} title="Vets" value={stats.veterinarians} color="pink"/>
            <StatCard icon={<Briefcase/>} title="Caretakers" value={stats.caretakers} color="purple"/>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative"><Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" /><input type="text" placeholder="Search by name or email..." className="pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-md w-full sm:w-64" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/></div>
              <select className="px-3 py-2 text-sm border border-gray-300 rounded-md" value={filterRole} onChange={(e) => setFilterRole(e.target.value as FilterRole)}>
                <option value="all">All Roles</option>
                <option value="Admin">Admin</option><option value="Veterinarian">Veterinarian</option><option value="Caretaker">Caretaker</option><option value="Volunteer">Volunteer</option><option value="Receptionist">Receptionist</option>
              </select>
            </div>
            <button onClick={() => setShowModal(true)} className="bg-blue-600 text-white px-4 py-2 text-sm rounded-md hover:bg-blue-700 flex items-center justify-center"><Plus className="h-4 w-4 mr-2" />Add Staff</button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStaff.map((member) => (
                <tr key={member._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap"><div className="text-sm font-medium text-gray-900">{member.firstName} {member.lastName}</div><div className="text-xs text-gray-500">{member.email}</div></td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">{member.role}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">{member.department}</td>
                  <td className="px-4 py-3 whitespace-nowrap"><span className={`px-2 py-1 text-xs font-medium rounded-full ${member.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{member.isActive ? "Active" : "Inactive"}</span></td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm"><button onClick={() => handleEdit(member)} className="text-blue-600 hover:text-blue-900 mr-3"><Edit2 className="h-4 w-4" /></button><button onClick={() => deleteStaff(member._id)} className="text-red-600 hover:text-red-900"><Trash2 className="h-4 w-4" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-10 mx-auto p-5 border w-full max-w-lg shadow-lg rounded-md bg-white">
              <h3 className="text-lg font-medium text-gray-900 mb-4">{editingStaff ? "Edit Staff Member" : "Add New Staff Member"}</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField label="Employee ID *" value={formData.employeeId} onChange={(e) => handleFormInputChange("employeeId", e.target.value)} />
                    <InputField label="First Name *" value={formData.firstName} onChange={(e) => handleFormInputChange("firstName", e.target.value)} />
                    <InputField label="Last Name *" value={formData.lastName} onChange={(e) => handleFormInputChange("lastName", e.target.value)} />
                    <InputField label="Email *" type="email" value={formData.email} onChange={(e) => handleFormInputChange("email", e.target.value)} />
                    <InputField label="Phone *" value={formData.phone} onChange={(e) => handleFormInputChange("phone", e.target.value)} />
                    <InputField label="Hire Date" type="date" value={formData.hireDate} onChange={(e) => handleFormInputChange("hireDate", e.target.value)} />
                    <SelectField label="Role" value={formData.role} onChange={(e) => handleFormInputChange("role", e.target.value)} options={["Admin", "Veterinarian", "Caretaker", "Volunteer", "Receptionist"]} />
                    <SelectField label="Department" value={formData.department} onChange={(e) => handleFormInputChange("department", e.target.value)} options={["Medical", "Operations", "Adoption", "Administration", "Maintenance"]} />
                    {!editingStaff && <InputField label="Password *" type="password" value={formData.password} onChange={(e) => handleFormInputChange("password", e.target.value)} placeholder="Min 6 characters"/>}
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button onClick={resetForm} className="px-4 py-2 border rounded-md" disabled={submitting}>Cancel</button>
                  <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center" disabled={submitting}>
                    {submitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    {editingStaff ? "Update Member" : "Create Member"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper components
const InputField = ({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
    <div><label className="block text-sm font-medium text-gray-700 mb-1">{label}</label><input {...props} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/></div>
);
const SelectField = ({ label, options, ...props }: { label: string, options: string[] } & React.SelectHTMLAttributes<HTMLSelectElement>) => (
    <div><label className="block text-sm font-medium text-gray-700 mb-1">{label}</label><select {...props} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"><option value="">Select...</option>{options.map(opt => <option key={opt} value={opt}>{opt}</option>)}</select></div>
);
const StatCard = ({ icon, title, value, color }: { icon: React.ReactNode, title: string, value: number, color: StatCardColor }) => {
    const colorClasses: Record<StatCardColor, string> = { blue: 'text-blue-600', green: 'text-green-600', yellow: 'text-yellow-600', purple: 'text-purple-600', pink: 'text-pink-600', indigo: 'text-indigo-600', gray: 'text-gray-600' };
    return (<div className="bg-white rounded-lg shadow-sm p-3 text-center"><div className={`mx-auto mb-2 ${colorClasses[color] || 'text-gray-600'}`}>{icon}</div><div className="text-xl font-bold text-gray-900">{value}</div><div className="text-xs text-gray-600">{title}</div></div>);
}

// Define the type for StatCard colors to satisfy TypeScript
type StatCardColor = "blue" | "green" | "yellow" | "purple" | "pink" | "indigo" | "gray";

export default StaffAdminDashboard;
