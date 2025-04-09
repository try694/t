// src/app/dashboard/layout.tsx
import { Navbar } from "./_components/navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-gray-900 text-white">
      {/* Left sidebar */}
      <Navbar />

      {/* Main content area */}
      <main className="flex-1 p-4 overflow-hidden">
        {/* Container that can scroll horizontally/vertically if needed */}
        <div className="w-full h-full">
          {children}
        </div>
      </main>
    </div>
  );
}
