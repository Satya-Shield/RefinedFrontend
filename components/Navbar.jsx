"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";

const Navbar = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const pathname = usePathname();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <nav className="bg-white/30 backdrop-blur-xl rounded-full px-8 py-3 flex items-center justify-between shadow-2xl border border-gray-200/30 max-w-3xl mx-auto">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Image
            src="/icons/satya-logo.png"
            alt="SatyaShield Logo"
            width={42}
            height={42}
            className="rounded-md"
          />
        </div>

        {/* Navigation Links */}
        <div className="flex items-center justify-end space-x-5">
          <span
            className={`text-gray-800 hover:text-gray-600 transition-colors cursor-pointer ${
              pathname === "/" ? "font-semibold" : ""
            }`}
          >
            Home
          </span>
          <span
            className={`text-gray-800 hover:text-gray-600 transition-colors cursor-pointer ${
              pathname === "/about" ? "font-semibold" : ""
            }`}
          >
            About
          </span>
          <span
            className={`text-gray-800 hover:text-gray-600 transition-colors cursor-pointer ${
              pathname === "/contact" ? "font-semibold" : ""
            }`}
          >
            Contact Us
          </span>
        </div>

        {/* Auth Buttons */}
        {isSignedIn ? (
          <div className="flex items-center space-x-3">
            <button
              onClick={() => (window.location.href = "/history")}
              className="flex items-center px-4 py-2 font-semibold text-white rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:shadow-md bg-gradient-to-r from-red-900 to-blue-900 border border-transparent"
            >
              User History
            </button>
            <SignOutButton>
              <button className="flex items-center px-4 py-2 font-semibold text-white rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:shadow-md bg-gradient-to-r from-red-900 to-blue-900 border border-transparent">
                Sign Out
              </button>
            </SignOutButton>
          </div>
        ) : (
          <SignInButton mode="modal">
            <button className="flex items-center px-4 py-2 font-semibold text-white rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:shadow-md bg-gradient-to-r from-red-900 to-blue-900 border border-transparent">
              Sign Up / Login
            </button>
          </SignInButton>
        )}
      </nav>
    </div>
  );
};

export default Navbar;