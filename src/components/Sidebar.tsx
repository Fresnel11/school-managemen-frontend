import { useState } from "react";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  UserRound, 
  Settings as SettingsIcon, 
  X 
} from "lucide-react";

interface SidebarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export function Sidebar({ 
  currentPage, 
  setCurrentPage, 
  sidebarOpen, 
  setSidebarOpen 
}: SidebarProps) {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "students", label: "Students", icon: GraduationCap },
    { id: "teachers", label: "Teachers", icon: UserRound },
    { id: "parents", label: "Parents", icon: Users },
    { id: "settings", label: "Settings", icon: SettingsIcon },
  ];

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
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <h1 className="text-xl font-bold">School Manager</h1>
          <button 
            className="p-1 rounded-md lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentPage(item.id);
                setSidebarOpen(false);
              }}
              className={cn(
                "flex items-center w-full px-3 py-2 text-sm rounded-md transition-colors",
                currentPage === item.id
                  ? "bg-gray-100 text-black font-medium"
                  : "text-gray-600 hover:bg-gray-100 hover:text-black"
              )}
            >
              <item.icon size={18} className="mr-3" />
              {item.label}
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
}