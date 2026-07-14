import { Menu, User } from "lucide-react";

interface HeaderProps {
  setSidebarOpen: (isOpen: boolean) => void;
}

export default function Header({ setSidebarOpen }: HeaderProps) {
  return (
    <header className="bg-blue-600 text-white shadow-sm h-16 px-4 flex items-center lg:px-8 shrink-0 z-10 relative">
      <div className="flex items-center justify-center">
        <button
          onClick={() => setSidebarOpen(true)}
          className="mr-4 lg:hidden p-2 rounded-xl hover:bg-blue-500/50 active:bg-blue-500 transition-all focus:outline-none focus:ring-2 focus:ring-white/50"
        >
          <Menu className="h-6 w-6" />
        </button>
        <div>
          <h1 className="text-2xl font-bold tracking-wide hidden lg:block drop-shadow-sm">
            G-Scores
          </h1>
          <h1 className="text-xl font-bold tracking-wide lg:hidden drop-shadow-sm">
            G-Scores
          </h1>
        </div>
      </div>
    </header>
  );
}
