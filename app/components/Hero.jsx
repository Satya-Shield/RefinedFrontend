import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { FaShield } from 'react-icons/fa6';
import BeforePhone from "./BeforePhone";
const words = ['photo', 'link'];

const Hero = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/combat');
  }
  const [currentWord, setCurrentWord] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const current = words[currentWord];
    let timeout;

    if(typing){
        if(displayText.length < current.length) {
            timeout = setTimeout(() => {
            setDisplayText(current.slice(0, displayText.length + 1));
            }, 150);
        } 
        else {
            timeout = setTimeout(() => setTyping(false), 1000);
        }
    } 
    else {
        if (displayText.length > 0) {
            timeout = setTimeout(() => {
            setDisplayText(displayText.slice(0, -1));
            }, 100);
        } 
        else {
            setTyping(true);
            setCurrentWord((prev) => (prev + 1) % words.length);
        }
    }

    return () => clearTimeout(timeout);
  }, [displayText, typing, currentWord]);
  return (
    <section className="min-w-full min-h-full flex flex-col items-center justify-center text-center py-10">
      <h1 className="text-6xl md:text-7xl font-bold leading-tight">
        <span className="bg-gradient-to-r from-red-900 to-blue-900 bg-clip-text text-transparent"> AI-powered verification </span>
        <br/>
        <span className="bg-gradient-to-r from-red-900 to-blue-900 bg-clip-text text-transparent"> for informed choices</span>
      </h1>
      <p className="mt-2 text-xl md:text-2xl text-black-500 max-w-3xl mx-auto font-light">
        Type your prompt, add <span className="text-black">{displayText}</span>
        <span className="animate-blink text-black">|</span> and obtain verified insights
      </p>
      <div className="flex items-center mt-2 rounded-full ">
        <button onClick={handleClick}
          className="flex items-center gap-2 mt-3 px-8 py-3 font-semibold text-white rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:shadow-md bg-gradient-to-r from-red-900 to-blue-900 border border-transparent"
        >
          <FaShield size={20} />
          Combat Misinformation
        </button>

        


      </div>

    </section>
  );
};

export default Hero;
