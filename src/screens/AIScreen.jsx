
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/AIScreen.css';
import { FaPaperPlane, FaPlus, FaRobot, FaCheckSquare, FaSquare, FaExternalLinkAlt, FaCodeBranch, FaClipboardList, FaTasks } from 'react-icons/fa';

const mockAIChatActiveGoalData = {
  id: 'goal-ai-chat-active',
  title: 'AI-Assisted Goal: Python Automation Scripts',
  description: 'Develop a series of Python scripts to automate daily tasks, focusing on file system operations and API interactions.',
  milestones: [
    { id: 'aim1', text: 'Script for directory cleanup.', status: 'verified' },
    { id: 'aim2', text: 'Script to fetch weather API data.', status: 'pending' },
    { id: 'aim3', text: 'Script to organize downloaded files based on type.', status: 'unverified' },
    { id: 'aim4', text: 'Combine scripts into a user-friendly CLI tool.', status: 'unverified' },
  ]
};


const AIScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const goalFromState = location.state?.activeGoal;
  const currentActiveGoal = goalFromState || mockAIChatActiveGoalData;

  const [messages, setMessages] = useState([
    { id: 1, text: `Hello! I'm your AI Assistant. We are focusing on your goal: "${currentActiveGoal.title}". How can I help you with its milestones today?`, sender: 'ai', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
  ]);
  const [inputText, setInputText] = useState('');
  const [tasks, setTasks] = useState(currentActiveGoal.milestones.map(m => ({ ...m })));

  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputText.trim() === '') return;
    const newMessage = {
      id: messages.length + 1, text: inputText, sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([...messages, newMessage]);
    setInputText('');

    setTimeout(() => {
      let aiResponseText = `Regarding your query about "${inputText.substring(0, 20)}...", `;
      if (inputText.toLowerCase().includes("milestone") || inputText.toLowerCase().includes(tasks[0]?.text.toLowerCase().split(" ")[0])) {
          aiResponseText += `For the milestone "${tasks[0]?.text}", perhaps we can break it into smaller sub-tasks? Or I can help you find resources.`;
      } else {
          aiResponseText += `I can help with planning, give suggestions, or find information related to "${currentActiveGoal.title}".`;
      }
      const aiResponse = {
        id: messages.length + 2, text: aiResponseText, sender: 'ai',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prevMessages => [...prevMessages, aiResponse]);
    }, 1200);
  };

  const handleTaskInteractionInAIChat = (taskId, taskText, currentStatus) => {
    if (currentStatus === 'verified') {
      alert(`Milestone "${taskText}" is already verified!`);
      return;
    }
    if (currentStatus === 'pending') {
      alert(`Milestone "${taskText}" is pending verification. You can check its status or update the forum post.`);
      return;
    }
    
    setTasks(currentTasks =>
        currentTasks.map(t => t.id === taskId ? { ...t, status: 'pending' } : t)
    );

    const postTitle = `AI-Assisted Milestone Verification: ${taskText}`;
    const postContent = `With the help of the AI Assistant, I've completed the milestone: "${taskText}" for my goal "${currentActiveGoal.title}".\n\nKey steps taken:\n1. ...\n2. ...\n\nPlease review and verify!`;
    navigate(`/forums/new?category=milestone-verification&title=${encodeURIComponent(postTitle)}&content=${encodeURIComponent(postContent)}&milestoneId=${taskId}&source=aiChat`);
  };

  return (
    <div className="ai-chat-screen">
      <header className="ai-chat-header">
        <Link to="/dashboard" className="ai-chat-logo">ICHU</Link>
        {currentActiveGoal && (
          <div className="current-goal-chat-header">
            <span>AI Assistant for: </span><strong>{currentActiveGoal.title}</strong>
          </div>
        )}
      </header>

      <div className="ai-chat-main-layout">
        <div className="chat-interface-column">
          <div className="chat-messages-area">
            {messages.map((msg) => (
              <div key={msg.id} className={`chat-message ${msg.sender}`}>
                <div className="message-bubble">
                  <p className="message-text">{msg.text}</p>
                  <span className="message-time">{msg.time}</span>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <form className="chat-input-area" onSubmit={handleSendMessage}>
            <button type="button" className="attach-btn" title="Attach file (mock feature)"><FaPlus /></button>
            <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Ask about your goal or tasks..." />
            <button type="submit" className="send-btn"><FaPaperPlane /> Send</button>
          </form>
        </div>

        <div className="personal-tasks-column">
          <div className="tasks-header"><h3>Goal Milestones</h3></div>
          {tasks.length > 0 ? (
            <div className="tasks-list">
              {tasks.map((task) => {
                let icon;
                let titleMessage;
                let taskItemClass = `task-item status-${task.status}`;
                switch (task.status) {
                  case 'verified':
                    icon = <FaTasks style={{ color: 'var(--status-verified-bg, #2ECC71)' }} />;
                    titleMessage = "Verified!";
                    break;
                  case 'pending':
                    icon = <FaClipboardList style={{ color: 'var(--status-pending-bg, #FFA500)' }} />;
                    titleMessage = "Pending Verification - Click to view post";
                    break;
                  default:
                    icon = <FaSquare />;
                    titleMessage = "Mark as complete & post for verification";
                    taskItemClass += ' clickable';
                }
                return(
                  <div key={task.id} className={taskItemClass} onClick={() => handleTaskInteractionInAIChat(task.id, task.text, task.status)} title={titleMessage}>
                    <div className="task-main">
                      <span className="task-checkbox">{icon}</span>
                      <span className="task-text">{task.text}</span>
                      {task.status === 'unverified' && (<FaExternalLinkAlt className="task-action-icon"/> )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="no-tasks-message">No milestones for this goal yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIScreen;