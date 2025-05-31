'use client'
import React, { useState } from 'react';
import Image from 'next/image';

// User Info Form Component
const UserInfoForm = ({ onNext, onPrevious }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    city: '',
    mobile: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = () => {
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.city.trim() || !formData.mobile.trim()) {
      alert('Please fill in all fields');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }
    
    // Mobile validation (basic)
    if (formData.mobile.length < 10) {
      alert('Please enter a valid mobile number');
      return;
    }
    
    onNext(formData);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration circle - same as homepage */}
      <div className="absolute right-0 top-0 transform translate-x-1/2 -translate-y-1/4 w-52 h-52 md:w-96 md:h-96 bg-cyan-100 rounded-full"></div>
      
      {/* Main Form Container - Blue overlay */}
      <div className="w-full max-w-md mx-auto z-10">
        <div className="bg-cyan-400 rounded-3xl p-6 shadow-2xl">
          {/* Liver Character Image */}
          <div className="bg-white rounded-2xl p-6 mb-6 flex items-center justify-center">
             <Image src="/img/user_form.png" width={216} height={172} alt='liver' />
          </div>

          {/* Form Fields */}
          <div className="space-y-4 mb-8">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-white/90 rounded-full text-gray-700 placeholder-gray-500 border-none outline-none focus:ring-2 focus:ring-white/50 text-lg"
              />
            </div>
            
            <div>
              <input
                type="email"
                name="email"
                placeholder="E-mail Id"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-white/90 rounded-full text-gray-700 placeholder-gray-500 border-none outline-none focus:ring-2 focus:ring-white/50 text-lg"
              />
            </div>
            
            <div>
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-white/90 rounded-full text-gray-700 placeholder-gray-500 border-none outline-none focus:ring-2 focus:ring-white/50 text-lg"
              />
            </div>
            
            <div>
              <input
                type="tel"
                name="mobile"
                placeholder="Mobile No"
                value={formData.mobile}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-white/90 rounded-full text-gray-700 placeholder-gray-500 border-none outline-none focus:ring-2 focus:ring-white/50 text-lg"
              />
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={onPrevious}
              className="text-white font-semibold text-lg hover:text-white/80 transition-colors duration-200"
            >
              Previous
            </button>
            
            <button
              onClick={handleNext}
              className="bg-gray-800 hover:bg-gray-900 text-white font-bold text-lg px-8 py-3 rounded-full shadow-lg transition-colors duration-200"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Homepage Component
const Homepage = () => {
  const [currentStep, setCurrentStep] = useState('home'); // 'home' or 'userInfo'
  const [userData, setUserData] = useState(null);

  const handleLetsGo = () => {
    setCurrentStep('userInfo');
  };

  const handleUserInfoNext = (formData) => {
    setUserData(formData);
    console.log('User data collected:', formData);
    // Here you can navigate to the next step (quiz questions)
    // For now, we'll just log the data
    alert(`Welcome ${formData.name}! Quiz will start next.`);
  };

  const handleBackToHome = () => {
    setCurrentStep('home');
  };

  // Render User Info Form
  if (currentStep === 'userInfo') {
    return (
      <UserInfoForm 
        onNext={handleUserInfoNext}
        onPrevious={handleBackToHome}
      />
    );
  }

  // Render Homepage
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
            priority
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
            priority
          />
        </div>
      </div>

      {/* CTA Button */}
      <div className="mt-8 z-10">
        <button 
          className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-xl px-16 py-4 rounded-full shadow-lg transition-colors duration-200"
          onClick={handleLetsGo}
        >
          Let's go!
        </button>
      </div>
    </div>
  );
};

export default Homepage;