"use client";

import React, { useState } from "react";
import { FaShieldAlt, FaSearch, FaSpinner } from "react-icons/fa";

const SearchInput = ({
  onSearch,
  loading,
  searchQuery,
  setSearchQuery,
  selectedFile,
  selectedUrl,
  onClearFile,
  onClearUrl,
}) => {
  const [inputValue, setInputValue] = useState(searchQuery || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() && !loading) {
      const query = inputValue.trim();
      onSearch({
        query,
        file: selectedFile,
        url: selectedUrl,
      });
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (setSearchQuery) {
      setSearchQuery(e.target.value);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start w-full mt-10 px-6">
      <div className="backdrop-blur-xl bg-white/30 border border-gray-200/40 rounded-3xl p-8 w-full max-w-2xl shadow-2xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.1)]">
        <div className="flex items-center mb-4">
          <FaShieldAlt className="w-6 h-6 text-gray-800 mr-2" />
          <h3 className="text-2xl font-semibold text-gray-800 tracking-tight">
            Quick Fact Check
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <textarea
            placeholder="Enter your claim here to verify..."
            value={inputValue}
            onChange={handleInputChange}
            className="w-full min-h-[120px] bg-white/60 border border-gray-300/60 rounded-xl text-gray-800 placeholder:text-gray-500 p-4 resize-none shadow-inner focus:outline-none focus:ring-2 focus:ring-red-900 transition"
          />

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-900 to-blue-900 hover:opacity-90 transition-all duration-300 rounded-xl py-3 text-xl font-semibold shadow-lg text-white hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 active:shadow-md"
          >
            {loading ? (
              <div className="flex items-center">
                <FaSpinner className="w-5 h-5 animate-spin mr-2" />
                Verifying Claim...
              </div>
            ) : (
              <div className="flex items-center">
                <FaSearch className="w-5 h-5 mr-2" />
                Verify Claim
              </div>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchInput;
