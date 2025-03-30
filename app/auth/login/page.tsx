"use client";

import React from "react";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="min-h-screen relative text-white">
      {/* Left side: Fixed logo and title */}
      <div className="fixed left-0 top-0 h-full w-1/2 flex flex-col items-center justify-center p-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          <br /> Amazing Trading
        </h1>
        <img src="/logo.png" alt="Logo" width="350" height="60" />
      </div>

      {/* Right side: Login form */}
      <div className="absolute top-20 flex items-center justify-center p-6">
        <LoginForm />
      </div>
    </div>
  );
}
