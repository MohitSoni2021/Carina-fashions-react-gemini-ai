import React, { useRef, useState } from 'react'
import { TbMessageChatbot } from 'react-icons/tb'
import ChatBotOuterCard from './Chatbot Components/ChatBotOuterCard'

const ChatbotCompnent = () => {
  const [chatBotView, setChatBotView] = useState(true)

  return (
    <div className="absolute bottom-5 right-5">
      <div className='relative '>
        <ChatBotOuterCard className="rounded-md absolute bottom-16 right-10" viewToggle={chatBotView}/>
        <TbMessageChatbot  
          className='text-6xl p-2 bg-green-400  rounded-full cursor-pointer' 
          onClick={()=>{
            setChatBotView((prev)=>!prev)
          }}
        />

        </div>
    </div>
  )
}

export default ChatbotCompnent
