"use client";

import Link from "next/link";
import { FiHome, FiBarChart2, FiUser, FiSettings } from "react-icons/fi";

export default async function Sidebar() {


  return (
    <div className="w-64 bg-dark-gradient p-4">
      {/* Logo Section */}
      <div className="mb-8 flex items-center justify-center">
        <img src="/logo.png" alt="Logo" className="w-28 h-auto" />
      </div>
      {/* Navigation */}
      <nav>
        <ul className="space-y-2">
          {/* Common links */}
          <li>
            <Link href="/dashboard/overview" className="flex items-center gap-2 text-white px-3 py-2 rounded hover:bg-neutral-700 transition">
              <FiHome size={20} />
              <span className="text-sm font-medium">Overview</span>
            </Link>
          </li>
         
            
              <li>
                <Link href="/dashboard/usermanagement" className="flex items-center gap-2 text-white px-3 py-2 rounded hover:bg-neutral-700 transition">
                  <FiBarChart2 size={20} />
                  <span className="text-sm font-medium">User Management</span>
                </Link>
              </li>
              <li>
                <Link href="/dashboard/waitinglist" className="flex items-center gap-2 text-white px-3 py-2 rounded hover:bg-neutral-700 transition">
                  <FiUser size={20} />
                  <span className="text-sm font-medium">Waiting List</span>
                </Link>
              </li>
            
          
          <li>
            <Link href="/dashboard/v2trades" className="flex items-center gap-2 text-white px-3 py-2 rounded hover:bg-neutral-700 transition">
              <FiUser size={20} />
              <span className="text-sm font-medium">V2 Trades</span>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/v3trades" className="flex items-center gap-2 text-white px-3 py-2 rounded hover:bg-neutral-700 transition">
              <FiUser size={20} />
              <span className="text-sm font-medium">V3 Trades</span>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/v4trades" className="flex items-center gap-2 text-white px-3 py-2 rounded hover:bg-neutral-700 transition">
              <FiUser size={20} />
              <span className="text-sm font-medium">V4 Trades</span>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/bridge" className="flex items-center gap-2 text-white px-3 py-2 rounded hover:bg-neutral-700 transition">
              <FiUser size={20} />
              <span className="text-sm font-medium">Bridge</span>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/multihop" className="flex items-center gap-2 text-white px-3 py-2 rounded hover:bg-neutral-700 transition">
              <FiUser size={20} />
              <span className="text-sm font-medium">Multi-Hop</span>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/pooltrade" className="flex items-center gap-2 text-white px-3 py-2 rounded hover:bg-neutral-700 transition">
              <FiUser size={20} />
              <span className="text-sm font-medium">Pool Trade</span>
            </Link>
          </li>
          {/* Logout Button */}
       
        </ul>
      </nav>
    </div>
  );
}
