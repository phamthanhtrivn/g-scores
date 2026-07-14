import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Search, BarChart2 } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Search Scores", href: "/search", icon: Search },
    { name: "Reports", href: "/reports", icon: BarChart2 },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 transition-opacity lg:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar component */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-xl lg:shadow-md transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-center h-16 border-b border-gray-100 bg-blue-600 text-white lg:hidden">
          <span className="text-xl font-bold tracking-wide">Menu</span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? "bg-blue-50 text-blue-700 shadow-sm"
                    : "text-gray-500 hover:bg-gray-50 hover:text-blue-600"
                }`}
              >
                <Icon
                  className={`mr-3 h-5 w-5 transition-colors duration-200 ${
                    isActive
                      ? "text-blue-700"
                      : "text-gray-400 group-hover:text-blue-600"
                  }`}
                />
                <span
                  className={`font-medium ${isActive ? "font-semibold" : ""}`}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
