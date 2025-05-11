import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import '../styles/DashboardScreen.css';
import {
  FaTachometerAlt, FaClipboardList, FaComments, FaUserCircle, FaRobot,
  FaCodeBranch, FaChartBar, FaTasks, FaUsers, FaRedo, FaSquare, FaGift, FaLightbulb, FaStore, FaCog
} from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import OnboardingModal from '../Components/OnboardingModal.jsx';

const initialMockUser = {
  name: 'Alex Nova',
  username: 'alexnova',
  hasActiveGoal: true,
  partner: { name: 'Jordan Lee', username: 'jordanlee' },
  freeRerollsWeeklyTotal: 1,
  usedFreeRerollsThisWeek: 0,
  purchasedRerolls: 2,
  hasCompletedOnboarding: localStorage.getItem('onboardingComplete_alexnova') === 'true',
  subscriptionTier: 'Elite Plan'
};

const newMilestoneFormatDataForDashboard = [
  {
    milestoneName: "Setting Up Your First EF Core Project",
    goalDescription: "Create a new .NET project and install the necessary EF Core NuGet packages. Configure a basic DbContext and define a simple entity. (Skill Level: 1)",
    isCompleted: false, createdDate: "2025-05-11T12:14:15.0536773Z", status: "unverified", rerollAvailable: true, id: "ds_m1"
  },
  {
    milestoneName: "Defining Entities and Relationships",
    goalDescription: "Learn how to define entities with properties and configure relationships (one-to-one, one-to-many, many-to-many) using Fluent API or Data Annotations. (Skill Level: 1)",
    isCompleted: false, createdDate: "2025-05-11T12:14:15.0537517Z", status: "unverified", rerollAvailable: true, id: "ds_m2"
  },
  {
    milestoneName: "Basic CRUD Operations with EF Core",
    goalDescription: "Implement Create, Read, Update, and Delete (CRUD) operations using EF Core. Learn how to add, retrieve, modify, and delete data from the database. (Skill Level: 1)",
    isCompleted: true, createdDate: "2025-05-11T12:14:15.0537546Z", status: "verified", rerollAvailable: false, id: "ds_m3"
  },
  {
    milestoneName: "Querying Data with LINQ",
    goalDescription: "Master LINQ queries to retrieve data from the database using various filtering, sorting, and grouping techniques. (Skill Level: 2)",
    isCompleted: false, createdDate: "2025-05-11T12:14:15.0537557Z", status: "pending", rerollAvailable: false, id: "ds_m4"
  },
  {
    milestoneName: "Working with Migrations",
    goalDescription: "Learn how to use EF Core Migrations to manage database schema changes. Create, apply, and revert migrations. (Skill Level: 2)",
    isCompleted: false, createdDate: "2025-05-11T12:14:15.0537577Z", status: "unverified", rerollAvailable: true, id: "ds_m5"
  }
];

const sampleRerollTasksNames = [
  "Advanced Querying Techniques", "Handling Concurrency Conflicts", "Using Raw SQL Queries", "Performance Tuning and Optimization"
];
const sampleRerollTasksDescriptions = {
    "Advanced Querying Techniques": "Explore eager loading, explicit loading, and lazy loading. Understand performance implications. (Skill Level: 3)",
    "Handling Concurrency Conflicts": "Learn to handle concurrency conflicts with optimistic concurrency control using row versioning. (Skill Level: 3)",
    "Using Raw SQL Queries": "Execute raw SQL queries when LINQ is not sufficient. Understand security implications. (Skill Level: 3)",
    "Performance Tuning and Optimization": "Optimize EF Core performance by analyzing query execution plans, using caching, and reducing database round trips. (Skill Level: 4)"
};

const initialActiveGoalData = initialMockUser.hasActiveGoal ? {
  id: 'goal-ef-core-mastery', title: 'EF Core Mastery Path',
  description: 'A structured path to mastering Entity Framework Core, from setup to advanced optimization techniques.',
  category: 'Backend Development', overallProgress: 30, icon: <FaCodeBranch />, bgColor: 'bg-goal-coding',
  milestones: newMilestoneFormatDataForDashboard,
  weeklyContribution: [
    { name: 'Mon', value: 2 }, { name: 'Tue', value: 3 }, { name: 'Wed', value: 1 }, { name: 'Thu', value: 4 },
    { name: 'Fri', value: 2 }, { name: 'Sat', value: 5 }, { name: 'Today', value: 3 },
  ]
} : null;

