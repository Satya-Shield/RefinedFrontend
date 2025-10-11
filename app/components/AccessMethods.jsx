"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

const AccessMethods = ({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full font-sans md:px-10" ref={containerRef}>
      <div className="max-w-7xl mx-auto py-6 px-4 flex flex-col items-center">
        <h1 className="text-lg md:text-6xl mb-4 bg-gradient-to-r from-red-900 to-blue-900 bg-clip-text text-transparent font-bold text-center">
          Multiple ways to access us
        </h1>
        <p className="text-center text-black font-light text-md md:text-2xl mt-4">
          Choose the method that suits you best and start verifying information with ease.
        </p>
      </div>
      <div ref={ref} className="relative max-w-7xl mx-auto pb-6">
        {data.map((item, index) => (
          <div key={index} className="flex justify-start pt-4 md:pt-12 md:gap-10">
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-12 self-start max-w-[45%] lg:max-w-[50%] md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-neutral-900 flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-gradient-to-br from-red-900 to-blue-900 p-2" />
              </div>
              <h3 className="hidden md:block md:pl-20 text-2xl md:text-5xl font-bold bg-gradient-to-r from-red-900 to-blue-900 bg-clip-text text-transparent w-full">
                {item.type}
              </h3>
            </div>
            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold bg-gradient-to-r from-red-900 to-blue-900 bg-clip-text text-transparent">
                {item.type}
              </h3>
              <div className="mt-2 text-xl md:text-2xl text-black max-w-3xl mx-auto font-light">
                <button className="">
                  <a
                  href={item.reference}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-red-900 to-blue-900 bg-clip-text text-transparent hover:underline font-medium"
                >
                  {item.reference}
                </a>
                </button>
                {/* <p className="mt-2 text-xl md:text-2xl text-black max-w-3xl mx-auto font-light">{item.detail}</p> */}
                <ul className="mt-1 space-y-1">
                  {item.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-black font-light text-xl md:text-xl">
                      <span className="w-2 h-2 rounded-full bg-gradient-to-r from-red-900 to-blue-900 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
        <div
          style={{ height: height + "px" }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-red-900 via-blue-900 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default AccessMethods;