"use client";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const AnimatedContributors = ({
  contributors,
  autoplay = false
}) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % contributors.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + contributors.length) % contributors.length);
  };

  const isActive = (index) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };
  return (
    <div
      className="mx-auto max-w-sm px-4 py-20 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12">
      <div className="relative grid grid-cols-1 gap-20 md:grid-cols-2">
        <div>
          <div className="relative h-80 w-full">
            <AnimatePresence>
              {contributors.map((contributor, index) => (
                <motion.div
                  key={contributor.src}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index)
                      ? 40
                      : contributors.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom">
                  <img
                    src={contributor.src}
                    alt={contributor.name}
                    width={500}
                    height={500}
                    draggable={false}
                    className="h-full w-full rounded-3xl object-cover object-center" />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex flex-col justify-between py-4">
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-red-900 to-blue-900 bg-clip-text text-transparent">
                {contributors[active].name}
            </h3>

            <p className="text-bold text-black dark:text-black-00">
              {contributors[active].designation}
            </p>
            <motion.p className="mt-8 text-lg text-black leading-relaxed">
              {contributors[active].contribution.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: "blur(10px)",
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block">
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
          <div className="flex gap-4 pt-12 md:pt-0">
            <button
              onClick={handlePrev}
              className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800">
              <IconArrowLeft
                className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:rotate-12 dark:text-neutral-400" />
            </button>
            <button
              onClick={handleNext}
              className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800">
              <IconArrowRight
                className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:-rotate-12 dark:text-neutral-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Contributors = () => {
  const contributors = [
    {
      name: "Luv Kansal",
      designation: "Leader",
      contribution: "Built AI agents and implemented FastAPI for the backend.",
      src: ""
    },
    {
      name: "Kunj Vipul Goyal",
      designation: "Member",
      contribution: "Built the WhatsApp bot and the browser extension.",
      src: "",
    },
    {
      name: "Aryan Gupta",
      designation: "Member",
      contribution: "Built the WhatsApp bot and the browser extension.",
      src: "",
    },
    {
      name: "Manaswi Rajne",
      designation: "Member",
      contribution: "Built AI agents and implemented FastAPI for the backend.",
      src: "",
    },
    {
      name: "Bhoomi Gundecha",
      designation: "Member",
      contribution: "Built the website and performed API integration.",
      src: "https://drive.google.com/file/d/1P34zJjWh_Sj6mGEJOqnkLgUFw7107rHE/view?usp=sharing",
    },
  ];

  return (
    <section className="px-4 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mt-10 mb-10">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-red-900 to-blue-900 bg-clip-text text-transparent">
              Meet Our {' '}
            </span>
            <span className="text-black">Contributors</span>
          </h2>
          <p className="text-black font-light text-lg md:text-2xl mt-6 max-w-2xl mx-auto">
            The team behind the scenes for SatyaShield
          </p>
        </div>

        <AnimatedContributors contributors={contributors} autoplay={true} />
      </div>
    </section>
  );
};

export default Contributors;