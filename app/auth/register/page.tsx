"use client";

import React from "react";
import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-800 text-white">
      {/* Left side: Logo and Title */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8">
        {/* Hiding the h1 on mobile with hidden md:block */}
        <h1 className="hidden md:block text-xl md:text-3xl font-bold mb-4 text-center">
          Amazing Trading
        </h1>
        <img src="/logo.png" alt="Logo" className="w-24 md:w-56" />
      </div>

      {/* Right side: Registration Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
