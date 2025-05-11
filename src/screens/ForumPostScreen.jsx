
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useParams, useNavigate, useLocation } from 'react-router-dom';
import '../styles/ForumPostScreen.css';
import {
  FaTachometerAlt, FaClipboardList, FaComments, FaUserCircle, FaArrowLeft,
  FaThumbsUp, FaPaperPlane, FaUserEdit, FaTrashAlt, FaRobot, FaCheckCircle, FaHourglassHalf, FaImage, FaLink
} from 'react-icons/fa';

const mockCurrentUser = { name: 'Alex Nova', username: 'alexnova' };

const allForumPostsDataStore = [
  { id: 'pm1', categoryId: 'partner-matching', title: 'Weekly Partner Matching - May 12-18, 2025', authorUsername: 'admin', authorName: 'Admin', date: 'May 11, 2025', content: 'Use this thread...', type: 'admin-locked', upvotes: 5, userHasUpvoted: false, images: [], externalLinks: [] },
  { id: 'mv1', categoryId: 'milestone-verification', title: 'Verification Request: Setup Project: React & ASP.NET Core Web API structure.', milestoneId:'m1', associatedGoalTitle: 'Master Full-Stack Web Dev', authorUsername: 'alexnova', authorName: 'Alex Nova', date: 'May 9, 2025', content: 'Completed setup for "Master Full-Stack Web Dev". Repo: [link-to-repo-placeholder]', upvotes: 28, status: 'Pending', type: 'milestone', userHasUpvoted: false, images: [{name: 'setup_screenshot.png', url:'https://via.placeholder.com/300x200/251E3A/E0E0E0?text=Milestone+Evidence+1'}], externalLinks: [{url: 'https://github.com/alexnova/project-repo'}]},
  { id: 'mv2', categoryId: 'milestone-verification', title: 'Milestone: "DB Schema Design" for "AI Chatbot"', milestoneId:'aim2', associatedGoalTitle: 'AI-Assisted Goal: Python Automation Scripts', authorUsername: 'jordanlee', authorName: 'Jordan Lee', date: 'May 10, 2025', content: 'DB schema for AI Chatbot done. Docs: [link-to-docs-placeholder]', upvotes: 15, status: 'Verified', type: 'milestone', userHasUpvoted: true, images: [], externalLinks: [] },
  { id: 'gq1', categoryId: 'general-questions', title: 'Best resources for EF Core?', authorUsername: 'devdude', authorName: 'DevDude', date: 'May 8, 2025', content: 'Looking for EF Core tutorials...', upvotes: 12, type: 'question', userHasUpvoted: false, geminiAnswer: "For EF Core, the official Microsoft Docs are comprehensive. Also, look into Nick Chapsas on YouTube for video tutorials, and Julie Lerman's books/courses for in-depth knowledge.", images: [], externalLinks: [] },
  { id: 'd1', categoryId: 'discussions', title: 'Favorite productivity hacks?', authorUsername: 'codeninja', authorName: 'CodeNinja', date: 'May 6, 2025', content: 'What are your go-to productivity hacks?', upvotes: 35, type: 'discussion', userHasUpvoted: false, images: [], externalLinks: [] },
];

const mockCommentsDataStore = {
  mv1: [ { id: 'c1', postId: 'mv1', authorName: 'TechGuru', authorUsername: 'techguru', date: 'May 9, 2025', text: 'Clean repo! The screenshot looks good.' } ],
  gq1: [ { id: 'c4', postId: 'gq1', authorName: 'DotNetDan', authorUsername: 'dotnetdan', date: 'May 8, 2025', text: 'Official docs + Nick Chapsas.' } ],
};

const UserAvatar = ({ seed, size = 40 }) => {
  const placeholderUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${seed}&radius=50&backgroundColor=8a2be2,da70d6,4286f4&backgroundType=gradientLinear&fontSize=40`;
  return <img src={placeholderUrl} alt={`${seed}'s avatar`} width={size} height={size} style={{ borderRadius: '50%' }} />;
};

