import { Users, FileText, TrendingUp, Award } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';

const stats = [
  { label: 'Total Resumes', value: '1,284', icon: FileText, color: 'text-blue-500' },
  { label: 'Top Match Candidates', value: '42', icon: Award, color: 'text-green-500' },
  { label: 'Shortlisted Today', value: '12', icon: TrendingUp, color: 'text-purple-500' },
  { label: 'Active Openings', value: '8', icon: Users, color: 'text-orange-500' },
];

export function StatCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="p-6 flex items-center space-x-4">
            <div className={`p-3 rounded-full bg-muted/50 ${stat.color}`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
