
import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BeforeAfterSection from "@/components/BeforeAfterSection";
import SampleResponse from "@/components/SampleResponse";
import AccessMethods from "@/components/AccessMethods";
import Contributors from "@/components/Contributors";
import Features from "@/components/Features";
import AuthProvider from "@/components/AuthProvider";
import connectDB from "@/config/database";
const Page = async() => {
  await connectDB();
  const data = [
    {
      type : "Website",
      reference : "https://satyashield.com",
      buttonText : "Visit our site",
      detail : "Access SatyaShield through our web platform. No installation needed. Built using Next.js and Tailwind CSS. ",
      features : [
        "Responsive Design",
        "Modern UI/UX",
        "Data Visualization",
      ]

    },
    {
      type : "Browser Extension",
      buttonText : "Use Extension",
      reference : "https://chrome.google.com/webstore/detail/satyashield-fact-checker/your-extension-id",
      detail : "Use the extension directly on any webpage. Instantly fact-check as you browse.",
      features : [
        "Chrome Integration",
        "Instant Verification",
        "Universal Support",
      ]
    },
    {
      type : "API Integration",
      buttonText : "Integrate API",
      reference : "https://api.satyashield.com/docs",
      detail : "Integrate our API into your existing systems. Automate fact-checking.",
      features : [
        "Gemini-2.5-Pro LLM",
        "Real-time API(tavily)",
        "Confidence Scoring Algorithm",
      ]
    },
    {
      type : "WhatsApp Bot",
      buttonText : "Chat with us",
      reference : "https://wa.me/your-number",
      detail : "Chat with our bot on WhatsApp for quick fact-checks on the go.",
      features : [
        "Conversational AI",
        "Natural language",
        "Mobile First",
      ]
    },

  ];
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Base Light Beige Gradient Background */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-amber-100 via-amber-50 to-amber-25">
      </div>

      {/* Subtle Circular Gradient Background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        {/* Top Left - Large Diffuse Glow */}
        <div className="absolute -top-60 -left-60 w-[1000px] h-[1000px] rounded-full opacity-25"
             style={{ 
               background: 'radial-gradient(circle at 60% 40%, rgba(245,245,220,0.15) 0%, rgba(255,228,181,0.08) 30%, rgba(255,248,220,0.04) 60%, transparent 100%)',
               filter: 'blur(150px)'
             }}>
        </div>
        
        {/* Top Right - Medium Diffuse Glow */}
        <div className="absolute -top-40 -right-40 w-[800px] h-[800px] rounded-full opacity-20"
             style={{ 
               background: 'radial-gradient(circle at 40% 60%, rgba(245,245,220,0.12) 0%, rgba(255,228,181,0.06) 40%, rgba(255,248,220,0.03) 70%, transparent 100%)',
               filter: 'blur(120px)'
             }}>
        </div>
        
        {/* Bottom Left - Subtle Glow */}
        <div className="absolute -bottom-60 -left-40 w-[700px] h-[700px] rounded-full opacity-15"
             style={{ 
               background: 'radial-gradient(circle at 70% 30%, rgba(245,245,220,0.1) 0%, rgba(255,228,181,0.05) 50%, transparent 100%)',
               filter: 'blur(100px)'
             }}>
        </div>
        
        {/* Bottom Right - Soft Glow */}
        <div className="absolute -bottom-40 -right-60 w-[600px] h-[600px] rounded-full opacity-18"
             style={{ 
               background: 'radial-gradient(circle at 30% 70%, rgba(245,245,220,0.08) 0%, rgba(255,228,181,0.04) 60%, transparent 100%)',
               filter: 'blur(110px)'
             }}>
        </div>
      </div>

      {/* Hero section content */}
      <div className="relative z-10">
        <AuthProvider>
          <Navbar/>
          <Hero />
        </AuthProvider>

        <BeforeAfterSection />
        <SampleResponse />
        <AccessMethods data={data} />
        <Features/>
        <Contributors />

      </div>
    </div>
  );
};

export default Page
