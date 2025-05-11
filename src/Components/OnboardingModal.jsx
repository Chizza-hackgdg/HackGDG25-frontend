
import React, { useState } from 'react';
import { FaArrowRight, FaArrowLeft, FaCheck } from 'react-icons/fa';

const steps = [
  { title: "Welcome to ICHU!", content: "Let's get you started on your self-improvement journey. We'll guide you through setting up your first goal and understanding how ICHU helps you grow." },
  { title: "Set Your Goals", content: "On your Dashboard, you can define your personal or professional goals. Break them down into manageable milestones. You can even find an accountability partner in our forums!" },
  { title: "AI-Powered Assistance", content: "Our AI chat is here to help you brainstorm, plan your milestones, and offer guidance. Use it to refine your strategies and overcome obstacles." },
  { title: "Community Verification", content: "Share your milestone achievements in the Forums. The ICHU community can review your progress, offer feedback, and help verify your accomplishments, boosting your score and visibility!" },
  { title: "Track & Achieve", content: "Your Dashboard will be your central hub for tracking progress, managing milestones, and seeing your growth. Ready to unlock your potential?" },
];

const OnboardingModal = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const overlayStyle = { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 };
  const contentStyle = { backgroundColor: '#1A1529', padding: '30px 40px', borderRadius: '12px', width: '90%', maxWidth: '550px', textAlign: 'center', boxShadow: '0 5px 25px rgba(0,0,0,0.4)', borderTop: '4px solid #8A2BE2'};
  const titleStyle = { color: '#DA70D6', fontSize: '1.8rem', marginBottom: '15px'};
  const pStyle = { color: '#A0A0A0', lineHeight: '1.6', fontSize: '1rem', marginBottom: '25px'};
  const buttonBaseStyle = { padding: '10px 20px', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer', transition: 'background-color 0.3s ease, transform 0.2s ease', display: 'inline-flex', alignItems: 'center', gap: '8px'};
  const nextButtonStyle = {...buttonBaseStyle, backgroundColor: '#8A2BE2', color: 'white', marginRight: '10px'};
  const prevButtonStyle = {...buttonBaseStyle, backgroundColor: '#251E3A', color: '#A0A0A0'};
  const progressDotsContainerStyle = {display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '10px'};
  const dotStyle = (isActive) => ({ height: '10px', width: '10px', borderRadius: '50%', backgroundColor: isActive ? '#8A2BE2' : '#606060', margin: '0 5px'});


  return (
    <div style={overlayStyle} className="onboarding-modal-overlay">
      <div style={contentStyle} className="onboarding-modal-content">
        <h2 style={titleStyle}>{steps[currentStep].title}</h2>
        <p style={pStyle}>{steps[currentStep].content}</p>
        <div style={progressDotsContainerStyle}>
            {steps.map((_, index) => (
                <div key={index} style={dotStyle(index === currentStep)}></div>
            ))}
        </div>
        <div>
            {currentStep > 0 && (
                <button onClick={handlePrev} style={prevButtonStyle}><FaArrowLeft/> Back</button>
            )}
            <button onClick={handleNext} style={nextButtonStyle}>
              {currentStep < steps.length - 1 ? <>Next <FaArrowRight/></> : <>Get Started <FaCheck/></>}
            </button>
        </div>
      </div>
    </div>
  );
};
export default OnboardingModal;