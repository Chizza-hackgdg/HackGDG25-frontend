
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { FaArrowLeft, FaPaperPlane, FaImage, FaLink, FaTimes } from 'react-icons/fa';

const mockCurrentUser = { name: 'Alex Nova', username: 'alexnova' };

const forumCategories = [
  { id: 'milestone-verification', title: 'Milestone Verification' },
  { id: 'general-questions', title: 'General Questions' },
  { id: 'discussions', title: 'Discussions' },
];

const CreateForumPostScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [milestoneId, setMilestoneId] = useState('');
  const [images, setImages] = useState([]);
  const [links, setLinks] = useState([{ url: '' }]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const prefillCategory = queryParams.get('category');
    const prefillTitle = queryParams.get('title');
    const prefillContent = queryParams.get('content');
    const prefillMilestoneId = queryParams.get('milestoneId');

    if (prefillCategory) setCategory(prefillCategory);
    if (prefillTitle) setTitle(prefillTitle);
    if (prefillContent) setContent(prefillContent);
    if (prefillMilestoneId) setMilestoneId(prefillMilestoneId);

  }, [location.search]);

  const handleImageChange = (e) => {
    if (e.target.files) {
      setImages([...images, ...Array.from(e.target.files).slice(0, 3 - images.length)]);
    }
  };
  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleLinkChange = (index, value) => {
    const newLinks = [...links];
    newLinks[index].url = value;
    setLinks(newLinks);
  };
  const addLinkField = () => {
    if (links.length < 3) setLinks([...links, { url: '' }]);
  };
  const removeLinkField = (index) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !category) {
      alert('Please fill in title, content, and select a category.');
      return;
    }
    const newPostData = {
      title,
      content,
      category,
      milestoneId: category === 'milestone-verification' ? milestoneId : undefined,
      authorUsername: mockCurrentUser.username,
      authorName: mockCurrentUser.name,
      date: new Date().toISOString(),
      images: images.map(img => ({ name: img.name, type: img.type })),
      externalLinks: links.filter(link => link.url.trim() !== ''),
    };

    console.log('New Post Data:', newPostData);
    alert('Forum post submitted (mock)! Check console.');
    const tempPostId = `temp_${Date.now()}`;
    navigate(`/forums/post/${tempPostId}`, { state: { newPostData: {...newPostData, id: tempPostId, type: category === 'milestone-verification' ? 'milestone' : (category === 'general-questions' ? 'question' : 'discussion')} } });
  };
  
  const screenStyle = { backgroundColor: '#0D0B14', minHeight: '100vh', color: '#E0E0E0', padding: '20px', fontFamily: "'Poppins', sans-serif" };
  const formContainerStyle = { backgroundColor: '#1A1529', padding: '30px', borderRadius: '12px', maxWidth: '800px', margin: '20px auto' };
  const inputGroupStyle = { marginBottom: '20px' };
  const labelStyle = { display: 'block', marginBottom: '8px', color: '#A0A0A0' };
  const inputStyle = { width: '100%', padding: '12px', backgroundColor: '#251E3A', border: '1px solid #606060', borderRadius: '5px', color: '#E0E0E0', boxSizing: 'border-box' };
  const buttonStyle = { padding: '12px 25px', backgroundColor: '#8A2BE2', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '1rem', display: 'inline-flex', alignItems: 'center', gap: '8px' };
  const smallButtonStyle = {background: 'none', border: 'none', color: '#DA70D6', cursor: 'pointer', marginLeft:'10px'};

  return (
    <div style={screenStyle} className="create-forum-post-screen">
      <header style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', paddingBottom: '15px', borderBottom: '1px solid #251E3A' }}>
        <Link to="/forums" style={{ color: '#DA70D6', textDecoration: 'none', fontSize: '1.1rem', display: 'flex', alignItems: 'center' }}>
          <FaArrowLeft style={{ marginRight: '10px' }} /> Back to Forums
        </Link>
        <h1 style={{ marginLeft: '20px', fontSize: '1.8rem' }}>Create New Forum Post</h1>
      </header>

      <form onSubmit={handleSubmit} style={formContainerStyle}>
        <div style={inputGroupStyle}>
          <label htmlFor="category" style={labelStyle}>Category:</label>
          <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} required style={inputStyle} disabled={!!milestoneId}>
            <option value="">Select a Category</option>
            {forumCategories.map(cat => (
              <option key={cat.id} value={cat.id} disabled={cat.id === 'partner-matching'||cat.id === 'milestone-verification'}>
                {cat.title}
              </option>
            ))}
          </select>
        </div>

        {category === 'milestone-verification' && milestoneId && (
            <div style={{...inputGroupStyle, padding: '10px', backgroundColor: '#201A33', borderRadius: '5px'}}>
                <p style={labelStyle}>Verifying Milestone (ID: {milestoneId})</p>
                <p style={{fontSize: '0.9rem', color: '#A0A0A0'}}>Title (auto-filled): {decodeURIComponent(new URLSearchParams(location.search).get('title') || '')}</p>
            </div>
        )}

        <div style={inputGroupStyle}>
          <label htmlFor="title" style={labelStyle}>Post Title:</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required style={inputStyle} />
        </div>

        <div style={inputGroupStyle}>
          <label htmlFor="content" style={labelStyle}>Content:</label>
          <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} rows="10" required style={{...inputStyle, minHeight: '150px'}} placeholder="Describe your milestone, ask your question, or start your discussion..."></textarea>
        </div>

        {category === 'milestone-verification' && (
          <>
            <div style={inputGroupStyle}>
              <label htmlFor="images" style={labelStyle}><FaImage style={{marginRight:"5px"}}/>Upload Images (Evidence - Max 3):</label>
              <input type="file" id="images" multiple accept="image/*" onChange={handleImageChange} style={{...inputStyle, padding:'8px'}} disabled={images.length >= 3}/>
              <div style={{marginTop:'10px', display: 'flex', gap:'10px', flexWrap:'wrap'}}>
                  {images.map((img, i) => (
                      <div key={i} style={{position:'relative', border:'1px solid #606060', padding:'5px', borderRadius:'5px', display:'inline-flex', alignItems:'center', gap:'5px'}}>
                          <img src={URL.createObjectURL(img)} alt={img.name.substring(0,15)} style={{height:'30px', width:'auto', borderRadius:'3px'}}/>
                          <span style={{fontSize:'0.8rem'}}>{img.name.substring(0,15)}...</span>
                          <button type="button" onClick={() => removeImage(i)} style={{...smallButtonStyle, background:'#333', borderRadius:'50%', width:'18px', height:'18px', display:'flex',alignItems:'center',justifyContent:'center', padding:0}}><FaTimes size={10}/></button>
                      </div>
                  ))}
              </div>
            </div>

            <div style={inputGroupStyle}>
              <label style={labelStyle}><FaLink style={{marginRight:"5px"}}/>Relevant Links (Evidence/Repo - Max 3):</label>
              {links.map((link, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <input type="url" placeholder="https://example.com" value={link.url} onChange={(e) => handleLinkChange(i, e.target.value)} style={{...inputStyle, flexGrow:1, marginRight:'10px'}} />
                  {links.length > 1 && <button type="button" onClick={() => removeLinkField(i)} style={smallButtonStyle}><FaTimes/></button>}
                </div>
              ))}
              {links.length < 3 && <button type="button" onClick={addLinkField} style={{...smallButtonStyle, fontSize:'0.9rem', border: '1px dashed #606060', padding:'5px 10px', borderRadius:'5px'}}>Add Link</button>}
            </div>
          </>
        )}

        <button type="submit" style={buttonStyle}><FaPaperPlane /> Submit Post</button>
      </form>
    </div>
  );
};
export default CreateForumPostScreen;