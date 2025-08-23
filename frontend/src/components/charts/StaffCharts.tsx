import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';

const COLORS = ['#4caf50', '#ff9800', '#2196f3', '#9c27b0'];

const StaffCharts = () => {
  // Dummy data for staff roles
  const staffRoles = [
    { name: 'Zookeeper', count: 10 },
    { name: 'Veterinarian', count: 4 },
    { name: 'Guide', count: 6 },
    { name: 'Admin', count: 3 },
  ];

  // Dummy data for departments
  const departmentData = [
    { name: 'Maintenance', count: 5 },
    { name: 'Animal Care', count: 8 },
    { name: 'Security', count: 4 },
    { name: 'Management', count: 2 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Staff Roles Pie Chart */}
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie 
              data={staffRoles} 
              dataKey="count" 
              nameKey="name" 
              cx="50%" 
              cy="50%" 
              outerRadius={80} 
              label
            >
              {staffRoles.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Departments Bar Chart */}
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={departmentData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#4caf50" radius={[8, 8, 0, 0]} barSize={40}/>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StaffCharts;
