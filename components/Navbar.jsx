"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();
  const [providers, setProviders] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    const setAuthProviders = async () => {
      try {
        const res = await getProviders();
        console.log("Providers fetched:", res); // Debug
        setProviders(res);
      } catch (error) {
        console.error("Failed to load providers:", error);
      }
    };
    setAuthProviders();
  }, []);

  if (status === "loading") {
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
            className={` text-gray-800 hover:text-gray-600 transition-colors cursor-pointer ${
              pathname === "/" ? "font-semibold" : ""
            }`}
          >
            Home
          </span>
          <span
            className={` text-gray-800 hover:text-gray-600 transition-colors cursor-pointer ${
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
        {session ? (
          <div className="flex items-center space-x-3">
            <button
              onClick={() => (window.location.href = "/history")}
              className="flex items-center px-4 py-2 font-semibold text-white rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:shadow-md bg-gradient-to-r from-red-900 to-blue-900 border border-transparent"
            >
              User History
            </button>
            <button
              onClick={() => signOut()}
              className="flex items-center px-4 py-2 font-semibold text-white rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:shadow-md bg-gradient-to-r from-red-900 to-blue-900 border border-transparent"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="flex items-center">
            {providers ? (
              Object.values(providers).map((provider) => (
                <button
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="flex items-center px-4 py-2 font-semibold text-white rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:shadow-md bg-gradient-to-r from-red-900 to-blue-900 border border-transparent"
                >
                  Sign Up / Login
                </button>
              ))
            ) : (
              <div>Loading providers...</div>
            )}
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;