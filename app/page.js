'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
      {/* Background decoration circle */}
      <div className="absolute right-0 top-0 transform translate-x-1/2 -translate-y-1/4 w-52 h-52 md:w-96 md:h-96 bg-cyan-100 rounded-full"></div>

      {/* Main Form Container */}
      <div className="w-full max-w-md mx-auto z-10">
        <div className="bg-cyan-400 rounded-3xl p-6 shadow-2xl">
          {/* Liver Character Image */}
          <div className="bg-white rounded-2xl p-6 mb-6 flex items-center justify-center">
            <Image src="/img/user_form.png" width={216} height={172} alt='liver' />
          </div>

          {/* Form Fields */}
          <div className="space-y-4 mb-8 text-base">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-white/90 rounded-full text-gray-700 placeholder-gray-500 border-none outline-none focus:ring-2 focus:ring-white/50 "
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="E-mail Id"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-white/90 rounded-full text-gray-700 placeholder-gray-500 border-none outline-none focus:ring-2 focus:ring-white/50 "
              />
            </div>

            <div>
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-white/90 rounded-full text-gray-700 placeholder-gray-500 border-none outline-none focus:ring-2 focus:ring-white/50 "
              />
            </div>

            <div>
              <input
                type="tel"
                name="mobile"
                placeholder="Mobile No"
                value={formData.mobile}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-white/90 rounded-full text-gray-700 placeholder-gray-500 border-none outline-none focus:ring-2 focus:ring-white/50 "
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

