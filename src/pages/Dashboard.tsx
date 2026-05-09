import { StatCards } from '../components/dashboard/StatCards';
import { SkillsChart } from '../components/dashboard/SkillsChart';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { formatDate } from '../lib/utils';
import { Badge } from 'lucide-react';

const recentCandidates = [
  { name: 'Sarah Wilson', role: 'Full Stack Engineer', score: 92, date: '2024-03-20', skills: ['React', 'Node.js', 'PostgreSQL'] },
  { name: 'James Chen', role: 'Backend Developer', score: 88, date: '2024-03-19', skills: ['Python', 'Django', 'AWS'] },
  { name: 'Emily Davis', role: 'UI/UX Designer', score: 85, date: '2024-03-19', skills: ['Figma', 'React', 'Tailwind'] },
  { name: 'Michael Brown', role: 'Data Scientist', score: 79, date: '2024-03-18', skills: ['Python', 'PyTorch', 'SQL'] },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Recruiter Dashboard</h1>
          <p className="text-muted-foreground">Overview of your AI-powered hiring funnel.</p>
        </div>
      </div>
      
      <StatCards />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <SkillsChart />
        
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Top Recent Candidates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground uppercase bg-muted/30">
                  <tr>
                    <th className="px-4 py-3 font-medium">Candidate</th>
                    <th className="px-4 py-3 font-medium">Primary Skills</th>
                    <th className="px-4 py-3 font-medium">AI Score</th>
                    <th className="px-4 py-3 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {recentCandidates.map((candidate, i) => (
                    <tr key={i} className="hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-4">
                        <div className="font-semibold">{candidate.name}</div>
                        <div className="text-xs text-muted-foreground">{candidate.role}</div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex gap-1">
                          {candidate.skills.slice(0, 2).map(s => (
                            <span key={s} className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] rounded-full">{s}</span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-full bg-muted rounded-full h-1.5 max-w-[60px]">
                            <div 
                              className={`h-1.5 rounded-full ${candidate.score > 90 ? 'bg-green-500' : candidate.score > 80 ? 'bg-blue-500' : 'bg-orange-500'}`} 
                              style={{ width: `${candidate.score}%` }} 
                            />
                          </div>
                          <span className="font-medium">{candidate.score}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-muted-foreground">
                        {formatDate(candidate.date)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
