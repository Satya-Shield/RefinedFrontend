"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import BackendResponse from "@/components/BackendResponse";
import AuthProvider from "@/components/AuthProvider";
import { FaArrowLeft, FaArrowRight, FaExclamationTriangle } from "react-icons/fa";

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    if (status === "authenticated") {
      const fetchHistory = async () => {
        try {
          const res = await fetch("/api/history", { credentials: "include" });
          if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
          const data = await res.json();
          setHistory(data || []);
          if (data?.length > 0) setCurrentIndex(0);
        } catch (err) {
          console.error("Failed to fetch history:", err);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchHistory();
    }
  }, [status, router]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? history.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === history.length - 1 ? 0 : prev + 1));
  };

  const handleItemClick = (index) => setCurrentIndex(index);

  if (loading || status === "loading")
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-100 via-amber-50 to-amber-25">
        <p className="text-gray-600">Loading your history...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-100 via-amber-50 to-amber-25 px-6">
        <div className="text-center max-w-md">
          <FaExclamationTriangle className="w-12 h-12 text-red-400 mx-auto mb-3" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Error Loading History</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-gradient-to-r from-red-900 to-blue-900 text-white rounded-xl shadow-md hover:opacity-90"
          >
            Retry
          </button>
        </div>
      </div>
    );

  if (history.length === 0)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-100 via-amber-50 to-amber-25">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">No History Found</h2>
          <p className="text-gray-600">
            Your past verifications will appear here once you verify a claim.
          </p>
        </div>
      </div>
    );

  // ✅ Safety check to ensure currentHistoryItem is always valid
  const currentHistoryItem =
    Array.isArray(history[currentIndex]) && history[currentIndex].length > 0
      ? history[currentIndex]
      : Array.isArray(history)
      ? [history[currentIndex]]
      : [];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-amber-100 via-amber-50 to-amber-25"></div>
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute -top-60 -left-60 w-[1000px] h-[1000px] rounded-full opacity-25"
          style={{
            background:
              "radial-gradient(circle at 60% 40%, rgba(245,245,220,0.15) 0%, rgba(255,228,181,0.08) 30%, rgba(255,248,220,0.04) 60%, transparent 100%)",
            filter: "blur(150px)",
          }}
        ></div>
        <div
          className="absolute -top-40 -right-40 w-[800px] h-[800px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle at 40% 60%, rgba(245,245,220,0.12) 0%, rgba(255,228,181,0.06) 40%, rgba(255,248,220,0.03) 70%, transparent 100%)",
            filter: "blur(120px)",
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <AuthProvider>
          <Navbar />
        </AuthProvider>

        <div className="w-full flex flex-col lg:flex-row lg:items-start gap-10 px-6 pt-12 max-w-7xl mx-auto">
          {/* Left side */}
          <div className="flex flex-col space-y-4 lg:w-[35%] mt-0">
            <div className="backdrop-blur-xl bg-white/40 border border-gray-200/40 rounded-3xl p-6 shadow-2xl">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Verification History</h3>
              <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                {history.map((item, index) => (
                  <button
                    key={item._id || index}
                    onClick={() => handleItemClick(index)}
                    className={`w-full p-4 rounded-xl border text-left transition-all duration-300 ${
                      index === currentIndex
                        ? "bg-white/80 border-gray-300 shadow-md ring-2 ring-blue-200"
                        : "bg-white/60 border-gray-200 hover:bg-white/80"
                    }`}
                  >
                    <p className="text-gray-800 font-medium truncate">"{item.claim}"</p>
                    <p className="text-gray-500 text-sm mt-1">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="flex justify-center lg:justify-start lg:w-[65%] -mt-8 relative">
            {/* {history.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-xl rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 hover:bg-white/90 transition-all duration-200 shadow-lg border border-gray-200/50"
                >
                  <FaArrowLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-xl rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 hover:bg-white/90 transition-all duration-200 shadow-lg border border-gray-200/50"
                >
                  <FaArrowRight className="w-5 h-5" />
                </button>
              </>
            )} */}

            {/* ✅ Safely render BackendResponse */}
            <div className="mt-6 w-full">
              {currentHistoryItem && currentHistoryItem.length > 0 ? (
                <BackendResponse key={currentIndex} jsonResponse={currentHistoryItem} />
              ) : (
                <p className="text-gray-500 text-center">No data to display</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
