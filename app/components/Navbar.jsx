"use client";

import Image from "next/image";
import React, { useState } from "react";

export default function Navbar() {
  return (   
    <div className="p-4">

        <nav className="bg-white/30 backdrop-blur-xl rounded-full px-8 py-3 flex items-center justify-between shadow-2xl border border-gray-200/30 max-w-3xl mx-auto">
            <div className="flex items-center space-x-2">
                <Image 
                    src="/icons/satya-logo.png"
                    alt="SatyaShield Logo"
                    width={42}
                    height={42}
                    className="rounded-md"
                ></Image>

            </div>
            <div className="text-bold flex ml-41 md:ml-65 justify-end space-x-5">
                <span className="text-gray-800 hover:text-gray-600 transition-colors cursor-pointer">
                    Home
                </span>
                <span className="text-gray-800 hover:text-gray-600 transition-colors cursor-pointer">
                    About 
                </span>
                <span className="text-gray-800 hover:text-gray-600 transition-colors cursor-pointer">
                    Contact Us
                </span>
            </div>
            <div className="flex items-center rounded-full">
                 <button
                    className="flex items-center px-6 py-2 font-semibold text-white rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:shadow-md bg-gradient-to-r from-red-900 to-blue-900 border border-transparent"
                >
                    Try for Free
                </button>

            </div>
        </nav>



    </div>   
  );
}
