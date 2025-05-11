
import React, { useState } from 'react';
import { Link, NavLink, useNavigate }
from 'react-router-dom';
import '../styles/LeaderboardScreen.css';
import {
  FaTachometerAlt, FaClipboardList, FaComments, FaUserCircle,
  FaMedal, FaTrophy, FaAward
} from 'react-icons/fa';

const mockUser = {
  name: 'Alex Nova',
};

const leaderboardData = [
  { rank: 1, name: 'ZephyrX', username: 'zephyrx', score: 12580, avatarSeed: 'zephyr', icon: <FaTrophy style={{ color: '#FFD700' }} /> },
  { rank: 2, name: 'NovaSpark', username: 'novaspark', score: 11950, avatarSeed: 'nova', icon: <FaMedal style={{ color: '#C0C0C0' }} /> },
  { rank: 3, name: 'CyberRonin', username: 'cyberronin', score: 11200, avatarSeed: 'ronin', icon: <FaAward style={{ color: '#CD7F32' }} /> },
  { rank: 4, name: 'GlitchMaster', username: 'glitchmaster', score: 10850, avatarSeed: 'glitch' },
  { rank: 5, name: 'PixelPioneer', username: 'pixelpioneer', score: 10500, avatarSeed: 'pixel' },
  { rank: 6, name: 'SynthWaveRider', username: 'synthwaverider', score: 10230, avatarSeed: 'synth' },
  { rank: 7, name: 'DataDynamo', username: 'datadynamo', score: 9980, avatarSeed: 'data' },
  { rank: 8, name: 'LogicLancer', username: 'logiclancer', score: 9700, avatarSeed: 'logic' },
  { rank: 9, name: 'CodeCommander', username: 'codecommander', score: 9450, avatarSeed: 'commander' },
  { rank: 10, name: 'BitBender', username: 'bitbender', score: 9200, avatarSeed: 'bit' },
  { rank: 11, name: 'Alex Nova', username: 'alexnova', score: 9150, avatarSeed: 'alex', isCurrentUser: true },
  { rank: 12, name: 'ScriptSavvy', username: 'scriptsavvy', score: 8900, avatarSeed: 'script' },
];

const UserAvatar = ({ seed, size = 40 }) => {
  const placeholderUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${seed}&radius=50&backgroundColor=8a2be2,da70d6,4286f4&backgroundType=gradientLinear&fontSize=36`;
  return <img src={placeholderUrl} alt={`${seed}'s avatar`} width={size} height={size} style={{ borderRadius: '50%' }} />;
};


const LeaderboardScreen = () => {
  const [activeDashboardTab, setActiveDashboardTab] = useState('leaderboard');
  const navigate = useNavigate();

  const topThree = leaderboardData.slice(0, 3);
  const restOfTheBoard = leaderboardData.slice(3);

  const handleUserClick = (username) => {
    navigate(`/profile/${username}`);
  };

  return (
    <div className="leaderboard-screen">
      <header className="leaderboard-header">
        <div className="leaderboard-logo">
          <Link to="/">ICHU</Link>
        </div>
        <nav className="leaderboard-nav">
          <NavLink to="/dashboard" className={({isActive}) => (isActive && activeDashboardTab === 'dashboard') || activeDashboardTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveDashboardTab('dashboard')}>
            <FaTachometerAlt /> Dashboard
          </NavLink>
          <NavLink to="/leaderboard" end className={({isActive}) => (isActive && activeDashboardTab === 'leaderboard') || activeDashboardTab === 'leaderboard' ? 'active' : ''} onClick={() => setActiveDashboardTab('leaderboard')}>
            <FaClipboardList /> Leaderboard
          </NavLink>
          <NavLink to="/forums" className={({isActive}) => (isActive && activeDashboardTab === 'forums') || activeDashboardTab === 'forums' ? 'active' : ''} onClick={() => setActiveDashboardTab('forums')}>
            <FaComments /> Forums
          </NavLink>
        </nav>
        <div className="leaderboard-profile">
          <FaUserCircle /> {mockUser.name}
        </div>
      </header>

      <main className="leaderboard-main-content">
        <h1 className="leaderboard-title">Leaderboard</h1>

        <section className="leaderboard-pedestal">
          {topThree.map((user, index) => (
            <Link to={`/profile/${user.username}`} key={user.rank} className={`pedestal-user rank-${user.rank} clickable-user-entry`}>
              <div className="pedestal-rank-icon">{user.icon}</div>
              <UserAvatar seed={user.avatarSeed} size={user.rank === 1 ? 100 : 80} />
              <h3 className="pedestal-name">{user.name}</h3>
              <p className="pedestal-score">{user.score.toLocaleString()} PTS</p>
              <div className="pedestal-rank-number">#{user.rank}</div>
            </Link>
          ))}
        </section>

        <section className="leaderboard-list-section">
          <h2>Top Achievers</h2>
          <ul className="leaderboard-list">
            {restOfTheBoard.map((user) => (
              <Link to={`/profile/${user.username}`} key={user.rank} className="leaderboard-item-link clickable-user-entry">
                <li className={`leaderboard-item ${user.isCurrentUser ? 'current-user' : ''}`}>
                  <span className="list-rank">#{user.rank}</span>
                  <div className="list-user-info">
                    <UserAvatar seed={user.avatarSeed} size={40} />
                    <span className="list-name">{user.name} {user.isCurrentUser ? '(You)' : ''}</span>
                  </div>
                  <span className="list-score">{user.score.toLocaleString()} PTS</span>
                </li>
              </Link>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default LeaderboardScreen;