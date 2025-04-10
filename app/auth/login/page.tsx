"use client";

import React from "react";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-800 text-white">
      {/* Left side: Logo and Title */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8">
        <h1 className="text-xl md:text-3xl font-bold mb-4 text-center">
          Amazing Trading
        </h1>
        <img src="/logo.png" alt="Logo" className="w-28 md:w-56" />
      </div>

      {/* Right side: Login form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
