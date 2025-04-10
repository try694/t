"use client";

import React, { useState } from "react";
import { UserButton } from "@/components/auth/user-button";
import Navbar from "./_components/navbar";

interface LayoutProps {
  children?: React.ReactNode;
}

export default function DashboardLayout({ children }: LayoutProps) {
  const SIDEBAR_OPEN_WIDTH = 240;
  const SIDEBAR_CLOSED_WIDTH = 60;

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="min-h-screen flex bg-gray-900 text-white">
      {/* Sidebar */}
      <Navbar
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        openWidth={SIDEBAR_OPEN_WIDTH}
        closedWidth={SIDEBAR_CLOSED_WIDTH}
      />

      {/* Main Content */}
      <main
        style={{
          marginLeft: sidebarOpen
            ? `${SIDEBAR_OPEN_WIDTH}px`
            : `${SIDEBAR_CLOSED_WIDTH}px`,
        }}
        className="relative flex-1 p-12 overflow-hidden transition-all duration-300"
      >
        <div className="w-full h-full">{children || <div>No content provided</div>}</div>
        
        {/* UserButton in the top-right corner */}
        <div className="absolute top-6 right-10">
          <UserButton />
        </div>
      </main>
    </div>
  );
}