const todayIndexContribution = initialActiveGoalData ? initialActiveGoalData.weeklyContribution.findIndex(d => d.name === 'Today') : -1;
const weeklyInsightsData = [
  { name: 'Mon', value: 30 }, { name: 'Tue', value: 45 }, { name: 'Wed', value: 60 }, { name: 'Thu', value: 50 },
  { name: 'Fri', value: 70 }, { name: 'Sat', value: 80 }, { name: 'Today', value: 65 },
];
const todayIndexInsights = weeklyInsightsData.findIndex(d => d.name === 'Today');

const DashboardScreen = () => {
  const [activeDashboardTab, setActiveDashboardTab] = useState('dashboard');
  const [currentUser, setCurrentUser] = useState(initialMockUser);
  const [currentGoal, setCurrentGoal] = useState(initialActiveGoalData);
  const [showOnboarding, setShowOnboarding] = useState(!currentUser.hasCompletedOnboarding);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
      const storedOnboardingStatus = localStorage.getItem(`onboardingComplete_${currentUser.username}`);
      if (storedOnboardingStatus === 'true') {
        if(currentUser.hasCompletedOnboarding === false) {
             setCurrentUser(prev => ({ ...prev, hasCompletedOnboarding: true }));
        }
        setShowOnboarding(false);
      } else {
        setShowOnboarding(!currentUser.hasCompletedOnboarding);
      }
  }, [currentUser.username, currentUser.hasCompletedOnboarding]);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    localStorage.setItem(`onboardingComplete_${currentUser.username}`, 'true');
    setCurrentUser(prev => ({ ...prev, hasCompletedOnboarding: true }));
  };

  const handleMilestoneInteraction = (milestoneUniqueId, milestoneName, currentStatus) => {
    const milestone = currentGoal.milestones.find(m => m.id === milestoneUniqueId);
    if (!milestone) return;

    if (milestone.status === 'verified') {
      alert(`Milestone "${milestoneName}" is already verified!`);
      return;
    }
    if (milestone.status === 'pending') {
      alert(`Milestone "${milestoneName}" is currently pending verification. Check the forums!`);
      return;
    }

    setCurrentGoal(prevGoal => ({
      ...prevGoal,
      milestones: prevGoal.milestones.map(m =>
        m.id === milestoneUniqueId ? { ...m, status: 'pending' } : m
      )
    }));
    const postTitle = `Verification Request: ${milestoneName}`;
    const postContent = `I believe I've completed the milestone: "${milestoneName}" (Description: ${milestone.goalDescription}) from my goal "${currentGoal.title}".\nPlease review my progress and help verify it! Evidence: [Link to my work/repo]`;
    navigate(`/forums/new?category=milestone-verification&title=${encodeURIComponent(postTitle)}&content=${encodeURIComponent(postContent)}&milestoneId=${milestoneUniqueId}`);
  };

  const handleRerollMilestone = (milestoneUniqueId) => {
    const milestoneToReroll = currentGoal.milestones.find(m => m.id === milestoneUniqueId);
    if (!milestoneToReroll || milestoneToReroll.status !== 'unverified' || !milestoneToReroll.rerollAvailable) {
        alert("This milestone cannot be rerolled now or reroll not available for it.");
        return;
    }

    let canReroll = false;
    let rerollTypeUsed = "";

    if (currentUser.freeRerollsWeeklyTotal > currentUser.usedFreeRerollsThisWeek) {
      canReroll = true;
      rerollTypeUsed = "free";
    } else if (currentUser.purchasedRerolls > 0) {
      canReroll = true;
      rerollTypeUsed = "purchased";
    }

    if (!canReroll) {
      alert("No rerolls available. You get one free reroll per week. More can be obtained from your subscription or the store!");
      return;
    }

    const availableTaskNames = sampleRerollTasksNames.filter(name => !currentGoal.milestones.some(m => m.milestoneName === name));
    const newMilestoneName = availableTaskNames.length > 0
      ? availableTaskNames[Math.floor(Math.random() * availableTaskNames.length)]
      : "Review and Refine an Existing Skill";
    const newGoalDescription = sampleRerollTasksDescriptions[newMilestoneName] || "Revisit a previously learned concept and find new applications or improvements.";


    if (rerollTypeUsed === "free") {
      setCurrentUser(prev => ({ ...prev, usedFreeRerollsThisWeek: prev.usedFreeRerollsThisWeek + 1 }));
      alert(`Used a FREE reroll! New task: "${newMilestoneName}". ${currentUser.freeRerollsWeeklyTotal - (currentUser.usedFreeRerollsThisWeek + 1)} free rerolls left this week.`);
    } else {
      setCurrentUser(prev => ({ ...prev, purchasedRerolls: prev.purchasedRerolls - 1 }));
      alert(`Used a PURCHASED reroll! New task: "${newMilestoneName}". ${currentUser.purchasedRerolls - 1} purchased rerolls left.`);
    }

    setCurrentGoal(prevGoal => ({
      ...prevGoal,
      milestones: prevGoal.milestones.map(m =>
        m.id === milestoneUniqueId ? { ...m, milestoneName: newMilestoneName, goalDescription: newGoalDescription, status: 'unverified', rerollAvailable: false, isCompleted: false, completionDate: null } : m
      )
    }));
  };

  return (
    <div className="dashboard-screen">
      {showOnboarding && <OnboardingModal onComplete={handleOnboardingComplete} />}
      <header className="dashboard-header">
        <div className="dashboard-logo"><Link to="/">ICHU</Link></div>
        <nav className="dashboard-nav">
          <NavLink to="/dashboard" end className={({isActive}) => isActive || activeDashboardTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveDashboardTab('dashboard')}><FaTachometerAlt /> Dashboard</NavLink>
          <NavLink to="/leaderboard" className={({isActive}) => isActive || activeDashboardTab === 'leaderboard' ? 'active' : ''} onClick={() => setActiveDashboardTab('leaderboard')}><FaClipboardList /> Leaderboard</NavLink>
          <NavLink to="/forums" className={({isActive}) => isActive || activeDashboardTab === 'forums' ? 'active' : ''} onClick={() => setActiveDashboardTab('forums')}><FaComments /> Forums</NavLink>
          <NavLink to="/store" className={({isActive}) => isActive || activeDashboardTab === 'store' ? 'active' : ''} onClick={() => setActiveDashboardTab('store')}><FaStore /> Store</NavLink>
        </nav>
        <div className="dashboard-profile-container">
            <div className="dashboard-profile" onClick={() => setShowProfileDropdown(!showProfileDropdown)} >
                <FaUserCircle /> {currentUser.name}
            </div>
            {showProfileDropdown && (
                <div className="profile-dropdown">
                    <Link to={`/profile/${currentUser.username}`} onClick={() => setShowProfileDropdown(false)}>View Profile</Link>
                    <Link to="/account-settings" onClick={() => setShowProfileDropdown(false)}>Account Settings</Link>
                    <button onClick={() => { alert('Logging out...'); setShowProfileDropdown(false); }}>Logout</button>
                </div>
            )}
        </div>
      </header>

      <div className="dashboard-main-content-revised">
        <div className="dashboard-primary-panel">
          <section className="dashboard-goal-focus-section">
            {currentGoal ? (
              <div className={`active-goal-display ${currentGoal.bgColor}`}>
                <div className="active-goal-header">
                  <span className="goal-icon-wrapper-large">{currentGoal.icon}</span>
                  <div>
                    <h2>{currentGoal.title}</h2>
                    <p className="goal-category-large">{currentGoal.category}</p>
                  </div>
                </div>
                <p className="active-goal-description">{currentGoal.description}</p>
                <div className="ai-chat-button-container-goal">
                  <Link 
                    to="/ai-chat" 
                    className="btn-chat-now-goal" // Keep the same class for styling
                  >
                    <FaRobot /> Chat with AI Assistant
                  </Link>
                </div>
                <div className="overall-progress-section">
                  <h4>Overall Progress: {currentGoal.overallProgress}%</h4>
                  <div className="progress-bar-container-large"><div className="progress-bar-large" style={{ width: `${currentGoal.overallProgress}%` }}></div></div>
                </div>
                <h4>Milestones:</h4>
                <ul className="milestones-list">
                  {currentGoal.milestones.map(milestone => {
                    let icon;
                    let interactionTitle;
                    let milestoneActionHandler = () => handleMilestoneInteraction(milestone.id, milestone.milestoneName, milestone.status);
                    let itemClass = `milestone-item status-${milestone.status}`;

                    switch (milestone.status) {
                      case 'verified':
                        icon = <FaTasks style={{ color: 'var(--status-verified-bg, #2ECC71)' }} />;
                        interactionTitle = "Verified by community!";
                        milestoneActionHandler = () => alert(interactionTitle);
                        break;
                      case 'pending':
                        icon = <FaClipboardList style={{ color: 'var(--status-pending-bg, #FFA500)' }} />;
                        interactionTitle = "Pending community verification - Click to view/update post";
                        break;
                      default:
                        icon = <FaSquare />;
                        interactionTitle = "Mark as complete & create verification post";
                        itemClass += ' clickable';
                    }
                    return (
                      <li key={milestone.id} className={itemClass} title={interactionTitle}>
                        <div className="milestone-content-wrapper">
                            <span className="milestone-checkbox" onClick={milestoneActionHandler}>{icon}</span>
                            <div className="milestone-text-details">
                                <span className="milestone-main-text">{milestone.milestoneName}</span>
                                <p className="milestone-sub-text">{milestone.goalDescription}</p>
                            </div>
                        </div>
                        {milestone.status === 'unverified' && milestone.rerollAvailable && (
                          <button className="btn-reroll" onClick={() => handleRerollMilestone(milestone.id)} title="Reroll this milestone">
                            <FaRedo />
                          </button>
                        )}
                      </li>
                    );
                  })}
                </ul>
                {currentUser.partner && (
                  <div className="partner-info-integrated" onClick={() => navigate(`/profile/${currentUser.partner.username}`)} title={`Partner: ${currentUser.partner.name}`}>
                    <FaUserCircle className="partner-avatar-icon" />
                    <span className="partner-name-display">{currentUser.partner.name}</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="no-goal-prompt">
                <FaLightbulb className="no-goal-icon" />
                <h2>No Active Goal Set</h2>
                <p>Ready to start a new challenge? Define a goal or find a partner in the forums to begin!</p>
                <button className="btn-find-partner" onClick={() => navigate('/forums', { state: { defaultTab: 'partner-matching' }})}>
                  Explore Goals & Partners
                </button>
              </div>
            )}
          </section>
        </div>

        <aside className="dashboard-secondary-panel">
          <section className="dashboard-supplementary-info">
            {currentGoal && (
              <div className="info-card weekly-contribution-card">
                <h3>My Goal Contribution</h3>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={currentGoal.weeklyContribution} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                    <XAxis dataKey="name" tick={{ fontSize: 10, fill: 'var(--text-medium)' }} />
                    <YAxis tick={{ fontSize: 10, fill: 'var(--text-medium)' }} />
                    <Tooltip contentStyle={{ backgroundColor: 'var(--dashboard-card-bg-lighter)', border: 'none', borderRadius: '8px' }} itemStyle={{ color: 'var(--text-light)'}} />
                    <Bar dataKey="value" name="Contribution" radius={[5, 5, 0, 0]}>
                      {currentGoal.weeklyContribution.map((entry, index) => (
                        <Cell key={`cell-contrib-${index}`} fill={index === todayIndexContribution ? 'var(--secondary-accent)' : '#555'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
            <div className="info-card weekly-insights-card">
              <h3>Your Rerolls</h3>
               <div style={{textAlign: 'center', marginBottom:'15px'}}>
                  <p>Free this week: {currentUser.freeRerollsWeeklyTotal - currentUser.usedFreeRerollsThisWeek} / {currentUser.freeRerollsWeeklyTotal}</p>
                  <p>Purchased available: {currentUser.purchasedRerolls}</p>
                  {(currentUser.subscriptionTier === 'Elite Plan' || currentUser.subscriptionTier === 'Premium Plan') &&
                    <button onClick={() => navigate('/store')} className="btn-simple-accent" style={{marginTop:'10px', padding:'8px 15px', fontSize:'0.9rem', background: 'var(--primary-accent)', color:'white', border:'none', borderRadius:'5px', cursor:'pointer'}}>
                        <FaGift style={{marginRight:'5px'}}/> Get More Rerolls
                    </button>
                  }
               </div>
            </div>
            <div className="info-card weekly-insights-card">
              <h3>Weekly Insights</h3>
              <div className="user-avatar-large"><FaUserCircle /></div>
              <div className="stats-placeholder">
                <p><strong>Focus Time:</strong> 25 hours logged</p><p><strong>Tasks Completed:</strong> 7 this week</p>
                <p><strong>Community Rank:</strong> Top 15%</p>
              </div>
              <div className="insights-chart">
                <h5>Overall Activity</h5>
                <ResponsiveContainer width="100%" height={150}>
                  <BarChart data={weeklyInsightsData} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
                    <XAxis dataKey="name" tick={{ fontSize: 10, fill: 'var(--text-medium)' }} />
                    <YAxis tick={{ fontSize: 10, fill: 'var(--text-medium)' }}/>
                    <Tooltip contentStyle={{ backgroundColor: 'var(--dashboard-card-bg-lighter)', border: 'none', borderRadius: '8px' }} />
                    <Bar dataKey="value" name="Activity Level" radius={[5, 5, 0, 0]}>
                      {weeklyInsightsData.map((entry, index) => (
                        <Cell key={`cell-insight-${index}`} fill={index === todayIndexInsights ? 'var(--secondary-accent)' : '#555'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default DashboardScreen;