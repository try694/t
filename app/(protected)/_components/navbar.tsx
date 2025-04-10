"use client";

import React from "react";
import Link from "next/link";
import { FiHome, FiBarChart2, FiUser, FiMenu } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  openWidth: number;
  closedWidth: number;
}

export default function Navbar({ isOpen, toggleSidebar, openWidth, closedWidth }: NavbarProps) {
  const sidebarVariants = {
    open: { width: openWidth },
    closed: { width: closedWidth },
  };

  const navItems = [
    { href: "/settings", icon: <FiHome size={20} />, text: "Overview" },
    { href: "/approveduser", icon: <FiBarChart2 size={20} />, text: "Members" },
    { href: "/waitinglist", icon: <FiUser size={20} />, text: "Waiting List" },
    { href: "/dashboard/v2trades", icon: <FiUser size={20} />, text: "V2 Trades" },
    { href: "/dashboard/v3trades", icon: <FiUser size={20} />, text: "V3 Trades" },
    { href: "/dashboard/v4trades", icon: <FiUser size={20} />, text: "V4 Trades" },
  ];

  return (
    <motion.div
      initial={false}
      animate={isOpen ? "open" : "closed"}
      variants={sidebarVariants}
      transition={{ duration: 0.3 }}
      className="bg-gray-950 h-screen shadow-md flex flex-col overflow-hidden fixed left-0 top-0 z-40"
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b barlow bg-black-gradient border-gray-800 min-w-[64px]">
        <AnimatePresence>
          {isOpen && (
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              src="/logo.png"
              alt="Logo"
              className="w-16 h-auto"
            />
          )}
        </AnimatePresence>
        <button 
          onClick={toggleSidebar} 
          className="text-gray-300 hover:text-white p-2 ml-auto"
        >
          <FiMenu size={24} />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto mt-4 p-2">
        <ul className="space-y-2 list-none p-0 m-0">
          {navItems.map((item, index) => (
            <li key={index} className="list-none">
              <Link
                href={item.href}
                className="flex items-center text-gray-300 rounded hover:bg-neutral-700 transition-colors p-2 relative"
              >
                {/* Icon container with fixed size */}
                <div className="w-[40px] flex justify-center">
                  {item.icon}
                </div>
                
                {/* Text with separate animation */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="text-md font-medium ml-3 absolute left-[40px]"
                    >
                      {item.text}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </motion.div>
  );
}