
import React, { useState, useMemo } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import '../styles/ForumsScreen.css';
import {
  FaTachometerAlt, FaClipboardList, FaComments, FaUserCircle, FaUsers, FaTasks,
  FaQuestionCircle, FaPlus, FaSearch, FaBullhorn, FaEye, FaThumbsUp
} from 'react-icons/fa';

const mockCurrentUser = { name: 'Alex Nova', username: 'alexnova'};

const initialForumPostsData = [
  { id: 'pm1', categoryId: 'partner-matching', title: 'Weekly Partner Matching - May 12-18, 2025', author: 'Admin', authorUsername: 'admin', date: 'May 11, 2025', replies: 23, views: 150, type: 'admin-locked', upvotes: 5, userHasUpvoted: false },
  { id: 'mv1', categoryId: 'milestone-verification', title: 'Verification Request: Setup Project: React & ASP.NET Core Web API structure.', milestoneId:'m1', associatedGoalTitle: 'Master Full-Stack Web Dev', author: 'Alex Nova', authorUsername: 'alexnova', date: 'May 9, 2025', status: 'Pending', type: 'milestone', upvotes: 28, userHasUpvoted: false },
  { id: 'mv2', categoryId: 'milestone-verification', title: 'Milestone: "DB Schema Design" for "AI Chatbot"', milestoneId:'aim2', associatedGoalTitle: 'AI-Assisted Goal: Python Automation Scripts', author: 'Jordan Lee', authorUsername: 'jordanlee', date: 'May 10, 2025', status: 'Verified', type: 'milestone', upvotes: 15, userHasUpvoted: true },
  { id: 'gq1', categoryId: 'general-questions', title: 'Best resources for EF Core?', author: 'DevDude', authorUsername: 'devdude', date: 'May 8, 2025', replies: 7, views: 102, type: 'question', upvotes: 12, userHasUpvoted: false, geminiAnswer: "For EF Core, official docs are great." },
  { id: 'd1', categoryId: 'discussions', title: 'Favorite productivity hacks?', author: 'CodeNinja', authorUsername: 'codeninja', date: 'May 6, 2025', replies: 18, views: 210, type: 'discussion', upvotes: 35, userHasUpvoted: false },
];

const forumCategories = [
  { id: 'partner-matching', title: 'Partner Matching', icon: <FaUsers />, description: "Find accountability partners for your goals. Admins post new threads weekly." },
  { id: 'milestone-verification', title: 'Milestone Verification', icon: <FaTasks />, description: "Share completed milestones for community review. Initiated from Dashboard/AI Chat." },
  { id: 'general-questions', title: 'General Questions', icon: <FaQuestionCircle />, description: "Ask the community. AI suggestions may appear for new questions!" },
  { id: 'discussions', title: 'Discussions', icon: <FaBullhorn />, description: "Open discussions on various topics related to personal growth." },
];

const UserAvatar = ({ seed, size = 30 }) => {
  const placeholderUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${seed}&radius=50&backgroundColor=8a2be2,da70d6,4286f4&backgroundType=gradientLinear&fontSize=40`;
  return <img src={placeholderUrl} alt={`${seed}'s avatar`} width={size} height={size} style={{ borderRadius: '50%' }} />;
};

