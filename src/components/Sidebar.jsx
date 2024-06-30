import React, { useContext } from 'react';
import { assets } from "../assets/assets";
import { useState } from 'react';
import { Context } from '../context/Context';

const Sidebar = () => {

  const [extended, setextended] = useState(false);
  const { onSent, previousPrompt, setRecentPrompt, newChat } = useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  }

  return (
    <div className='sidebar px-4 py-4 min-h-screen hidden sm:inline-flex flex-col justify-between bg-zinc-900'>
      <div className="top">
        <img onClick={() => setextended(prev => !prev)} width={24} height={24} src={assets.menu_icon} alt="Menu" className='block ml-3 filter invert-[1] cursor-pointer' />
        <div onClick={()=>newChat()} className='mt-14 hover:shadow-[0px_0px_10px_2px] group transition-all hover:shadow-white cursor-pointer inline-flex items-center gap-3 px-3 py-2 bg-zinc-700 text-gray-400 rounded-full text-sm'>
          <img width={24} height={24} src={assets.plus_icon} alt="Plus" className='' />
          {extended ? <p className='group-hover:text-white'>New Chat</p> : null}
        </div>

        {extended ? (
          <div className="flex flex-col">
            <p className="mt-8 mb-5">Recent</p>
            {previousPrompt.map((item, index) => {
              return (
                <div onClick={()=>{loadPrompt(item)}} key={index} className='sidebar-links-style'>
                  <img width={24} height={24} src={assets.message_icon} alt="Message" className='filter invert-[1] cursor-pointer' />
                  <p>{item.slice(0, 10)}...</p>
                </div>
              );
            })}

          </div>
        ) : null}

      </div>

      <div className="flex flex-col ">
        <div className='sidebar-links-style'>
          <img width={24} height={24} src={assets.question_icon} alt="Question" className='filter invert-[1] cursor-pointer' />
          {extended ? <p>Help</p> : null}
        </div>

        <div className='sidebar-links-style'>
          <img width={24} height={24} src={assets.history_icon} alt="History" className='filter invert-[1] cursor-pointer' />
          {extended ? <p>Activity</p> : null}
        </div>

        <div className='sidebar-links-style'>
          <img width={24} height={24} src={assets.setting_icon} alt="Settings" className='filter invert-[1] cursor-pointer' />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  )
}

export default Sidebar;