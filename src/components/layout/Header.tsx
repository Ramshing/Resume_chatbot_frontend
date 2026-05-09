
import { Bell, Search, User } from 'lucide-react';

export function Header() {
  return (
    <header className="h-16 border-b bg-card flex items-center justify-between px-6">
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search candidates, skills..."
            className="w-full pl-10 pr-4 py-2 rounded-md border bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-2 text-muted-foreground hover:bg-accent rounded-full transition-colors">
          <Bell className="h-5 w-5" />
        </button>
        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
          <User className="h-5 w-5" />
        </div>
      </div>
    </header>
  );
}
