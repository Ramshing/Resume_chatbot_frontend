import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Upload, MessageSquare, Users, Settings, LogOut } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAuthStore } from '../../store/useAuthStore';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Upload Resumes', href: '/upload', icon: Upload },
  { name: 'AI Candidate Chat', href: '/chat', icon: MessageSquare },
  { name: 'Talent Pool', href: '/resumes', icon: Users },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className="flex h-full w-64 flex-col border-r bg-card">
      <div className="flex h-16 items-center px-6 border-b">
        <span className="text-xl font-bold text-primary">ResumeAI</span>
      </div>
      <nav className="flex-1 space-y-1 px-4 py-4">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              cn(
                'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )
            }
          >
            <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
            {item.name}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t">
        <button
          onClick={logout}
          className="flex w-full items-center px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive rounded-md transition-colors"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  );
}