const ForumPostScreen = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeMainTab, setActiveMainTab] = useState('forums');
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [geminiAnswerLoading, setGeminiAnswerLoading] = useState(false);

  useEffect(() => {
    let foundPost = allForumPostsDataStore.find(p => p.id === postId);
    
    if (location.state?.newPostData && postId.startsWith('temp_')) {
        foundPost = { 
            ...location.state.newPostData,
            id: postId, 
            authorName: mockCurrentUser.name,
            authorUsername: mockCurrentUser.username,
            date: 'Just Now (Preview)',
            upvotes:0, userHasUpvoted:false,
            status: location.state.newPostData.category === 'milestone-verification' ? 'Pending' : undefined,
            type: location.state.newPostData.category === 'milestone-verification' ? 'milestone' : (location.state.newPostData.category === 'general-questions' ? 'question' : 'discussion')
        };
    }


    if (foundPost) {
      setPost(foundPost);
      setComments(mockCommentsDataStore[foundPost.id] || []);
      if (foundPost.categoryId === 'general-questions' && !foundPost.geminiAnswer && !postId.startsWith('temp_')) {
        setGeminiAnswerLoading(true);
        setTimeout(() => {
          const mockGeminiResponse = "Gemini Suggestion: Considering your question about '" + foundPost.title + "', it's often helpful to break the problem into smaller parts. What specific aspect are you struggling with?";
          setPost(prevPost => ({ ...prevPost, geminiAnswer: mockGeminiResponse }));
          setGeminiAnswerLoading(false);
        }, 1500);
      }
    } else if (!postId.startsWith('temp_')) {
      navigate('/forums', { replace: true });
    }
  }, [postId, navigate, location.state]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() === '' || postId.startsWith('temp_')) return;
    const commentToAdd = {
      id: `c${Date.now()}`, postId: postId, authorName: mockCurrentUser.name, authorUsername: mockCurrentUser.username,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), text: newComment,
    };
    setComments([...comments, commentToAdd]);
    setNewComment('');
  };
  
  const handleUpvotePost = () => {
    if (!post || post.userHasUpvoted || postId.startsWith('temp_')) return;
    setPost(prevPost => ({ ...prevPost, upvotes: (prevPost.upvotes || 0) + 1, userHasUpvoted: true }));
  };
  
  const handleFinalizeNewPost = () => {
      if(postId.startsWith('temp_') && location.state?.newPostData) {
          const finalPost = { ...post, id: `final_${Date.now()}`, date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) };
          allForumPostsDataStore.push(finalPost); 
          const tempIndex = allForumPostsDataStore.findIndex(p => p.id === postId);
          if(tempIndex > -1) allForumPostsDataStore.splice(tempIndex, 1);

          alert("New post submitted (mock)!");
          navigate(`/forums/post/${finalPost.id}`, {replace: true}); 
      }
  };

  const displayPost = post;

  if (!displayPost) return <div style={{padding:'20px', color:'white'}}>Loading post...</div>;
  
  const canComment = !(displayPost.type === 'admin-locked' && displayPost.authorUsername !== mockCurrentUser.username) && !postId.startsWith('temp_');
  const isOwner = displayPost.authorUsername === mockCurrentUser.username && !postId.startsWith('temp_');

  return (
    <div className="forum-post-screen">
      <header className="forum-post-header-nav">
        <div className="forum-post-logo"><Link to="/">ICHU</Link></div>
        <nav className="forum-post-nav">
          <NavLink to="/dashboard" className={({isActive}) => isActive ? 'active' : ''}><FaTachometerAlt /> Dashboard</NavLink>
          <NavLink to="/leaderboard" className={({isActive}) => isActive ? 'active' : ''}><FaClipboardList /> Leaderboard</NavLink>
          <NavLink to="/forums" className={({isActive}) => isActive || activeMainTab === 'forums' ? 'active' : ''}><FaComments /> Forums</NavLink>
        </nav>
        <div className="forum-post-profile"><FaUserCircle /> {mockCurrentUser.name}</div>
      </header>

      <main className="forum-post-main-content">
        <div className="forum-post-breadcrumb">
          <Link to="/forums"><FaArrowLeft /> Back to Forums</Link>
        </div>

        {displayPost && (
            <article className="post-full-content">
            <header className="post-full-header">
                <h1 className="post-full-title">{displayPost.title}</h1>
                <div className="post-full-meta">
                <UserAvatar seed={displayPost.authorUsername} size={50} />
                <div className="meta-text">
                    <span className="post-full-author">{displayPost.authorName}</span>
                    <span className="post-full-date">Posted on {displayPost.date}</span>
                </div>
                {isOwner && (
                    <div className="post-owner-actions">
                        <button className="btn-edit-post" title="Edit Post"><FaUserEdit /></button>
                        <button className="btn-delete-post" title="Delete Post"><FaTrashAlt /></button>
                    </div>
                )}
                </div>
                {displayPost.type === 'milestone' && (
                <div className="milestone-details">
                    <span className={`post-status status-${displayPost.status?.toLowerCase().replace(/\s+/g, '-') || 'pending'}`}>
                        {displayPost.status === 'Verified' ? <FaCheckCircle/> : <FaHourglassHalf/>} {displayPost.status || 'Pending'}
                    </span>
                    {displayPost.associatedGoalTitle && <span className="milestone-goal-link">For Goal: <em>{displayPost.associatedGoalTitle}</em></span>}
                </div>
                )}
            </header>
            <div className="post-full-body" dangerouslySetInnerHTML={{ __html: displayPost.content?.replace(/\n/g, '<br />') || '' }}></div>
            
            {displayPost.images && displayPost.images.length > 0 && (
              <div className="post-attachments-section" style={{ marginTop: '20px' }}>
                <h4 style={{color: '#DA70D6', marginBottom: '10px'}}>Attached Images:</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {displayPost.images.map((image, index) => (
                    <div key={index} className="post-image-item">
                      <a href={image.url || '#'} target="_blank" rel="noopener noreferrer" title={image.name}>
                        <img src={image.url || `https://via.placeholder.com/150x100/1A1529/E0E0E0?text=${encodeURIComponent(image.name.substring(0,20))}`} alt={image.name} style={{ width: '150px', height:'100px', objectFit:'cover', borderRadius: '4px', border: '1px solid #606060' }} />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {displayPost.externalLinks && displayPost.externalLinks.length > 0 && (
              <div className="post-links-section" style={{ marginTop: '20px' }}>
                <h4 style={{color: '#DA70D6', marginBottom: '10px'}}>Relevant Links:</h4>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {displayPost.externalLinks.map((link, index) => (
                    <li key={index} style={{ marginBottom: '8px' }}>
                      <FaLink style={{ marginRight: '8px', color: '#8A2BE2' }} />
                      <a href={link.url} target="_blank" rel="noopener noreferrer" style={{ color: '#A0A0A0', textDecoration: 'underline' }}>
                        {link.url}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="post-actions-bar">
                <button onClick={handleUpvotePost} disabled={displayPost.userHasUpvoted || postId.startsWith('temp_')} className={`upvote-btn-post ${displayPost.userHasUpvoted ? 'upvoted' : ''}`} title={displayPost.userHasUpvoted ? "Already upvoted": "Upvote this post"}>
                    <FaThumbsUp /> {displayPost.upvotes || 0}
                </button>
            </div>
            </article>
        )}
         {postId.startsWith('temp_') && 
            <button onClick={handleFinalizeNewPost} style={{padding:'10px 20px', background:'var(--primary-accent)', color:'white', border:'none', borderRadius:'5px', cursor:'pointer', display:'block', margin:'20px auto'}}>
                Confirm & Submit Post
            </button>
        }

        {displayPost && displayPost.categoryId === 'general-questions' && !postId.startsWith('temp_') && (
          <section className="gemini-answer-section">
            <h3><FaRobot /> AI Suggested Answer</h3>
            {geminiAnswerLoading && <p>Generating AI suggestion...</p>}
            {displayPost.geminiAnswer && !geminiAnswerLoading && <p>{displayPost.geminiAnswer}</p>}
            {!displayPost.geminiAnswer && !geminiAnswerLoading && <p>No AI suggestion available yet.</p>}
          </section>
        )}

        {!postId.startsWith('temp_') && (
            <section className="comments-section">
            <h2 className="comments-title">{comments.length} Comment{comments.length !== 1 ? 's' : ''}</h2>
            {canComment && (
                <form className="comment-form" onSubmit={handleCommentSubmit}>
                <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Write a comment..." rows="4" required></textarea>
                <button type="submit" className="btn-submit-comment"><FaPaperPlane /> Post Comment</button>
                </form>
            )}
            {!canComment && displayPost.type === 'admin-locked' && (
                <p className="comment-restriction-note">Commenting on this thread is restricted.</p>
            )}
            <div className="comments-list">
                {comments.map(comment => (
                <div key={comment.id} className="comment-item">
                    <div className="comment-author-avatar"><UserAvatar seed={comment.authorUsername} size={35} /></div>
                    <div className="comment-content">
                    <div className="comment-header">
                        <span className="comment-author">{comment.authorName}</span>
                        <span className="comment-date">{comment.date}</span>
                    </div>
                    <p className="comment-text">{comment.text}</p>
                    </div>
                </div>
                ))}
            </div>
            </section>
        )}
      </main>
    </div>
  );
};

export default ForumPostScreen;