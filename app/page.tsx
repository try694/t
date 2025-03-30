import Link from 'next/link'
import React from 'react'

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-dark-gradient from-blue-500 to-indigo-600 text-white">
      <div className="flex flex-col items-center px-4">
        <img src="/logo.png" alt="Logo" width="350" height="60" />
        <h1 className="text-5xl font-bold mb-4 text-center">Amazing Trading</h1>
        <p className="text-xl mb-8 text-center">
          Arbitrage Trading Company
        </p>
        <Link 
          href="/auth/login"
          className="px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-full transition-all shadow-lg"
        >
          Join Now
        </Link>
      </div>
    </div>
  )
}

export default LandingPage
