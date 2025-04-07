import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom"; // Importer NavLink
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  UserRound, 
  Settings as SettingsIcon, 
  X,
  LogOut
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export function Sidebar({ 
  sidebarOpen, 
  setSidebarOpen 
}: SidebarProps) {
  const { logout } = useAuth();
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { id: "students", label: "Students", icon: GraduationCap, path: "/students" },
    { id: "teachers", label: "Teachers", icon: UserRound, path: "/teachers" },
    { id: "parents", label: "Parents", icon: Users, path: "/parents" },
    { id: "settings", label: "Settings", icon: SettingsIcon, path: "/settings" },
  ];

  const handleLogout = () => {
    logout(); // Appelle la fonction logout du contexte
    setSidebarOpen(false);
  };

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:z-auto",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* En-tête de la sidebar (visible uniquement sur desktop) */}
        <div className="lg:flex hidden items-center justify-between h-16 px-4 border-b border-gray-200">
          <h1 className="text-xl font-bold">School Manager</h1>
        </div>

        {/* Bouton de fermeture (visible uniquement sur mobile) */}
        <div className="flex lg:hidden items-center justify-between h-16 px-4 border-b border-gray-200">
          <h1 className="text-xl font-bold">School Manager</h1>
          <button 
            className="p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center w-full px-3 py-2 text-sm rounded-md transition-colors",
                  isActive
                    ? "bg-gray-100 text-black font-medium"
                    : "text-gray-600 hover:bg-gray-100 hover:text-black"
                )
              }
              onClick={() => setSidebarOpen(false)} // Ferme la sidebar sur mobile après navigation
            >
              <item.icon size={18} className="mr-3" />
              {item.label}
            </NavLink>
          ))}
          {/* Bouton de déconnexion */}
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-3 py-2 text-sm text-gray-600 rounded-md transition-colors hover:bg-gray-100 hover:text-black"
          >
            <LogOut size={18} className="mr-3" />
            Déconnexion
          </button>
        </nav>
      </aside>
    </>
  );
}