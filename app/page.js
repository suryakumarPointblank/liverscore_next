'use client'
import React from 'react';
import Image from 'next/image';

const Homepage = () => {
  return (
    <div className="h-screen bg-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration circle */}
      <div className="absolute right-0 top-0 transform translate-x-1/2 -translate-y-1/4 w-52 h-52 md:w-96 md:h-96 bg-cyan-100 rounded-full"></div>
      
      {/* Logo Section */}
      <div className="mb-4 z-10">
        <div className="rounded-lg flex items-center justify-center">
          <Image 
            src="/img/ayushman_logo.png" 
            alt="Ayushman Liver" 
            width={500} 
            height={367} 
            className="w-[224px]" 
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative mb-0 z-10">
        <div className="text-center px-4 mb-2">
          <h1 className="text-4xl md:text-5xl font-bold text-cyan-600 leading-tight">
            Assess your risk<br />
            of Fatty Liver
          </h1>
        </div>
        
        {/* Liver image */}
        <div className="flex items-center justify-center">
          <Image 
            src="/img/liver.png" 
            alt="Liver" 
            width={600} 
            height={400} 
            className="w-[250px] max-w-[400px]" 
          />
        </div>
      </div>

      {/* CTA Button */}
      <div className="mt-8 z-10">
        <button 
          className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-xl px-16 py-4 rounded-full shadow-lg transition-colors duration-200"
          onClick={() => {
            console.log('Starting quiz...');
          }}
        >
          Let's go!
        </button>
      </div>
    </div>
  );
};

export default Homepage;