import { useState } from "react";
import { MobileHeader } from "./MobileHeader";
import { Sidebar } from "./Sidebar";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Mobile Header */}
      <MobileHeader setSidebarOpen={setSidebarOpen} />

      <div className="flex flex-1 m-5">
        {/* Sidebar */}
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Contenu principal */}
        <main
          className={cn(
            "flex-1 p-8 lg:pt-8 lg:pr-8 lg:pb-8 lg:pl-0 transition-all duration-300",
            sidebarOpen ? "lg:ml-64" : "lg:ml-64"
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
}