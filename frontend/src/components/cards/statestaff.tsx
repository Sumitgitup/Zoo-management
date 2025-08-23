import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, Briefcase, Clock } from "lucide-react";

export function StaffStatCards() {
  const staffStats = [
    { title: "Total Staff", value: 54, icon: <Users className="h-5 w-5 text-blue-600" /> },
    { title: "Active Staff", value: 23, icon: <Briefcase className="h-5 w-5 text-green-600" /> },
    { title: "On Leave", value: 9, icon: <Clock className="h-5 w-5 text-orange-600" /> }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {staffStats.map((stat, index) => (
        <Card key={index} className="bg-background border border-muted shadow-md p-3">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            {stat.icon}
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stat.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
