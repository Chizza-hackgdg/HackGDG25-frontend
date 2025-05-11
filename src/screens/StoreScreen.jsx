// src/screens/StoreScreen.jsx (New File - Conceptual Outline)
import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaShoppingCart, FaUndo, FaStar, FaUserCircle, FaTachometerAlt, FaClipboardList, FaComments, FaStore } from 'react-icons/fa';
// import './StoreScreen.css'; // Create CSS for styling

const mockCurrentUser = { name: 'Alex Nova', username: 'alexnova', purchasedRerolls: 2 }; // From auth context

const storeItems = [
  { id: 'reroll_pack_5', name: '5 Milestone Rerolls', description: 'Get 5 extra chances to reroll a challenging milestone.', price: '$4.99', icon: <FaUndo/>, type: 'consumable' },
  { id: 'reroll_pack_10', name: '12 Milestone Rerolls', description: 'Stock up with 12 rerolls (includes 2 bonus!).', price: '$9.99', icon: <FaUndo/>, type: 'consumable' },
  { id: 'elite_sub_upgrade', name: 'Upgrade to Elite Plan', description: 'Unlock advanced AI, more rerolls, and priority features.', price: '$10.00/mo (Difference)', icon: <FaStar/>, type: 'subscription' },
];

const StoreScreen = () => {
  const [activeMainTab, setActiveMainTab] = useState('store'); // For main site navigation if using same header

  const handlePurchase = (item) => {
    alert(`Attempting to purchase "${item.name}" for ${item.price}. This would trigger a payment flow.`);
    // 1. Call backend to initiate purchase (e.g., create payment intent with Stripe)
    // 2. Redirect to payment gateway or use their drop-in UI
    // 3. Handle success/failure callback from payment gateway
    // 4. If successful, backend updates user's entitlements (e.g., adds rerolls)
  };

  const screenStyle = { backgroundColor: '#0D0B14', minHeight: '100vh', color: '#E0E0E0', fontFamily: "'Poppins', sans-serif"};
  const headerStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 30px', backgroundColor: 'rgba(10, 8, 15, 0.85)', borderBottom: '1px solid rgba(138, 43, 226, 0.2)'};
  const logoStyle = { fontSize: '1.8rem', fontWeight: 'bold', color: '#DA70D6', textDecoration: 'none' };
  const navContainerStyle = { display: 'flex', gap: '20px'};
  const navLinkStyle = (isActive) => ({ color: isActive ? 'white' : '#A0A0A0', backgroundColor: isActive? '#8A2BE2' : 'transparent', textDecoration: 'none', padding: '8px 15px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '8px' });
  const profileStyle = { display: 'flex', alignItems: 'center', gap: '10px', color: '#E0E0E0'};
  const mainContentStyle = { padding: '30px', maxWidth: '1200px', margin: '0 auto'};
  const titleStyle = { fontSize: '2.2rem', color: '#DA70D6', marginBottom: '30px', textAlign: 'center' };
  const itemsGridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' };
  const itemCardStyle = { backgroundColor: '#1A1529', padding: '25px', borderRadius: '12px', boxShadow: '0 5px 15px rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'};
  const itemIconStyle = { fontSize: '2.5rem', color: '#8A2BE2', marginBottom: '15px', textAlign:'center' };
  const itemNameStyle = { fontSize: '1.3rem', color: '#E0E0E0', marginBottom: '10px', fontWeight:'600'};
  const itemDescStyle = { fontSize: '0.9rem', color: '#A0A0A0', marginBottom: '15px', flexGrow: 1 };
  const itemPriceStyle = { fontSize: '1.1rem', color: '#DA70D6', fontWeight: 'bold', marginBottom: '20px' };
  const purchaseBtnStyle = { padding: '10px 20px', backgroundColor: '#8A2BE2', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '1rem', fontWeight: '600', width:'100%' };


  return (
    <div style={screenStyle} className="store-screen">
      <header style={headerStyle} className="store-header">
        <Link to="/" style={logoStyle}>ICHU</Link>
        <nav style={navContainerStyle} className="store-nav">
          <NavLink to="/dashboard" style={navLinkStyle(activeMainTab === 'dashboard')} onClick={() => setActiveMainTab('dashboard')}><FaTachometerAlt /> Dashboard</NavLink>
          <NavLink to="/leaderboard" style={navLinkStyle(activeMainTab === 'leaderboard')} onClick={() => setActiveMainTab('leaderboard')}><FaClipboardList /> Leaderboard</NavLink>
          <NavLink to="/forums" style={navLinkStyle(activeMainTab === 'forums')} onClick={() => setActiveMainTab('forums')}><FaComments /> Forums</NavLink>
          <NavLink to="/store" style={navLinkStyle(activeMainTab === 'store')} onClick={() => setActiveMainTab('store')}><FaStore /> Store</NavLink>
        </nav>
        <div style={profileStyle} className="store-profile">
          <FaUserCircle /> {mockCurrentUser.name}
        </div>
      </header>

      <main style={mainContentStyle} className="store-main-content">
        <h1 style={titleStyle}><FaShoppingCart style={{marginRight: '15px'}} />ICHU Store</h1>
        <div style={itemsGridStyle} className="store-items-grid">
          {storeItems.map(item => (
            <div key={item.id} style={itemCardStyle} className="store-item-card">
              <div>
                <div style={itemIconStyle}>{item.icon}</div>
                <h3 style={itemNameStyle}>{item.name}</h3>
                <p style={itemDescStyle}>{item.description}</p>
              </div>
              <div>
                <p style={itemPriceStyle}>{item.price}</p>
                <button style={purchaseBtnStyle} onClick={() => handlePurchase(item)}>
                  {item.type === 'subscription' ? 'Upgrade Plan' : 'Purchase'}
                </button>
              </div>
            </div>
          ))}
        </div>
         <div style={{textAlign:'center', marginTop:'30px', color:'var(--text-medium)'}}>
            Your current purchased rerolls: {mockCurrentUser.purchasedRerolls}
        </div>
      </main>
    </div>
  );
};

export default StoreScreen;