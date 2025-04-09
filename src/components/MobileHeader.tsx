import { Menu } from "lucide-react";

interface MobileHeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

export function MobileHeader({ setSidebarOpen }: MobileHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 lg:hidden">
      <div className="flex items-center justify-between h-16 px-4">
        <button
          className="p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-bold">School Manager</h1>
        <div className="w-8" /> {/* Spacer for alignment */}
      </div>
    </header>
  );
}