import React from 'react'
import Image from 'next/image'

const BeforePhone = () => {
  return (
    <div className="relative">
      {/* Phone Card */}
      <div className="w-80 h-96 bg-red-900 rounded-3xl shadow-lg border border-gray-100 p-2 relative overflow-hidden">
        {/* Inner bordered screen */}
        <div className="w-full h-full bg-gray-50 rounded-2xl border border-gray-200 shadow-inner p-2 flex flex-col">
          {/* Header */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-[10px] font-bold">👤</div>
            <div>
              <div className="text-sm font-semibold text-gray-800">That One Intelligent Friend</div>
              <div className="-mt-1 text-[10px] text-gray-500">online</div>
            </div>
          </div>

          {/* Tweet image */}
          <div className="-mt-2.5 bg-white rounded-lg border border-gray-200 overflow-hidden mb-3">
            <div className="relative ml-32 w-36 h-36">
              <Image src="/icons/bidengun.png" alt="Biden post" fill className="object-cover object-[right_center]" />
            </div>
            <div className="p-2">
              <p className="text-[11px] text-gray-700">BREAKING: Photo of lead FBI agent in raid on Mar‑A‑Lago leaked</p>
            </div>
          </div>

          {/* User message bubble */}
          <div className="-mt-1 flex justify-end mb-2">
            <div className="max-w-[75%] bg-blue-400 text-white text-sm px-3 py-2 rounded-2xl rounded-br-sm shadow">
              Is this real ???
            </div>
          </div>

          {/* Friend reply bubble */}
          <div className="flex justify-start">
            <div className="max-w-[85%] bg-gray-200 text-gray-800 text-sm px-3 py-2 rounded-2xl rounded-bl-sm shadow">
              Not sure bro, will have to check proper sources
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BeforePhone