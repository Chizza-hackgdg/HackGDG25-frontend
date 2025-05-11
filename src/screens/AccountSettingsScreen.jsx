
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaSave, FaLock, FaBell, FaUserEdit } from 'react-icons/fa';

const mockUserSettings = {
    displayName: 'Alex Nova',
    username: 'alexnova',
    email: 'alex.nova@example.com',
    bio: 'Passionate about self-improvement and technology.',
    avatarSeed: 'alex',
    emailNotifications: {
        goalUpdates: true,
        forumReplies: true,
        partnerMessages: true,
        weeklySummary: false,
    },
    subscriptionTier: 'Elite Plan',
    freeRerollsThisWeek: 0,
    purchasedRerolls: 2,
};


const AccountSettingsScreen = () => {
    const navigate = useNavigate();
    const [profileSettings, setProfileSettings] = useState(mockUserSettings);
    const [password, setPassword] = useState({ current: '', new: '', confirm: '' });
    const [activeSection, setActiveSection] = useState('profile');

    const handleProfileChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name.startsWith('emailNotifications.')) {
            const key = name.split('.')[1];
            setProfileSettings(prev => ({
                ...prev,
                emailNotifications: { ...prev.emailNotifications, [key]: checked }
            }));
        } else {
            setProfileSettings(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
        }
    };

    const handlePasswordChange = (e) => {
        setPassword({ ...password, [e.target.name]: e.target.value });
    };

    const handleProfileSave = (e) => {
        e.preventDefault();
        alert('Profile settings saved (mock)!');
        console.log("Saving Profile:", profileSettings);
    };

    const handlePasswordSave = (e) => {
        e.preventDefault();
        if (password.new !== password.confirm) {
            alert("New passwords don't match!");
            return;
        }
        if (!password.current || !password.new) {
            alert("Please fill in all password fields.");
            return;
        }
        alert('Password change request sent (mock)! This would typically require current password verification on backend.');
        console.log("Changing password for:", password);
        setPassword({ current: '', new: '', confirm: '' });
    };
    
    const screenStyle = { backgroundColor: '#0D0B14', minHeight: '100vh', color: '#E0E0E0', fontFamily: "'Poppins', sans-serif" };
    const headerStyle = { display: 'flex', alignItems: 'center', padding: '15px 30px', backgroundColor: 'rgba(10, 8, 15, 0.85)', borderBottom: '1px solid rgba(138, 43, 226, 0.2)' };
    const backLinkStyle = { color: '#DA70D6', textDecoration: 'none', fontSize: '1.1rem', display: 'flex', alignItems: 'center', marginRight: '20px' };
    const contentStyle = { display: 'flex', maxWidth: '1200px', margin: '20px auto', gap: '20px', padding: '0 20px'};
    const navStyle = { flex: '0 0 200px', backgroundColor: '#1A1529', padding: '20px', borderRadius: '8px'};
    const navButtonStyle = (isActive) => ({
        display: 'block', width: '100%', padding: '10px 15px', marginBottom: '10px',
        backgroundColor: isActive ? '#8A2BE2' : 'transparent', color: isActive? 'white': '#A0A0A0',
        border: 'none', borderRadius: '5px', textAlign: 'left', cursor: 'pointer', fontSize: '1rem'
    });
    const sectionStyle = { flex: '1', backgroundColor: '#1A1529', padding: '30px', borderRadius: '8px'};
    const inputGroupStyle = { marginBottom: '20px' };
    const labelStyle = { display: 'block', marginBottom: '5px', color: '#A0A0A0', fontSize: '0.9rem' };
    const inputStyle = { width: '100%', padding: '10px', backgroundColor: '#251E3A', border: '1px solid #606060', borderRadius: '5px', color: '#E0E0E0', boxSizing: 'border-box' };
    const buttonStyle = { padding: '10px 20px', backgroundColor: '#8A2BE2', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' };


    return (
        <div style={screenStyle} className="account-settings-screen">
            <header style={headerStyle}>
                <Link to="/dashboard" style={backLinkStyle}><FaArrowLeft /> Dashboard</Link>
                <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Account Settings</h1>
            </header>
            <div style={contentStyle}>
                <nav style={navStyle}>
                    <button style={navButtonStyle(activeSection === 'profile')} onClick={() => setActiveSection('profile')}><FaUserEdit style={{marginRight: '8px'}}/> Profile</button>
                    <button style={navButtonStyle(activeSection === 'password')} onClick={() => setActiveSection('password')}><FaLock style={{marginRight: '8px'}}/> Password</button>
                    <button style={navButtonStyle(activeSection === 'notifications')} onClick={() => setActiveSection('notifications')}><FaBell style={{marginRight: '8px'}}/> Notifications</button>
                </nav>
                <main style={sectionStyle}>
                    {activeSection === 'profile' && (
                        <form onSubmit={handleProfileSave}>
                            <h2 style={{color: '#DA70D6', marginBottom: '20px'}}>Edit Profile</h2>
                            <div style={inputGroupStyle}>
                                <label htmlFor="displayName" style={labelStyle}>Display Name:</label>
                                <input type="text" id="displayName" name="displayName" value={profileSettings.displayName} onChange={handleProfileChange} style={inputStyle} />
                            </div>
                            <div style={inputGroupStyle}>
                                <label htmlFor="username" style={labelStyle}>Username (cannot change):</label>
                                <input type="text" id="username" name="username" value={profileSettings.username} style={{...inputStyle, backgroundColor: '#333'}} readOnly />
                            </div>
                            <div style={inputGroupStyle}>
                                <label htmlFor="email" style={labelStyle}>Email:</label>
                                <input type="email" id="email" name="email" value={profileSettings.email} onChange={handleProfileChange} style={inputStyle} />
                            </div>
                            <div style={inputGroupStyle}>
                                <label htmlFor="bio" style={labelStyle}>Bio:</label>
                                <textarea id="bio" name="bio" value={profileSettings.bio} onChange={handleProfileChange} style={{...inputStyle, minHeight: '80px'}}></textarea>
                            </div>
                            <button type="submit" style={buttonStyle}><FaSave /> Save Profile</button>
                        </form>
                    )}
                    {activeSection === 'password' && (
                         <form onSubmit={handlePasswordSave}>
                            <h2 style={{color: '#DA70D6', marginBottom: '20px'}}>Change Password</h2>
                            <div style={inputGroupStyle}>
                                <label htmlFor="currentPassword" style={labelStyle}>Current Password:</label>
                                <input type="password" id="currentPassword" name="current" value={password.current} onChange={handlePasswordChange} style={inputStyle} />
                            </div>
                            <div style={inputGroupStyle}>
                                <label htmlFor="newPassword" style={labelStyle}>New Password:</label>
                                <input type="password" id="newPassword" name="new" value={password.new} onChange={handlePasswordChange} style={inputStyle} />
                            </div>
                            <div style={inputGroupStyle}>
                                <label htmlFor="confirmPassword" style={labelStyle}>Confirm New Password:</label>
                                <input type="password" id="confirmPassword" name="confirm" value={password.confirm} onChange={handlePasswordChange} style={inputStyle} />
                            </div>
                            <button type="submit" style={buttonStyle}><FaSave/> Change Password</button>
                        </form>
                    )}
                     {activeSection === 'notifications' && (
                        <div>
                            <h2 style={{color: '#DA70D6', marginBottom: '20px'}}>Notification Preferences</h2>
                            {Object.entries(profileSettings.emailNotifications).map(([key, value]) => (
                                <div key={key} style={{marginBottom: '10px'}}>
                                    <label style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
                                        <input type="checkbox" name={`emailNotifications.${key}`} checked={value} onChange={handleProfileChange} style={{marginRight: '10px', accentColor: '#8A2BE2'}} />
                                        Receive email for: {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                    </label>
                                </div>
                            ))}
                             <button onClick={() => alert("Notification settings saved (mock)!")} style={{...buttonStyle, marginTop: '20px'}}><FaSave/> Save Preferences</button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};
export default AccountSettingsScreen;