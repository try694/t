import Link from 'next/link';
import React from 'react';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black-gradient text-white">
      <div className="w-full max-w-4xl mx-auto px-4 py-8 flex flex-col items-center">
        <img 
          src="/logo.png" 
          alt="Logo" 
          className="w-40 sm:w-48 md:w-56 lg:w-64 mb-6" 
        />
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center">
          Amazing Trading
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 text-center">
          Arbitrage Trading Company
        </p>
        <Link 
          href="/auth/login"
          className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-full transition-all shadow-lg"
        >
          Join Now
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
