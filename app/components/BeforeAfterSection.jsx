import React from 'react'
import BeforePhone from './BeforePhone'
import AfterPhone from './AfterPhone'

const BeforeAfterSection = () => {
  return (
    <section className="px-4 py-7">
      <div className="max-w-6xl mx-auto">

        {/* Before & After Cards */}
        <div className="relative space-x-5 flex flex-col lg:flex-row items-center justify-center gap-18 lg:gap-30">
          {/* Before Card */}
          <div className="relative rotate-[-15deg]">
            <BeforePhone />
          </div>

          {/* Connecting Arrow */}
          <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="relative">
              <svg
                width="150"
                height="60"
                viewBox="0 0 160 80"
                xmlns="http://www.w3.org/2000/svg"
                className="text-black"
              >
                {/* Smooth curved arrow */}
                <path
                  d="M 10 40 Q 80 10 150 40"
                  stroke="black"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Arrow head */}
                <polygon
                  points="145,32 160,40 145,48"
                  fill="black"
                />

              </svg>
            </div>
          </div>


          {/* Mobile Arrow */}
          <div className="lg:hidden mb-8">
            <div className="flex justify-center">
              <svg width="60" height="40" viewBox="0 0 60 40" className="text-black-900">
                <defs>
                  <linearGradient id="arrowGradientMobile" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#000000" />
                    <stop offset="50%" stopColor="#000000" />
                    <stop offset="100%" stopColor="#000000" />
                  </linearGradient>
                </defs>
                <path
                  d="M 30 10 Q 45 20 30 30"
                  stroke="url(#arrowGradientMobile)"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
                <polygon
                  points="35,25 45,30 35,35"
                  fill="url(#arrowGradientMobile)"
                />
              </svg>
            </div>
          </div>

          {/* After Card */}
          <div className="relative rotate-[15deg]">
            <AfterPhone />
          </div>
        </div>
      </div>
    </section>
  )
}

export default BeforeAfterSection




