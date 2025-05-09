import { cn } from "@/lib/utils";
import { NavLink, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  UserRound, 
  BookOpen, // Icône pour "Classrooms"
  Settings as SettingsIcon, 
  X,
  LogOut,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export function Sidebar({ 
  sidebarOpen, 
  setSidebarOpen 
}: SidebarProps) {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [isDashboardOpen, setIsDashboardOpen] = useState(false); // État pour gérer l'ouverture du sous-menu

  // Structure des éléments de navigation avec sous-menus
  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
      subItems: [
        { id: "students", label: "Students", icon: GraduationCap, path: "/students" },
        { id: "teachers", label: "Teachers", icon: UserRound, path: "/teachers" },
        { id: "parents", label: "Parents", icon: Users, path: "/parents" },
        { id: "classrooms", label: "Classrooms", icon: BookOpen, path: "/classrooms" }, // Nouvel élément "Classrooms"
      ],
    },
  ];

  const handleLogout = () => {
    logout();
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
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:z-auto flex flex-col",
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
        <nav className="p-4 space-y-1 flex-1">
          {navItems.map((item) => (
            <div key={item.id}>
              {/* Élément principal (Dashboard) */}
              <div
                className={cn(
                  "flex items-center w-full px-3 py-2 text-sm rounded-md transition-colors cursor-pointer",
                  item.path === location.pathname
                    ? "bg-gray-100 text-black font-medium"
                    : "text-gray-600 hover:bg-gray-100 hover:text-black"
                )}
                onClick={() => {
                  navigate(item.path); // on navigue vers /dashboard
                  if (item.subItems) {
                    setIsDashboardOpen(!isDashboardOpen); // on toggle aussi le sous-menu
                  }
                  setSidebarOpen(false);
                }}
              >
                <item.icon size={18} className="mr-3" />
                <span className="flex-1">{item.label}</span>
                {item.subItems && (
                  isDashboardOpen ? (
                    <ChevronDown size={18} className="text-gray-500 transition-transform duration-300" />
                  ) : (
                    <ChevronRight size={18} className="text-gray-500 transition-transform duration-300" />
                  )
                )}
              </div>

              {/* Sous-menus (Students, Teachers, Parents, Classrooms) */}
              {item.subItems && (
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    isDashboardOpen ? "max-h-40" : "max-h-0"
                  )}
                >
                  {item.subItems.map((subItem) => (
                    <NavLink
                      key={subItem.id}
                      to={subItem.path}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center w-full px-3 py-2 text-sm rounded-md transition-colors pl-10",
                          isActive
                            ? "bg-gray-50 text-black font-medium"
                            : "text-gray-600 hover:bg-gray-50 hover:text-black"
                        )
                      }
                      onClick={() => setSidebarOpen(false)}
                    >
                      <subItem.icon size={16} className="mr-3" />
                      {subItem.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Section utilisateur en bas */}
        <div className="p-4 border-t border-gray-200">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div
                className={cn(
                  "flex items-center gap-3 p-3 rounded-md cursor-pointer transition-colors",
                  "hover:bg-gray-100"
                )}
              >
                <Avatar className="h-10 w-10">
                  <AvatarFallback>
                    {user?.name ? user.name.charAt(0) : "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">
                    {user?.name || "Utilisateur"}
                  </p>
                  <p className="text-xs text-gray-500">Administrateur</p>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  navigate("/settings");
                  setSidebarOpen(false);
                }}
                className="cursor-pointer"
              >
                <SettingsIcon className="mr-2 h-4 w-4" />
                Paramètres
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer text-red-600"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Déconnexion
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>
    </>
  );
}