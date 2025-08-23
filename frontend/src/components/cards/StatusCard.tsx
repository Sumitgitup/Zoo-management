import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface StatCardProps {
  title: string
  value: number
  icon?: React.ReactNode
}

//given below is the usage of this card 
{/* <StatCard title="Total Adult Visitors (National)" value={100} icon={<Users className="w-5 h-5 text-primary" />} /> */}


export function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <Card className="bg-background border border-muted shadow-md">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  )
}
