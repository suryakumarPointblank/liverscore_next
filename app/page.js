'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// BMI Calculator Modal Component
const BMICalculatorModal = ({ isOpen, onClose }) => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [unit, setUnit] = useState('metric'); // metric or imperial
  const [bmi, setBmi] = useState(null);
  const [bmiCategory, setBmiCategory] = useState('');

  const calculateBMI = () => {
    if (!weight || !height) {
      alert('Please enter both weight and height');
      return;
    }

    let weightKg = parseFloat(weight);
    let heightM = parseFloat(height);

    if (unit === 'imperial') {
      // Convert pounds to kg and feet to meters
      weightKg = weightKg * 0.453592;
      heightM = heightM * 0.3048;
    } else {
      // Convert cm to meters if needed
      if (heightM > 3) {
        heightM = heightM / 100;
      }
    }

    const calculatedBMI = weightKg / (heightM * heightM);
    setBmi(calculatedBMI.toFixed(1));

    // Determine BMI category
    if (calculatedBMI < 18.5) {
      setBmiCategory('Underweight');
    } else if (calculatedBMI < 23) {
      setBmiCategory('Normal weight');
    } else if (calculatedBMI < 25) {
      setBmiCategory('Overweight');
    } else if (calculatedBMI < 30) {
      setBmiCategory('Obesity Class I');
    } else {
      setBmiCategory('Obesity Class II or higher');
    }

    // Track BMI calculation
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'bmi_calculated',
      bmi_value: calculatedBMI.toFixed(1),
      bmi_category: calculatedBMI < 18.5 ? 'Underweight' : 
                   calculatedBMI < 23 ? 'Normal weight' :
                   calculatedBMI < 25 ? 'Overweight' :
                   calculatedBMI < 30 ? 'Obesity Class I' : 'Obesity Class II or higher',
      quiz_type: 'fatty_liver_score'
    });
  };

  const resetCalculator = () => {
    setWeight('');
    setHeight('');
    setBmi(null);
    setBmiCategory('');
  };

  const handleClose = () => {
    resetCalculator();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl p-6 shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">BMI Calculator</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Input Fields */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Weight {unit === 'metric' ? '(kg)' : '(lbs)'}
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder={unit === 'metric' ? 'Enter weight in kg' : 'Enter weight in lbs'}
              className="w-full px-4 py-3 bg-gray-50 rounded-full text-gray-700 placeholder-gray-500 border-none outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Height {unit === 'metric' ? '(cm)' : '(ft)'}
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder={unit === 'metric' ? 'Enter height in cm or m' : 'Enter height in ft'}
              step={unit === 'metric' ? '0.1' : '0.1'}
              className="w-full px-4 py-3 bg-gray-50 rounded-full text-gray-700 placeholder-gray-500 border-none outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
        </div>

        {/* Calculate Button */}
        <button
          onClick={calculateBMI}
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 rounded-full shadow-lg transition-colors duration-200 mb-6"
        >
          Calculate BMI
        </button>

        {/* Results */}
        {bmi && (
          <div className="bg-cyan-50 rounded-2xl p-6 mb-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Your BMI is</h3>
              <div className="text-4xl font-bold text-cyan-600 mb-2">{bmi}</div>
              <div className="text-gray-700 font-medium">{bmiCategory}</div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={resetCalculator}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 rounded-full transition-colors duration-200"
          >
            Reset
          </button>
          <button
            onClick={handleClose}
            className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-3 rounded-full transition-colors duration-200"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

// User Info Form Component
const UserInfoForm = ({ onNext, onPrevious }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    city: '',
    mobile: ''
  });

  // Track when user info form is viewed
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'user_info_form_viewed',
      quiz_type: 'fatty_liver_score'
    });
  }, []);

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

    // Track form completion
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'user_info_completed',
      quiz_type: 'fatty_liver_score'
    });

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
  const [showBMICalculator, setShowBMICalculator] = useState(false);

  // Track quiz start when component mounts
  useEffect(() => {
    // Get UTM parameters to track source
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get('utm_source');
    const utmMedium = urlParams.get('utm_medium');
    const utmCampaign = urlParams.get('utm_campaign');
    
    // Track quiz start
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'quiz_started',
      utm_source: utmSource || 'direct',
      utm_medium: utmMedium || 'none',
      utm_campaign: utmCampaign || 'none',
      quiz_type: 'fatty_liver_score',
      total_questions: 9
    });
  }, []);

  // Quiz questions based on the NAFLD Risk Assessment
  const questions = [
    {
      id: 1,
      text: "What is your age group?",
      image: "/img/q1.png",
      subtext: "",
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
      subtext: "Taken below the ribs, usually at the level of the navel",
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
      subtext: "HbA1c is a blood test that shows your average blood sugar levels over the past 2 to 3 months.",
      image: "/img/q6.png",
      options: [
        { text: "Less than 7", points: 0, value: "Less than 7" },
        { text: "Greater than 7", points: 0, value: "Greater than 7" },
        { text: "Dont know", points: 0, value: "Dont know" }
      ]
    },
    {
      id: 7,
      text: "Do you have a history of High Cholesterol?",
      image: "/img/q7.png",
      options: [
        { text: "No", points: 0, value: "normal_cholesterol" },
        { text: "Yes", points: 2, value: "abnormal_cholesterol" }
      ]
    },
    {
      id: 8,
      text: "Are you physically active?",
      subtext: "You are considered physically active if you participate in any sport/exercises for at least 20 consecutive minutes 3 times throughout per week",
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
        text: "Are/Have You Experiencing/Experienced Menopause?",
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

    // Track the answer selection with question-specific events
    const questionId = allQuestions[currentQuestion].id;
    window.dataLayer = window.dataLayer || [];
    
    // Generic quiz answer event
    window.dataLayer.push({
      event: 'quiz_answer',
      question_id: `question_${questionId}`,
      question_text: allQuestions[currentQuestion].text,
      selected_option: option.value,
      selected_text: option.text,
      points_awarded: option.points,
      current_total_score: score,
      question_number: currentQuestion + 1,
      quiz_type: 'fatty_liver_score'
    });

    // Question-specific events for detailed tracking
    // For Q9 (alcohol) and Q10 (menopause), both track as question 9 since they're the same position
    const trackingQuestionId = (questionId === 10) ? 9 : questionId;
    const questionType = questionId === 9 ? 'alcohol' : questionId === 10 ? 'menopause' : '';
    
    window.dataLayer.push({
      event: `quiz_question_${trackingQuestionId}_answered`,
      question_id: `question_${questionId}`,
      question_text: allQuestions[currentQuestion].text,
      selected_option: option.value,
      selected_text: option.text,
      points_awarded: option.points,
      current_total_score: score,
      question_number: currentQuestion + 1,
      question_type_detail: questionType,
      quiz_type: 'fatty_liver_score'
    });
  };

  const handleNext = () => {
    if (currentQuestion < allQuestions.length - 1) {
      // Track question progression
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'quiz_question_next',
        from_question: currentQuestion + 1,
        to_question: currentQuestion + 2,
        quiz_type: 'fatty_liver_score'
      });
      
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Quiz completed - determine risk level
      const riskLevel = totalScore >= 8 ? 'high' : totalScore >= 4 ? 'moderate' : 'low';
      
      // Track quiz completion
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'quiz_completed',
        final_score: totalScore,
        risk_level: riskLevel,
        total_questions: allQuestions.length,
        quiz_type: 'fatty_liver_score',
        answers_summary: Object.keys(answers).length
      });

      // Quiz completed, save results and proceed
      const quizResults = {
        answers,
        totalScore,
        riskLevel,
        completedAt: new Date().toISOString()
      };

      onNext(quizResults);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      // Track backward navigation
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'quiz_question_previous',
        from_question: currentQuestion + 1,
        to_question: currentQuestion,
        quiz_type: 'fatty_liver_score'
      });
      
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

      {/* BMI Calculator Modal */}
      <BMICalculatorModal 
        isOpen={showBMICalculator} 
        onClose={() => setShowBMICalculator(false)} 
      />

      {/* Main Quiz Container */}
      <div className="w-full max-w-2xl mx-auto z-10">
        <div className="bg-white rounded-3xl p-6 shadow-2xl border border-gray-100">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Question {currentQuestion + 1} of 9</span>
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
              key={`question-${currentQuestion}-${currentQ.id}`}
              width={300}
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
            {currentQ.subtext && (
              <p className="text-gray-600 text-sm">
                {currentQ.subtext}
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

          {/* BMI Calculator Button - Show only on BMI question */}
          {currentQuestion === 3 && (
            <div className="mb-6">
              <button
                onClick={() => {
                  // Track BMI calculator open
                  window.dataLayer = window.dataLayer || [];
                  window.dataLayer.push({
                    event: 'bmi_calculator_opened',
                    quiz_type: 'fatty_liver_score',
                    question_number: currentQuestion + 1
                  });
                  setShowBMICalculator(true);
                }}
                className="w-full p-3 text-center rounded-xl border-2 border-cyan-200 bg-cyan-50 text-cyan-700 hover:bg-cyan-100 hover:border-cyan-300 transition-all duration-200 font-medium"
              >
                🧮 Calculate your BMI
              </button>
            </div>
          )}

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

  // Track results view when component mounts
  useEffect(() => {
    const riskLevel = score >= 8 ? 'high' : score >= 4 ? 'moderate' : 'low';
    
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'results_viewed',
      final_score: score,
      risk_level: riskLevel,
      quiz_type: 'fatty_liver_score'
    });
  }, [score]);

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
    // Adjust score to point slightly before the actual value
    let adjustedScore = score - 0.1;
    if (score == 8) {
      adjustedScore = score + 0.05;
    }
    else if (score == 9) {
      adjustedScore = score + 0.09
    }
    // Total flex units: 4.1 + 4.1 + 7 = 15.2
    const totalFlexUnits = 15.2;

    return Math.min((adjustedScore / totalFlexUnits) * 100, 100);
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
          
          // Track successful data save
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: 'quiz_data_saved',
            quiz_type: 'fatty_liver_score',
            final_score: score
          });
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
          <h1 className="text-3xl font-bold text-black/90 mb-2 mt-5">
            Your Liver Score is
          </h1>

          {/* Score Display */}
          <div className={`text-5xl font-bold text-black/90 mb-6`}>
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
              <div className="bg-green-500" style={{ flex: '4.1' }}></div>
              <div className="bg-yellow-500" style={{ flex: '4.1' }}></div>
              <div className="bg-red-500" style={{ flex: '7' }}></div>
            </div>

            {/* Score markers positioned correctly */}
            <div className="flex justify-between mt-2 mb-4 text-sm text-gray-600 relative">
              <span className="absolute left-0">0</span>
              <span className="absolute left-[25.49%] transform -translate-x-1/2">4</span>
              <span className="absolute left-[53.0%] transform -translate-x-1/2">8</span>
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
            {score > 8 ? (
              <p className="text-red-600 font-semibold text-base">
                You are at high risk for Metabolic dysfunction-Associated Steatotic Liver Disease (MASLD). Consult your doctor at the earliest and ask about further steps to be taken.
              </p>
            ) : score > 4 ? (
              <p className="text-yellow-500 font-semibold text-lg">
                You are at moderate risk for Metabolic dysfunction-Associated Steatotic Liver Disease (MASLD). Consult your doctor at the earliest and ask about MASLD and further steps to be taken.
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
              visit our  <Link 
                href="https://ayushmanliver.com" 
                className='underline'
                onClick={() => {
                  // Track website link click
                  window.dataLayer = window.dataLayer || [];
                  window.dataLayer.push({
                    event: 'website_link_clicked',
                    link_destination: 'ayushmanliver.com',
                    quiz_type: 'fatty_liver_score',
                    user_score: score
                  });
                }}
              >
                Ayushman Liver website
              </Link>.
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
  // Track disclaimer view
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'disclaimer_viewed',
      quiz_type: 'fatty_liver_score'
    });
  }, []);

  const handleNext = () => {
    // Track disclaimer acceptance
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'disclaimer_accepted',
      quiz_type: 'fatty_liver_score'
    });
    
    onNext();
  };

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
  const [currentStep, setCurrentStep] = useState('homepage');
  const [userData, setUserData] = useState(null);
  const [quizResults, setQuizResults] = useState(null);

  // Track homepage view when component mounts
  useEffect(() => {
    if (currentStep === 'homepage') {
      // Get UTM parameters for attribution
      const urlParams = new URLSearchParams(window.location.search);
      const utmSource = urlParams.get('utm_source');
      const utmMedium = urlParams.get('utm_medium');
      const utmCampaign = urlParams.get('utm_campaign');
      
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'quiz_homepage_viewed',
        utm_source: utmSource || 'direct',
        utm_medium: utmMedium || 'none',
        utm_campaign: utmCampaign || 'none',
        quiz_type: 'fatty_liver_score'
      });
    }
  }, [currentStep]);

  // Load saved data on component mount
  useEffect(() => {
    // Note: localStorage is not supported in artifacts, so this would need to be adjusted for your environment
    // const savedData = localStorage.getItem('quizUserData');
    // if (savedData) {
    //   const parsed = JSON.parse(savedData);
    //   setUserData(parsed);
    // }
  }, []);

  const handleLetsGo = () => {
    // Track CTA button click
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'lets_go_clicked',
      quiz_type: 'fatty_liver_score'
    });
    
    setCurrentStep('userInfo');
  };

  const handleUserInfoNext = (formData) => {
    setUserData(formData);
    // Note: localStorage not supported in artifacts
    // localStorage.setItem('quizUserData', JSON.stringify(formData));
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
    // Track quiz restart
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'quiz_restarted',
      quiz_type: 'fatty_liver_score'
    });
    
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
          onPrevious={handleBackToDisclaimer}
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

    default:
      // Homepage
      return (
        <div className="h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden" style={{ background: 'radial-gradient(circle, #e0f3f9 0%, #c9e9f4 50%, #b7e3f0 100%)' }}>
          {/* Top right cloud decoration */}
          <div className="absolute -top-2 -right-2 w-64 h-48 md:w-80 md:h-60">
            <Image
              src="/img/clouds/right.png"
              alt="Top right cloud decoration"
              width={320}
              height={240}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Bottom left cloud decoration */}
          <div className="absolute -bottom-2 -left-2 w-48 h-36 md:w-64 md:h-48">
            <Image
              src="/img/clouds/left.png"
              alt="Bottom left cloud decoration"
              width={256}
              height={192}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Logo Section */}
          <div className="mb-8 z-10">
            <div className="flex items-center justify-center">
              <Image
                src="/img/ayushman_logo.png"
                alt="Ayushman Liver"
                width={500}
                height={367}
                className="w-[200px] md:w-[240px]"
                priority
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="text-center px-4 mb-12 z-10">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 leading-relaxed" style={{ color: '#4cbadb' }}>
              Answer the call. Own your liver health.
            </h2>
            <h3 className="text-lg md:text-xl font-medium text-gray-600 leading-relaxed">
              Assess your risk of fatty liver.
            </h3>
          </div>

          {/* CTA Button */}
          <div className="z-10">
            <button
              className="text-white font-bold text-xl px-12 py-4 rounded-full shadow-lg transition-colors duration-200"
              style={{ backgroundColor: '#4cbadb' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#3a9bc1'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#4cbadb'}
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