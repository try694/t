import Link from 'next/link';
import React from 'react';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-4xl mx-auto px-4 py-8 flex flex-col items-center text-center gap-y-12">
        {/* Logo Section */}
        <div className="mt-10 border-gray-700 pt-8 w-full">
          <img 
            src="/logo.png" 
            alt="Curiouschems Logo" 
            className="w-64 mx-auto"
          />
        </div>

        {/* Main Content */}
        <div className="space-y-12 mb-12">
          <h1 className="text-4xl sm:text-4xl md:text-4xl font-bold">
            Unlocking the Secrets of Arbitrage
          </h1>
        
          {/* Single CTA Button */}
          <div>
            <Link
              href="/auth/login"  // <-- Update this to the route or page you'd like
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
            >
              Join Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
