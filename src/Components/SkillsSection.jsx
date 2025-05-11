import React from 'react';
import '../styles/SkillsSection.css';
import ScrollArrow from "./ScrollArrow.jsx";
// Placeholder images - replace with your actual images or use a data array


// Sample data for skills - in a real app, this might come from an API
const skillsData = [
  { id: 1, name: 'Work Out', description: 'Achieve your fitness goals.' },
  { id: 2, name: 'Healthy Diet', description: 'Learn to eat nutritious food.' },
  { id: 3, name: 'Coding', description: 'Master programming languages.' },
  { id: 4, name: 'Graphic Design', description: 'Create stunning visuals.' },
  { id: 5, name: 'Digital Marketing', description: 'Boost online presence.' },
  { id: 6, name: 'Content Writing', description: 'Craft compelling stories.' },
  // Add more skills as needed
];

const SkillsSection = () => {
  return (
    <section id="skills" className="skills-section">
      <h2 className="skills-title">SKILLS</h2>
      <div className="skills-grid">
        {skillsData.map(skill => (
          <div key={skill.id} className="skill-card">
            
            <div className="skill-card-overlay">
              <h3 className="skill-card-name">{skill.name}</h3>
              {/* You can add skill.description here if desired */}
            </div>
          </div>
        ))}
      </div>
      <ScrollArrow/> 
    </section>
  );
};

export default SkillsSection;