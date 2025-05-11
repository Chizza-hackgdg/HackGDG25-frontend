
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Outlet, Navigate, Link } from 'react-router-dom';

import Navbar from './Components/Navbar.jsx';
import Footer from './Components/Footer.jsx';
import Hero from './Components/Hero.jsx';
import SkillsSection from './Components/SkillsSection.jsx';
import SubscriptionsSection from './Components/SubscriptionsSection.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import DashboardScreen from './screens/DashboardScreen.jsx';
import AIScreen from './screens/AIScreen.jsx';
import LeaderboardScreen from './screens/LeaderboardScreen.jsx';
import ForumsScreen from './screens/ForumsScreen.jsx';
import ForumPostScreen from './screens/ForumPostScreen.jsx';
import UserProfileScreen from './screens/UserProfileScreen.jsx';
import AccountSettingsScreen from './screens/AccountSettingsScreen.jsx'; 
import CreateForumPostScreen from './screens/CreateForumPostScreen.jsx';
import StoreScreen from './screens/StoreScreen.jsx';


const isAuthenticated = () => {
  return true; 
};

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const MainLayout = () => {
  const location = useLocation();
  const noGlobalNavFooterPaths = [
    '/register', '/login', '/dashboard', '/ai-chat',
    '/leaderboard', '/forums', '/profile', '/account-settings' 
  ];

  const shouldHideGlobalElements = noGlobalNavFooterPaths.some(basePath => {
    return location.pathname === basePath || location.pathname.startsWith(basePath + '/');
  });

  return (
    <div className="site-wrapper">
      {!shouldHideGlobalElements && <Navbar />}
      <main className="site-content">
        <Outlet />
      </main>
      {!shouldHideGlobalElements && <Footer />}
    </div>
  );
};

const HomeScreen = () => {
  return (
    <>
      <Hero />
      <SkillsSection />
      <SubscriptionsSection />
    </>
  );
};

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/login" element={<LoginScreen />} />

          <Route path="/dashboard" element={<ProtectedRoute><DashboardScreen /></ProtectedRoute>} />
          <Route path="/ai-chat" element={<ProtectedRoute><AIScreen /></ProtectedRoute>} />
          <Route path="/leaderboard" element={<ProtectedRoute><LeaderboardScreen /></ProtectedRoute>} />
          <Route path="/forums" element={<ProtectedRoute><ForumsScreen /></ProtectedRoute>} />
          <Route path="/forums/post/:postId" element={<ProtectedRoute><ForumPostScreen /></ProtectedRoute>} />
          <Route path="/forums/new" element={<ProtectedRoute><CreateForumPostScreen /></ProtectedRoute>} /> 
          <Route path="/profile/:username" element={<ProtectedRoute><UserProfileScreen /></ProtectedRoute>} />
          <Route path="/account-settings" element={<ProtectedRoute><AccountSettingsScreen /></ProtectedRoute>} />
          <Route path="/store" element={<ProtectedRoute><StoreScreen /></ProtectedRoute>} />

          <Route element={<MainLayout />}>
            <Route path="/" element={<HomeScreen />} />
          </Route>
          
          <Route
            path="*"
            element={
              <div style={{ textAlign: 'center', padding: '50px', color: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#0D0B14' }}>
                <h2 style={{fontSize: '2.5rem', marginBottom: '20px'}}>404 - Screen Not Found</h2>
                <p style={{fontSize: '1.2rem', marginBottom: '30px'}}>Sorry, the screen you are looking for does not exist.</p>
                <Link to="/" style={{ color: '#DA70D6', textDecoration: 'underline', fontSize: '1.2rem', padding: '10px 20px', border: '1px solid #DA70D6', borderRadius: '5px' }}>Go to Homepage</Link>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;