const ForumsScreen = () => {
  const [activeMainTab, setActiveMainTab] = useState('forums');
  const [activeCategoryTab, setActiveCategoryTab] = useState(forumCategories[0].id);
  const [searchTerm, setSearchTerm] = useState('');
  const [forumPosts, setForumPosts] = useState(initialForumPostsData);
  const navigate = useNavigate();

  const filteredPosts = useMemo(() => {
    return forumPosts
      .filter(post => post.categoryId === activeCategoryTab)
      .filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()) || post.author.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [forumPosts, activeCategoryTab, searchTerm]);

  const handleCreatePost = () => {
    const selectedCategory = forumCategories.find(cat => cat.id === activeCategoryTab);
    if (activeCategoryTab === 'partner-matching' || activeCategoryTab === 'milestone-verification') {
        alert(`Posts for "${selectedCategory?.title}" are special: Partner matching is admin-only weekly threads, and milestone verifications are started from your Dashboard/AI chat.`);
        return;
    }
    navigate(`/forums/new?category=${activeCategoryTab}`);
  };
  
  const handleUpvoteListPost = (postId, e) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    setForumPosts(prevPosts =>
      prevPosts.map(p =>
        p.id === postId ? { ...p, upvotes: (p.upvotes || 0) + (p.userHasUpvoted ? -1 : 1) , userHasUpvoted: !p.userHasUpvoted } : p
      )
    );
  };


  return (
    <div className="forums-screen">
      <header className="forums-header">
        <div className="forums-logo"><Link to="/">ICHU</Link></div>
        <nav className="forums-nav">
          <NavLink to="/dashboard" className={({isActive}) => isActive ? 'active' : ''} onClick={() => setActiveMainTab('dashboard')}><FaTachometerAlt /> Dashboard</NavLink>
          <NavLink to="/leaderboard" className={({isActive}) => isActive ? 'active' : ''} onClick={() => setActiveMainTab('leaderboard')}><FaClipboardList /> Leaderboard</NavLink>
          <NavLink to="/forums" end className={({isActive}) => isActive || activeMainTab === 'forums' ? 'active' : ''} onClick={() => setActiveMainTab('forums')}><FaComments /> Forums</NavLink>
        </nav>
        <div className="forums-profile"><FaUserCircle /> {mockCurrentUser.name}</div>
      </header>

      <main className="forums-main-content">
        <div className="forums-content-header">
            <h1 className="forums-title">Community Forums</h1>
            {activeCategoryTab !== 'partner-matching' && activeCategoryTab !== 'milestone-verification' && (
                <button className="btn-create-post" onClick={handleCreatePost}>
                    <FaPlus /> Create New Post
                </button>
            )}
        </div>

        <div className="forum-category-tabs">
          {forumCategories.map(category => (
            <button
              key={category.id}
              className={`category-tab ${activeCategoryTab === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategoryTab(category.id)}
            >
              {category.icon} {category.title}
            </button>
          ))}
        </div>
        
        <div className="forum-category-description">
            <p>{forumCategories.find(cat => cat.id === activeCategoryTab)?.description}</p>
        </div>

        <div className="forum-toolbar">
            <div className="forum-search-bar">
                <FaSearch className="search-icon" />
                <input 
                type="text" 
                placeholder={`Search in ${forumCategories.find(cat => cat.id === activeCategoryTab)?.title || 'posts'}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>

        <div className="posts-list-container">
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <Link key={post.id} to={`/forums/post/${post.id}`} className={`post-item type-${post.type} ${post.userHasUpvoted ? 'upvoted-by-user' : ''}`}>
                <div className="post-item-main">
                  <UserAvatar seed={post.authorUsername || post.author} />
                  <div className="post-item-content">
                      <h3 className="post-title">{post.title}</h3>
                    <p className="post-meta">
                      By <span className="post-author">{post.author}</span> on <span className="post-date">{post.date}</span>
                      {post.type === 'milestone' && <span className={`post-status status-${post.status?.toLowerCase().replace(/\s+/g, '-')}`}>{post.status}</span>}
                    </p>
                  </div>
                </div>
                <div className="post-item-stats">
                  {post.type !== 'milestone' && (
                    <span><FaComments /> {post.replies || 0}</span>
                  )}
                  {post.type !== 'milestone' && (
                    <span><FaEye /> {post.views || 0}</span>
                  )}
                  <button 
                    onClick={(e) => handleUpvoteListPost(post.id, e)} 
                    className={`upvote-button-list ${post.userHasUpvoted ? 'upvoted' : ''}`}
                    title={post.userHasUpvoted ? "You upvoted this" : "Upvote post"}
                  >
                    <FaThumbsUp /> {post.upvotes || 0}
                  </button>
                </div>
              </Link>
            ))
          ) : (
            <p className="no-posts-message">No posts found in this category{searchTerm && ' matching your search'}.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default ForumsScreen;