import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';
import { useVisitors } from '@/hooks/useVisitors';

const COLORS = ['#6b8e23', '#ffd700', '#4682b4', '#8b4513'];

const VisitorsByAgeGroup = () => {
  const { data: visitors, isLoading } = useVisitors();

  if (isLoading) return <p>Loading...</p>;

  const ageGroupData = visitors.reduce((acc: any[], visitor: any) => {
    const group = visitor.ageGroup;
    const existing = acc.find(item => item.name === group);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ name: group, count: 1 });
    }
    return acc;
  }, []);
    // Transform data for Bar Chart (Nationality)
  const nationalityData = visitors.reduce((acc: any[], visitor: any) => {
    const nat = visitor.nationality;
    const existing = acc.find(item => item.name === nat);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ name: nat, count: 1 });
    }
    return acc;
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 ">
   

      {/* Pie Chart */}
      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie 
              data={ageGroupData} 
              dataKey="count" 
              nameKey="name" 
              cx="50%" 
              cy="50%" 
              outerRadius={80} 
              label
            >
              {ageGroupData.map((_:any, index:any) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
         {/* Bar Chart */}
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={nationalityData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#4682b4" radius={[8, 8, 0, 0]}  barSize={40}/>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default VisitorsByAgeGroup;