// Quiz Component
const QuizComponent = ({ onNext, onPrevious, userData }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [totalScore, setTotalScore] = useState(0);

  // Quiz questions based on the NAFLD Risk Assessment
  const questions = [
    {
      id: 1,
      text: "What is your age group?",
      image: "/img/q1.png",
      options: [
        { text: "Less than 35 years", points: 0, value: "under35" },
        { text: "35 years or older", points: 2, value: "over35" }
      ]
    },
    {
      id: 2,
      text: "What is your gender?",
      image: "/img/q3.png", // You'll need to add this image
      options: [
        { text: "Male", points: 0, value: "male" },
        { text: "Female", points: 0, value: "female" }
      ]
    },
    {
      id: 3,
      text: "What is your waist measurement?",
      image: "/img/q3.1.png", // Will be dynamic based on gender
      options: [] // Will be populated dynamically
    },
    {
      id: 4,
      text: "What is your Body Mass Index (BMI)?",
      image: "/img/q4.png",
      subtitle: "(BMI = body weight in kg ÷ height in m²)",
      options: [
        { text: "< 23 kg/m²", points: 0, value: "bmi_under23" },
        { text: "23–24.9 kg/m²", points: 1, value: "bmi_23-24" },
        { text: "25–26.9 kg/m²", points: 2, value: "bmi_25-26" },
        { text: "≥ 27 kg/m²", points: 3, value: "bmi_over27" }
      ]
    },
    {
      id: 5,
      text: "Do you have diabetes?",
      image: "/img/q5.png",
      options: [
        { text: "No", points: 0, value: "no_diabetes" },
        { text: "Yes", points: 2, value: "has_diabetes" }
      ]
    },
    {
      id: 6,
      text: "What is your HbA1c*?(glycated haemoglobin test)",
      image: "/img/q6.png",
      options: [
        { text: "No", points: 0, value: "normal_cholesterol" },
        { text: "Yes", points: 2, value: "abnormal_cholesterol" }
      ]
    },
    {
      id: 7,
      text: "Have you heard your cholesterol levels are abnormal?",
      image: "/img/q7.png",
      options: [
        { text: "No", points: 0, value: "normal_cholesterol" },
        { text: "Yes", points: 2, value: "abnormal_cholesterol" }
      ]
    },
    {
      id: 8,
      text: "Are you physically active?",
      image: "/img/q8.png",
      options: [
        { text: "No", points: 1, value: "not_active" },
        { text: "Yes", points: 0, value: "physically_active" }
      ]
    }
  ];
  // Add gender-specific questions
  const getGenderSpecificQuestions = () => {
    const currentGender = answers[1]?.value || userData?.gender; // Get from current answer or user data

    if (currentGender === 'male') {
      return [{
        id: 9,
        text: "Do you drink alcohol at least once a week?",
        image: "/img/q9.2.png",
        options: [
          { text: "No", points: 0, value: "no_alcohol" },
          { text: "Yes", points: 1, value: "drinks_alcohol" }
        ]
      }];
    } else if (currentGender === 'female') {
      return [{
        id: 10,
        text: "Did you have menopause?",
        image: "/img/q9.1.png",
        options: [
          { text: "No", points: 0, value: "no_menopause" },
          { text: "Yes", points: 1, value: "has_menopause" }
        ]
      }];
    }
    return [];
  };

  const allQuestions = [...questions, ...getGenderSpecificQuestions()];

  const handleAnswerSelect = (option) => {
    const newAnswers = {
      ...answers,
      [currentQuestion]: option
    };
    setAnswers(newAnswers);

    // Calculate total score
    const score = Object.values(newAnswers).reduce((sum, answer) => sum + answer.points, 0);
    setTotalScore(score);
  };

  const handleNext = () => {
    if (currentQuestion < allQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Quiz completed, save results and proceed
      const quizResults = {
        answers,
        totalScore,
        riskLevel: totalScore >= 8 ? 'high' : 'low',
        completedAt: new Date().toISOString()
      };

      // Save to localStorage
      const existingData = JSON.parse(localStorage.getItem('quizUserData') || '{}');
      localStorage.setItem('quizUserData', JSON.stringify({
        ...existingData,
        quizResults
      }));

      onNext(quizResults);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      onPrevious();
    }
  };

  let currentQ = allQuestions[currentQuestion];

  // Handle dynamic waist measurement options based on gender
  if (currentQ.id === 3) {
    const currentGender = answers[1]?.value || userData?.gender;
    currentQ = {
      ...currentQ,
      image: currentGender === 'male' ? "/img/q3.1.png" : "/img/q3.2.png",
      options: currentGender === 'male' ? [
        { text: "< 80 cm (31 in)", points: 0, value: "male_under80" },
        { text: "80–89.9 cm (31–34.9 in)", points: 2, value: "male_80-89" },
        { text: "90–99.9 cm (35–38.9 in)", points: 3, value: "male_90-99" },
        { text: "≥ 100 cm (39 in)", points: 4, value: "male_over100" }
      ] : [
        { text: "< 75 cm (29 in)", points: 0, value: "female_under75" },
        { text: "75–84.9 cm (29–32.9 in)", points: 1, value: "female_75-84" },
        { text: "85–94.9 cm (33–36.9 in)", points: 2, value: "female_85-94" },
        { text: "≥ 95 cm (37 in)", points: 3, value: "female_over95" }
      ]
    };
  }
  const selectedAnswer = answers[currentQuestion];

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration circle */}
      <div className="absolute right-0 top-0 transform translate-x-1/2 -translate-y-1/4 w-52 h-52 md:w-96 md:h-96 bg-cyan-100 rounded-full"></div>

      {/* Main Quiz Container */}
      <div className="w-full max-w-2xl mx-auto z-10">
        <div className="bg-white rounded-3xl p-6 shadow-2xl border border-gray-100">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Question {currentQuestion + 1} of 9</span>
              <span>Score: {totalScore}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-cyan-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / allQuestions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question Image */}
          <div className="bg-white rounded-2xl p-2 mb-6 flex items-center justify-center">
            <Image
              src={currentQ.image}
              width={300}
              key={`question-${currentQuestion}-${currentQ.id}`}
              height={200}
              alt='question illustration'
              className={`h-auto object-contain ${currentQ.id === 1 ? 'w-full max-w-[250px]' : // Age question
                currentQ.id === 2 ? 'w-full max-h-[150px]' : // Gender question  
                  currentQ.id === 3 ? 'w-full max-h-[150px]' : // Waist measurement
                    currentQ.id === 4 ? 'w-full max-h-[150px]' : // BMI question
                      'w-full max-h-[150px]' // Default for other questions
                }`}
            />
          </div>

          {/* Question */}
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {currentQ.text}
            </h2>
            {currentQ.subtitle && (
              <p className="text-gray-600 text-sm">
                {currentQ.subtitle}
              </p>
            )}
          </div>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 flex items-center ${selectedAnswer?.value === option.value
                  ? 'border-cyan-500 bg-cyan-50 text-cyan-800'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-600'
                  }`}
              >
                <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${selectedAnswer?.value === option.value
                  ? 'border-cyan-500 bg-cyan-500'
                  : 'border-gray-300'
                  }`}>
                  {selectedAnswer?.value === option.value && (
                    <div className="w-3 h-3 rounded-full bg-white"></div>
                  )}
                </div>
                <span className="font-medium">{option.text}</span>
              </button>
            ))}
          </div>
          {currentQuestion == 3 && (<div>
            <Link href="https://nash24x7.com/bmi/" className={` p-2 mb-2 text-left rounded-xl border-2 transition-all duration-200 flex items-center text-gray-600`}> Calculate your BMI
            </Link>

          </div>)}
          
          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              className="text-gray-600 font-semibold text-lg hover:text-gray-800 transition-colors duration-200"
            >
              Previous
            </button>

            <button
              onClick={handleNext}
              disabled={!selectedAnswer}
              className={`font-bold text-lg px-8 py-3 rounded-full shadow-lg transition-all duration-200 ${selectedAnswer
                ? 'bg-cyan-500 hover:bg-cyan-600 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
            >
              {currentQuestion === allQuestions.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Results Component
const ResultsComponent = ({ onRestart, userData, quizResults }) => {
  const score = quizResults.totalScore;

  // Determine risk level based on score
  const getRiskLevel = (score) => {
    if (score >= 8) return { level: 'High Risk', color: 'red', bgColor: 'bg-red-50' };
    if (score >= 4) return { level: 'Moderate Risk', color: 'yellow', bgColor: 'bg-yellow-50' };
    return { level: 'Low Risk', color: 'green', bgColor: 'bg-green-50' };
  };

  const riskInfo = getRiskLevel(score);
  const isHighRisk = score >= 8;

  // Calculate slider position (score ranges from 0-15)
  const getSliderPosition = (score) => {
    return Math.min((score / 15) * 100, 100);
  };

  useEffect(() => {
  const saveData = async () => {
    try {
      // Save to database
      const response = await fetch('/api/save-quiz-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userData,
          score
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        console.log('Data saved to database successfully');
      } else {
        console.error('Failed to save to database:', result.message);
      }
    } catch (error) {
      console.error('Error saving to database:', error);
    }
  };

  saveData();
}, []);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration circle - same as homepage */}
      <div className="absolute right-0 top-0 transform translate-x-1/2 -translate-y-1/4 w-52 h-52 md:w-96 md:h-96 bg-cyan-100 rounded-full"></div>
      <div className="rounded-lg absolute top-0 right-0 z-100 flex items-center justify-center">
        <Image
          src="/img/ayushman_logo.png"
          alt="Ayushman Liver"
          width={500}
          height={367}
          className="w-[140px]"
          priority
        />
      </div>




      {/* Results Container */}
      <div className="w-full max-w-md mx-auto z-10 mt-[60px]">
        <div className="  p-6  text-center">

          {/* Title */}
          {score && score < 8 ? (<h1 className="text-3xl font-bold text-green-600 mb-2">
            Healthy
          </h1>) : (<h1 className="text-3xl font-bold text-red-600 mb-2">
            Unhealthy
          </h1>)}
          {score && score < 8 ? (<h1 className="text-3xl font-bold text-green-600 mb-2">
            Liver Score
          </h1>) : (<h1 className="text-3xl font-bold text-red-600 mb-2">
            Liver Score
          </h1>)}


          {/* Score Display */}
          <div className={`text-5xl font-bold ${score < 8 ? 'text-green-600' : 'text-red-600'}  mb-6`}>
            {score}
          </div>

          {/* Risk Level Labels */}
          <div className="flex justify-between items-center mb-4 text-xs font-semibold">
            <span className="text-green-600 " style={{ flex: '4' }}>Low Risk</span>
            <span className="text-yellow-600" style={{ flex: '5' }}>Moderate Risk</span>
            <span className="text-red-600" style={{ flex: '7' }}>High Risk</span>
          </div>

          {/* Risk Slider */}
          <div className="relative mb-8">
            {/* Background slider track with three colors */}
            <div className="h-8 rounded-full overflow-hidden flex">
              <div className="bg-green-500" style={{ flex: '3' }}></div>
              <div className="bg-yellow-500" style={{ flex: '5' }}></div>
              <div className="bg-red-500" style={{ flex: '7' }}></div>
            </div>

            {/* Score markers positioned correctly */}
            <div className="flex justify-between mt-2 mb-4 text-sm text-gray-600 relative">
              <span className="absolute left-0">1</span>
              <span className="absolute left-[20%] transform -translate-x-1/2">3</span>
              {/* <span className="absolute left-[40%] transform -translate-x-1/2">4</span> */}
              {/* <span className="absolute left-[60%] transform -translate-x-1/2">7</span> */}
              <span className="absolute left-[53%] transform -translate-x-1/2">8</span>
              {/* <span className="absolute right-0">15</span> */}
            </div>

            {/* Position indicator below slider */}
            <div className="relative">
              <div
                className="absolute flex flex-col items-center transition-all duration-500"
                style={{ left: `${getSliderPosition(score)}%`, transform: 'translateX(-50%)' }}
              >
                {/* Pointer/Arrow */}
                <div className="w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-gray-800"></div>
                {/* "You are here" text */}
                <div className="bg-gray-800 text-white px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap mt-1">
                  You are here
                </div>
              </div>
            </div>
          </div>

          {/* Risk Message */}
          <div className="mb-6 mt-15">
            {isHighRisk ? (
              <p className="text-red-600 font-semibold text-base">
                You are at high risk for Metabolic dysfunction-Associated Steatotic Liver Disease (MASLD). Consult your doctor at the earliest and ask about MASLD and further steps to the taken.
              </p>
            ) : (
              <p className="text-green-600 font-semibold text-lg">
                Your liver is healthy. We appreciate your commitment to maintaining good liver health. Get in touch with your doctor to know more about Liver Health and how to keep it healthy in the long run.
              </p>
            )}
          </div>

          {/* Additional Information */}
          <div className="text-center mb-6">
            <p className="text-gray-700 font-semibold mb-2">
              For more insights about liver health,
            </p>
            <p className="text-gray-700 font-semibold">

              visit our  <Link href="https://ayushmanliver.com" className='underline'>Ayushman Liver website</Link>.
            </p>
          </div>

          {/* Disclaimer */}
          <div className="text-xs text-gray-500 leading-relaxed">
            <p className="mb-2">
              <strong>Note:</strong> This risk assessment tool is not intended as medical advice or to suggest treatment.
            </p>
            <p>
              The study investigators recommend you consult your physician or other healthcare professional for advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Disclaimer Component
const DisclaimerComponent = ({ onNext, onPrevious }) => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration circle */}
      <div className="absolute right-0 top-0 transform translate-x-1/2 -translate-y-1/4 w-52 h-52 md:w-96 md:h-96 bg-cyan-100 rounded-full"></div>

      {/* Main Disclaimer Container */}
      <div className="w-full max-w-md mx-auto z-10">
        <div className="bg-cyan-400 rounded-3xl p-6 shadow-2xl">
          {/* Liver Character Image */}
          <div className="bg-white rounded-2xl p-6 mb-6 flex items-center justify-center">
            <Image src="/img/user_form.png" width={216} height={172} alt='liver disclaimer' />
          </div>

          {/* Disclaimer Content */}
          <div className="bg-white rounded-2xl p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Disclaimer</h2>

            <div className="space-y-4 text-gray-700">
              <p className="text-sm leading-relaxed">
                This Risk Assessment Tool is not intended to offer medical advice or to suggest a treatment.
              </p>

              <p className="text-sm leading-relaxed">
                In case of high score, you need to consult your doctor for further assessment & advice.
              </p>
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
              onClick={onNext}
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
  const [currentStep, setCurrentStep] = useState('home');
  const [userData, setUserData] = useState(null);
  const [quizResults, setQuizResults] = useState(null);

  // Load saved data on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('quizUserData');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setUserData(parsed);
    }
  }, []);

  const handleLetsGo = () => {
    setCurrentStep('userInfo');
  };

  const handleUserInfoNext = (formData) => {
    setUserData(formData);
    // Save user data to in-memory state (localStorage not supported in artifacts)
    console.log('User data collected:', formData);
    setCurrentStep('disclaimer');
  };
  const handleDisclaimerNext = () => {
    setCurrentStep('quiz');
  };

  const handleBackToDisclaimer = () => {
    setCurrentStep('disclaimer');
  };
  const handleQuizComplete = (results) => {
    setQuizResults(results);
    setCurrentStep('results');
  };

  const handleBackToHome = () => {
    setCurrentStep('home');
  };

  const handleBackToUserInfo = () => {
    setCurrentStep('userInfo');
  };

  const handleRestart = () => {
    setUserData(null);
    setQuizResults(null);
    setCurrentStep('home');
  };

  // Render based on current step
  switch (currentStep) {
    case 'userInfo':
      return (
        <UserInfoForm
          onNext={handleUserInfoNext}
          onPrevious={handleBackToHome}
        />
      );

    case 'quiz':
      return (
        <QuizComponent
          onNext={handleQuizComplete}
          onPrevious={handleBackToUserInfo}
          userData={userData}
        />
      );

    case 'results':
      return (
        <ResultsComponent
          onRestart={handleRestart}
          userData={userData}
          quizResults={quizResults}
        />
      );
    case 'disclaimer':
      return (
        <DisclaimerComponent
          onNext={handleDisclaimerNext}
          onPrevious={handleBackToUserInfo}
        />
      );

    case 'quiz':
      return (
        <QuizComponent
          onNext={handleQuizComplete}
          onPrevious={handleBackToDisclaimer}
          userData={userData}
        />
      );
    default:
      // Homepage
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

            {/* Liver image placeholder */}
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
  }
};

export default Homepage;
