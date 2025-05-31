'use client'
import React, { useState, useEffect } from 'react';
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
      text: "What is your waist measurement?",
      image: userData?.gender === 'male' ?"/img/q3.1.png": "/img/q3.2.png",
      options: userData?.gender === 'male' ? [
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
    },
    {
      id: 3,
      text: "What is your Body Mass Index (BMI)?",
      image: "/img/q3.png",
      subtitle: "(BMI = body weight in kg ÷ height in m²)",
      options: [
        { text: "< 23 kg/m²", points: 0, value: "bmi_under23" },
        { text: "23–24.9 kg/m²", points: 1, value: "bmi_23-24" },
        { text: "25–26.9 kg/m²", points: 2, value: "bmi_25-26" },
        { text: "≥ 27 kg/m²", points: 3, value: "bmi_over27" }
      ]
    },
    {
      id: 4,
      text: "Do you have diabetes?",
      image: "/img/age_question.png",
      options: [
        { text: "No", points: 0, value: "no_diabetes" },
        { text: "Yes", points: 2, value: "has_diabetes" }
      ]
    },
    {
      id: 5,
      text: "Have you heard your cholesterol levels are abnormal?",
      image: "/img/age_question.png",
      options: [
        { text: "No", points: 0, value: "normal_cholesterol" },
        { text: "Yes", points: 2, value: "abnormal_cholesterol" }
      ]
    },
    {
      id: 6,
      text: "Are you physically active?",
      image: "/img/age_question.png",
      options: [
        { text: "No", points: 1, value: "not_active" },
        { text: "Yes", points: 0, value: "physically_active" }
      ]
    }
  ];

  // Add gender-specific questions
  const genderSpecificQuestions = userData?.gender === 'male' ? [
    {
      id: 7,
      text: "Do you drink alcohol at least once a week?",
      image: "/img/age_question.png",
      options: [
        { text: "No", points: 0, value: "no_alcohol" },
        { text: "Yes", points: 1, value: "drinks_alcohol" }
      ]
    }
  ] : [
    {
      id: 8,
      text: "Did you have menopause?",
      image: "/img/age_question.png",
      options: [
        { text: "No", points: 0, value: "no_menopause" },
        { text: "Yes", points: 1, value: "has_menopause" }
      ]
    }
  ];

  const allQuestions = [...questions, ...genderSpecificQuestions];

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

  const currentQ = allQuestions[currentQuestion];
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
              <span>Question {currentQuestion + 1} of {allQuestions.length}</span>
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
          <div className="bg-white rounded-2xl p-6 mb-6 flex items-center justify-center">
            <Image src={currentQ.image} width={300} height={200} alt='question illustration' />
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
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
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
  const isHighRisk = quizResults.totalScore >= 8;

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration circle */}
      <div className="absolute right-0 top-0 transform translate-x-1/2 -translate-y-1/4 w-52 h-52 md:w-96 md:h-96 bg-cyan-100 rounded-full"></div>

      {/* Results Container */}
      <div className="w-full max-w-2xl mx-auto z-10">
        <div className={`rounded-3xl p-8 shadow-2xl ${isHighRisk ? 'bg-red-50 border-2 border-red-200' : 'bg-green-50 border-2 border-green-200'}`}>
          {/* Header */}
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">
              {isHighRisk ? '⚠️' : '✅'}
            </div>
            <h1 className="text-3xl font-bold mb-2">
              {isHighRisk ? 'High Risk Detected' : 'Low Risk'}
            </h1>
            <p className="text-xl text-gray-600">
              Your NAFLD Risk Score: <span className="font-bold text-2xl">{quizResults.totalScore}</span>
            </p>
          </div>

          {/* Risk Assessment */}
          <div className={`p-6 rounded-2xl mb-6 ${isHighRisk ? 'bg-red-100' : 'bg-green-100'}`}>
            {isHighRisk ? (
              <div>
                <h3 className="text-xl font-bold text-red-800 mb-3">
                  You are at high risk for Non-Alcoholic Fatty Liver Disease (NAFLD)
                </h3>
                <p className="text-red-700 mb-4">
                  We recommend that you consult with your doctor about NAFLD and consider further medical tests.
                </p>
                <div className="bg-red-200 p-4 rounded-lg">
                  <p className="text-red-800 font-semibold text-sm">
                    ⚠️ Important: This assessment is not intended as medical advice.
                    Always consult your physician or healthcare professional for proper diagnosis and treatment.
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-bold text-green-800 mb-3">
                  Your risk for NAFLD appears to be low
                </h3>
                <p className="text-green-700 mb-4">
                  Based on your responses, you have a lower risk of developing Non-Alcoholic Fatty Liver Disease.
                  Continue maintaining a healthy lifestyle with regular exercise and a balanced diet.
                </p>
                <div className="bg-green-200 p-4 rounded-lg">
                  <p className="text-green-800 font-semibold text-sm">
                    💡 Remember: Regular health check-ups are still important for maintaining good health.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* User Info Summary */}
          <div className="bg-white p-6 rounded-2xl mb-6">
            <h4 className="font-bold text-gray-800 mb-3">Assessment Summary for:</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="font-semibold">Name:</span> {userData.name}</div>
              <div><span className="font-semibold">Email:</span> {userData.email}</div>
              <div><span className="font-semibold">City:</span> {userData.city}</div>
              <div><span className="font-semibold">Mobile:</span> {userData.mobile}</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onRestart}
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-lg px-8 py-3 rounded-full shadow-lg transition-colors duration-200"
            >
              Take Assessment Again
            </button>
            <button
              onClick={() => window.print()}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold text-lg px-8 py-3 rounded-full shadow-lg transition-colors duration-200"
            >
              Print Results
            </button>
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