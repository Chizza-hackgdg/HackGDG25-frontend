
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaUserCircle, FaArrowLeft, FaStar, FaCode, FaDumbbell, FaBrain } from 'react-icons/fa';

const mockCurrentUser = { name: 'Alex Nova', username: 'alexnova' };

const fetchUserProfile = (username) => {
  const allUsers = [
    {
      rank: 11, name: 'Alex Nova', username: 'alexnova', score: 9150, avatarSeed: 'alex', bio: 'Passionate about self-improvement and technology.',
      completedMilestonesByArea: [
        { area: 'Coding', count: 5, icon: <FaCode />, badgeName: 'Coding Conqueror' },
        { area: 'Fitness', count: 3, icon: <FaDumbbell />, badgeName: 'Fitness Fiend' },
        { area: 'Learning', count: 10, icon: <FaBrain />, badgeName: 'Knowledge Knight' }
      ]
    },
    { rank: 1, name: 'ZephyrX', username: 'zephyrx', score: 12580, avatarSeed: 'zephyr', bio: 'Loves coding challenges and pushing limits.', completedMilestonesByArea: [{ area: 'Coding', count: 12, icon: <FaCode />, badgeName: 'Code God' }] },
    { rank: 2, name: 'NovaSpark', username: 'novaspark', score: 11950, avatarSeed: 'nova', bio: 'Full-stack enthusiast, always learning.', completedMilestonesByArea: [{ area: 'Learning', count: 8, icon: <FaBrain />, badgeName: 'Mind Master' }] },
  ];
  return allUsers.find(user => user.username === username);
};

const UserAvatar = ({ seed, size = 120 }) => {
  const placeholderUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${seed}&radius=50&backgroundColor=8a2be2,da70d6,4286f4&backgroundType=gradientLinear&fontSize=36`;
  return <img src={placeholderUrl} alt={`${seed}'s avatar`} width={size} height={size} style={{ borderRadius: '50%', border: '4px solid var(--secondary-accent, #DA70D6)' }} />;
};

const MilestoneBadge = ({ area, count, icon, badgeName }) => {
  const badgeStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    backgroundColor: 'var(--leaderboard-card-bg-lighter, #251E3A)',
    padding: '8px 12px',
    borderRadius: '20px',
    margin: '5px',
    fontSize: '0.9rem',
    color: 'var(--text-light, #E0E0E0)',
    border: '1px solid var(--primary-accent, #8A2BE2)',
  };
  const iconStyle = { marginRight: '8px', color: 'var(--primary-accent, #8A2BE2)' };

  return (
    <div style={badgeStyle} title={`${badgeName}: ${count} milestones in ${area}`}>
      <span style={iconStyle}>{icon}</span>
      {badgeName} ({count})
    </div>
  );
};

const UserProfileScreen = () => {
  const { username } = useParams();
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const profileData = fetchUserProfile(username);
    setUserProfile(profileData);
    setLoading(false);
  }, [username]);

  const screenStyle = { backgroundColor: '#0D0B14', minHeight: '100vh', color: '#E0E0E0', padding: '30px', fontFamily: "'Poppins', sans-serif" };
  const headerStyle = { display: 'flex', alignItems: 'center', marginBottom: '30px', borderBottom: '1px solid rgba(138, 43, 226, 0.2)', paddingBottom: '15px' };
  const backLinkStyle = { color: '#DA70D6', textDecoration: 'none', fontSize: '1.2rem', display: 'flex', alignItems: 'center', marginRight: '20px' };
  const profileCardStyle = { backgroundColor: '#1A1529', padding: '30px', borderRadius: '12px', maxWidth: '700px', margin: '0 auto', textAlign: 'center', boxShadow: '0 8px 25px rgba(0,0,0,0.3)' };
  const nameStyle = { fontSize: '2rem', color: '#DA70D6', margin: '20px 0 10px 0' };
  const scoreStyle = { fontSize: '1.3rem', color: '#8A2BE2', marginBottom: '15px' };
  const bioStyle = { fontSize: '1rem', color: '#A0A0A0', lineHeight: '1.6', marginBottom: '20px' };
  const badgesSectionStyle = { marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #251E3A' };
  const sectionTitleStyle = { color: '#E0E0E0', marginBottom: '15px', fontSize: '1.2rem' };

  if (loading) {
    return <div style={screenStyle}>Loading profile...</div>;
  }

  if (!userProfile) {
    return (
      <div style={screenStyle}>
        <div style={headerStyle}>
          <Link to="/leaderboard" style={backLinkStyle}><FaArrowLeft style={{ marginRight: '8px' }} /> Back to Leaderboard</Link>
          <h2>User Not Found</h2>
        </div>
        <p>The profile for "{username}" could not be found.</p>
      </div>
    );
  }
  const isCurrentUserProfile = mockCurrentUser.username === username;

  return (
    <div style={screenStyle} className="user-profile-screen">
      <div style={headerStyle}>
        <Link to="/leaderboard" style={backLinkStyle}>
          <FaArrowLeft style={{ marginRight: '8px' }} /> Back to Leaderboard
        </Link>
        <h1>{userProfile.name}'s Profile</h1>
         {isCurrentUserProfile &&
            <Link to="/account-settings" style={{ marginLeft: 'auto', color: '#DA70D6', textDecoration: 'none', fontSize: '0.9rem', border: '1px solid #DA70D6', padding: '5px 10px', borderRadius: '5px' }}>
                Account Settings
            </Link>
          }
      </div>

      <div style={profileCardStyle}>
        <UserAvatar seed={userProfile.avatarSeed} />
        <h2 style={nameStyle}>{userProfile.name}</h2>
        <p style={scoreStyle}>Score: {userProfile.score.toLocaleString()} PTS</p>
        {userProfile.bio && <p style={bioStyle}>"{userProfile.bio}"</p>}

        {userProfile.completedMilestonesByArea && userProfile.completedMilestonesByArea.length > 0 && (
          <div style={badgesSectionStyle}>
            <h3 style={sectionTitleStyle}>Milestone Badges</h3>
            <div>
              {userProfile.completedMilestonesByArea.map(badge => (
                <MilestoneBadge
                  key={badge.area}
                  area={badge.area}
                  count={badge.count}
                  icon={badge.icon || <FaStar />}
                  badgeName={badge.badgeName}
                />
              ))}
            </div>
          </div>
        )}

        <div style={{ marginTop: '30px', borderTop: '1px solid #251E3A', paddingTop: '20px' }}>
          <h3 style={sectionTitleStyle}>Activity / Goals</h3>
          <p style={{ color: '#A0A0A0' }}>More details about {userProfile.name}'s achievements and current goals will be displayed here.</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfileScreen;