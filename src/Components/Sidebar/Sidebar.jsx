import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import './Sidebar.css';
import { Context } from '../../Context/Context';

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompt, setRecentPrompt , newChat } = useContext(Context);
  const loadPrompt = async (prompt)  => {
    setRecentPrompt(prompt)
    await  onSent(prompt) 
  }

  return (
    <div className={`sidebar ${extended ? 'expanded' : ''}`}>
      <div className="top">
        <img 
          onClick={() => setExtended(prev => !prev)} 
          className="menu" 
          src={assets.menu_icon} 
          alt="Menu" 
        />
        <div  className="new-chat" onClick={() => newChat()}>
          <img src={assets.plus_icon} alt="Plus Icon" />
          {extended && <p>New Chat</p>}
        </div>
        {extended && prevPrompt.length > 0 && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompt.map((item, index) => (
              <div onClick={()=> loadPrompt(item)}  key={index} className="recent-entry">
                <img src={assets.message_icon} alt="Message Icon" />
                <p>{item.slice(0,18)}...</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bottom">
        <div className="bottom-item">
          <img src={assets.question_icon} alt="Question Icon" />
          {extended && <p>Help</p>}
        </div>
        <div className="bottom-item">
          <img src={assets.history_icon} alt="History Icon" />
          {extended && <p>Activity</p>}
        </div>
        <div className="bottom-item">
          <img src={assets.setting_icon} alt="Settings Icon" />
          {extended && <p>Settings</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
