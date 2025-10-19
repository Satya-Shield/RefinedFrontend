import React from 'react'
import Image from 'next/image'

const SampleResponse = () => {
  return (
    <section className="px-4 py-16">
      <div className="max-w-7xl mx-auto mt-1">
        <h1 className="text-center text-5xl md:text-6xl font-bold mb-8">
          <span className="text-gray-800">Your Claim,</span>{' '}
          <span className="bg-gradient-to-r from-red-900 to-blue-900 bg-clip-text text-transparent">
            Our Verdict.
          </span>
        </h1>

        <div className="relative mt-16 flex justify-center items-center min-h-[700px]">
          {/* Left annotations */}
          <div className="absolute left-0 top-16 ml-7">
            <div className="relative">
              <div className="bg-red-900 text-white rounded-2xl px-6 py-4 shadow-lg max-w-xs">
                <p className="font-semibold text-lg text-center">
                  The text/photo/link<br />you've entered
                </p>
              </div>
              <Image
                src="/icons/curled_arrow.svg"
                alt="Arrow"
                className="w-20 h-20 absolute top-1 -right-22 transform -translate-y-1/2"
                width={80}
                height={80}
              />
            </div>
          </div>

          <div className="absolute left-0 top-80 ml-7">
            <div className="relative">
              <div className="bg-red-900 text-white rounded-2xl px-6 py-4 mt-2 shadow-lg max-w-xs">
                <p className="font-semibold text-lg text-center">
                  The method used to<br />evaluate, and verify.
                </p>
              </div>
              <Image
                src="/icons/curled_arrow.svg"
                alt="Arrow"
                className="w-20 h-20 absolute top-1/2 -right-22 transform -translate-y-1/2"
                width={80}
                height={80}
              />
            </div>
          </div>

          <div className="absolute left-0 bottom-20 ml-0">
            <div className="relative">
              {/* Box */}
              <div className="bg-red-900 text-white rounded-2xl max-w-xs px-6 py-4 ml-20 mt-10">
                <p className="font-semibold text-lg text-center">
                  Tactics to not<br />fall for lies
                </p>
              </div>

              {/* Arrow */}
              <Image
                src="/icons/curled_arrow.svg"
                alt="Arrow"
                className="w-20 h-20 absolute top-1/2 -right-19 transform -translate-y-1/2"
                width={80}
                height={80}
              />
            </div>
          </div>



          {/* Central image */}
          <div className="z-10 rounded-md -mt-7">
            <Image
              src="/icons/sample_response.png"
              alt="Sample Response"
              className="w-160 h-192 rounded-xl shadow-2xl"
              width={640}
              height={768}
              unoptimized
            />
          </div>

          {/* Right annotations */}
          <div className="absolute right-0 top-32 mr-7">
            <div className="relative">
              {/* Box */}
              <div className="max-w-xs mt-5 relative">
                <div className='mr-7 bg-blue-900 rounded-2xl px-6 py-4'>
                  <p className="text-white font-semibold text-lg text-center">
                    How certain<br />we are about<br />the verdict
                  </p>
                </div>
                

                {/* Arrow */}
                <Image
                  src="/icons/curled_arrow.svg"
                  alt="Arrow"
                  className="w-20 h-20 absolute -left-30 top-1/2 -translate-y-1/2 scale-x-[-1]"
                  width={80}
                  height={80}
                />
              </div>
            </div>
          </div>


          <div className="absolute right-0 bottom-32 mr-7">
            <div className="relative flex items-center">
              <Image
                src="/icons/curled_arrow.svg"
                alt="Arrow"
                className="w-20 h-20 absolute -left-22 top-1/2 translate-y-1/2 scale-x-[-1]"
                width={80}
                height={80}
              />
              <div className="bg-blue-900 border-2 mt-40 mr-10 border-blue-900 rounded-2xl px-6 py-4 shadow-lg max-w-xs">
                <p className="text-white font-semibold text-lg text-center">
                  News, Quora,<br />Reddit & more
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


export default SampleResponse