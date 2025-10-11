"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const InteractiveCard = ({ title, description, icon, gradient, index, isColored }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cardRef = useRef(null);

  const springConfig = { stiffness: 100, damping: 20, mass: 0.5 };

  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]), springConfig);
  const opacity = useSpring(useTransform(mouseX, [-300, 0, 300], [0.9, 1, 0.9]), springConfig);
  const glareOpacity = useSpring(useTransform(mouseX, [-300, 0, 300], [0.15, 0, 0.15]), springConfig);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { width, height, left, top } = cardRef.current?.getBoundingClientRect() ?? { width: 0, height: 0, left: 0, top: 0 };
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;
    mouseX.set(deltaX);
    mouseY.set(deltaY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      style={{ rotateX, rotateY, opacity, willChange: "transform", perspective: "1000px" }}
      whileHover={{ scale: 1.05 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full md:w-96 h-80 cursor-pointer"
    >
      <div
        className={`ml-9 relative w-80 h-73 rounded-2xl p-8 shadow-2xl overflow-hidden group transition-all duration-300 ${
          isColored 
            ? 'bg-gradient-to-br from-red-900 to-blue-900' 
            : 'bg-gray-100 hover:bg-gradient-to-br hover:from-red-900 hover:to-blue-900'
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Icon */}
        <div 
          className={`text-6xl mb-6 transform transition-transform duration-300 group-hover:scale-110 ${
            isColored ? 'text-white' : 'text-gray-800 group-hover:text-white'
          }`}
          style={{ transform: "translateZ(40px)", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
        >
          {icon}
        </div>

        {/* Title */}
        <h3 
          className={`text-xl font-bold mb-4 ${
            isColored ? 'text-white' : 'text-black group-hover:text-white'
          }`}
          style={{ transform: "translateZ(30px)" }}
        >
          {title}
        </h3>

        {/* Description */}
        <p 
          className={`font-light text-base leading-relaxed ${
            isColored ? 'text-white/90' : 'text-gray-700 group-hover:text-white/90'
          }`}
          style={{ transform: "translateZ(20px)" }}
        >
          {description}
        </p>

        {/* CTA Button */}
        <button 
          className={`mt-4 absolute bottom-4 left-8 right-8 font-semibold py-1 px-6 rounded-lg transition-all duration-300 ${
            isColored 
              ? 'bg-white/20 hover:bg-white/30 text-white border border-white/50' 
              : 'bg-white/20 hover:bg-white/30 text-black group-hover:text-white border border-gray-300 group-hover:border-white/50'
          }`}
          style={{ transform: "translateZ(25px)" }}
        >
          Learn More
        </button>

        {/* Glare effect */}
        <motion.div
          style={{ opacity: glareOpacity, transform: "translateZ(10px)" }}
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"
        />

        {/* Decorative circles */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" style={{ transform: "translateZ(-20px)" }} />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" style={{ transform: "translateZ(-20px)" }} />
      </div>
    </motion.div>
  );
};

const Features = () => {
  const featuress = [
    {
      title: "Claim Extraction",
      description: "Automatically identifies and extracts verifiable claims from any content.",
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-2-2h-6l-3-3h-2a2 2 0 0 0-2 2v2"></path>
          <path d="M3 16v-2a2 2 0 0 1 2-2h6l3 3h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        </svg>
      ),
      gradient: "from-red-900 to-blue-900",
    },
    {
      title: "Evidence Gathering",
      description: "Parallel processing to gather credible evidence from trusted sources.",
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
        </svg>
      ),
      gradient: "from-red-900 to-blue-900",
    },
    {
      title: "Manipulation Detection",
      description: "Identifies psychological and technical techniques used to spread misinformation.",
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
      ),
      gradient: "from-red-900 to-blue-900",
    },
    {
      title: "Confidence Scoring",
      description: "Provides detailed confidence scores based on evidence quality and source reliability.",
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </svg>
      ),
      gradient: "from-red-900 to-blue-900",
    },
    {
      title: "Educational Insights",
      description: "Teaches users to identify misinformation patterns and improve digital literacy.",
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 6.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z"></path>
          <path d="M19 6.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z"></path>
          <path d="M12 17v-6"></path>
        </svg>
      ),
      gradient: "from-red-900 to-blue-900",
    },
    {
      title: "Multi-Platform Integration",
      description: "Works across web, mobile, and messaging platforms for seamless fact-checking.",
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      ),
      gradient: "from-red-900 to-blue-900",
    },
  ];

  return (
    <section className="px-4 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-red-900 to-blue-900 bg-clip-text text-transparent">
              AI Features{' '}
            </span>
          </h2>
          <p className="text-black font-light text-lg md:text-2xl mt-6 max-w-2xl mx-auto">
            Choose the method that fits your workflow. All powered by the same intelligent fact-checking engine.
          </p>
        </div>

        {/* Cards Grid */}
        <div
          className="-mt-9 grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-6 max-w-7xl mx-auto justify-center"
          style={{ perspective: "3000px" }}
        >
          {featuress.map((method, index) => (
            <InteractiveCard 
              key={index} 
              {...method} 
              index={index} 
              isColored={(index + 1) % 2 === 0} // Cards 2, 4, 6 will be colored (indices 1, 3, 5)
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;