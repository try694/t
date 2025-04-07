// src/app/dashboard/layout.tsx

import { Navbar } from "./_components/navbar";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-dark-gradient text-white">
      {/* Left sidebar */}
       <Navbar />
      {/* Main content area */}
      <main className="flex-1 p-4">
        {children}
      </main>
    </div>
  );
}
