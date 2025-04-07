"use client";

import React from "react";

export default function OverviewPage() {
  return (
    <div className="space-y-6 px-4 py-6 poppins-semibold">
      {/* TRADING SETTINGS */}
      <section className="border border-neutral-700 rounded p-4">
        <h2 className="text-lg font-semibold text-green-400 mb-3">
          Trading Settings
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Minimum Profit Threshold (%)
            </label>
            <input
              type="number"
              className="w-full bg-transparent border border-neutral-700 rounded px-2 py-2 text-sm focus:outline-none"
              placeholder="0.01"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Trade Amount (ETH)
            </label>
            <input
              type="number"
              className="w-full bg-transparent border border-neutral-700 rounded px-2 py-2 text-sm focus:outline-none"
              placeholder="0.1"
            />
          </div>
        </div>
      </section>

      {/* YOUR BALANCES */}
      <section className="border border-neutral-700 rounded p-4">
        <h2 className="text-lg font-semibold text-green-400 mb-3">
          Your Balances
        </h2>
        <div className="grid grid-cols-4 gap-4">
          {/* Example Balance Card */}
          <div className="bg-transparent border border-neutral-700 rounded p-3 text-center">
            <p className="text-xs text-gray-400">ETH</p>
            <p className="text-lg font-semibold text-green-400">9999.9976</p>
          </div>
          <div className="bg-transparent border border-neutral-700 rounded p-3 text-center">
            <p className="text-xs text-gray-400">WETH</p>
            <p className="text-lg font-semibold text-green-400">0.0000</p>
          </div>
          <div className="bg-transparent border border-neutral-700 rounded p-3 text-center">
            <p className="text-xs text-gray-400">USDT</p>
            <p className="text-lg font-semibold text-green-400">0.0000</p>
          </div>
          <div className="bg-transparent border border-neutral-700 rounded p-3 text-center">
            <p className="text-xs text-gray-400">USDT</p>
            <p className="text-lg font-semibold text-green-400">0.0000</p>
          </div>
        </div>
      </section>

      {/* POTENTIAL TRADES */}
      <section className="border border-neutral-700 rounded p-4">
        <h2 className="text-lg font-semibold text-green-400 mb-3">
          Potential Trades
        </h2>
        <div className="space-y-3">
          {/* Trade Row 1 */}
          <div className="flex items-center justify-between bg-transparent border border-neutral-700 rounded p-3">
            <div className="text-sm">
              <p className="text-green-400">
                DAI/USDT (0.2% potential profit)
              </p>
              <p className="text-gray-400 text-xs">
                Buy from: Uniswap V3 $2860.74 | Sell on: SushiSwap $2817.21
              </p>
            </div>
            <button className="bg-gradient-to-r from-blue-300 to-blue-500 hover:from-blue-400 hover:to-blue-600 text-black font-semibold py-1 px-3 rounded text-sm transition">
              Execute Trade
            </button>
          </div>

          {/* Trade Row 2 */}
          <div className="flex items-center justify-between bg-transparent border border-neutral-700 rounded p-3">
            <div className="text-sm">
              <p className="text-green-400">
                DAI/USDT (0.2% potential profit)
              </p>
              <p className="text-gray-400 text-xs">
                Buy from: Quickswap V2 $2860.74 | Sell on: SushiSwap $2817.21
              </p>
            </div>
            <button className="bg-gradient-to-r from-blue-300 to-blue-500 hover:from-blue-400 hover:to-blue-600 text-black font-semibold py-1 px-3 rounded text-sm transition">
              Execute Trade
            </button>
          </div>

          {/* Trade Row 3 */}
          <div className="flex items-center justify-between bg-transparent border border-neutral-700 rounded p-3">
            <div className="text-sm">
              <p className="text-green-400">
                DAI/USDT (0.2% potential profit)
              </p>
              <p className="text-gray-400 text-xs">
                Buy from: Quickswap V2 $2860.74 | Sell on: SushiSwap $2817.21
              </p>
            </div>
            <button className="bg-gradient-to-r from-blue-300 to-blue-500 hover:from-blue-400 hover:to-blue-600 text-black font-semibold py-1 px-3 rounded text-sm transition">
              Execute Trade
            </button>
          </div>

          {/* Trade Row 4 */}
          <div className="flex items-center justify-between bg-transparent border border-neutral-700 rounded p-3">
            <div className="text-sm">
              <p className="text-green-400">
                DAI/USDT (0.2% potential profit)
              </p>
              <p className="text-gray-400 text-xs">
                Buy from: Quickswap V2 $2860.74 | Sell on: SushiSwap $2817.21
              </p>
            </div>
            <button className="bg-gradient-to-r from-blue-300 to-blue-500 hover:from-blue-400 hover:to-blue-600 text-black font-semibold py-1 px-3 rounded text-sm transition">
              Execute Trade
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
