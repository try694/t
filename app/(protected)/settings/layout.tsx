// src/app/dashboard/layout.tsx
import { signOut } from "@/auth";
import Sidebar from "@/components/nav/page";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-dark-gradient text-white">
      {/* Left sidebar */}
       <Sidebar />
      {/* Main content area */}
      <main className="flex-1 p-4">
        {children}
      </main>
      <form action={async () => {
        "use server";

        await signOut();
      }}>
        <button type="submit" className="p-1 px-3 right-5 relative top-5 bg-gray-700 hover:bg-red-600 hover:text-white text-red-500 rounded-xl font-semibold text-sm font-poppins">SignOut</button>
      </form>
    </div>
  );
}
