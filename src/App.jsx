import React, { useContext, useEffect, useRef } from 'react'
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai'
import { useState } from 'react';
import { IoSend } from 'react-icons/io5';
import ChatbotCompnent from './Components/Chatbot';
import { ChatBotConversationHistoryContext } from './Context/ChatBotConversationHistory';





const genAI = new GoogleGenerativeAI('AIzaSyBka8vNow5KUCY4h0kz_PaY_NEm4ekBVi4');
  
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 2,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};


const App = () => {

  let chatAreaRef = useRef(null)
  const [userInput, setUserInput] = useState("")
  const [response, setResponse] = useState("What's your question?")
  const {chatBotHistory, setChatBotHistory} = useContext(ChatBotConversationHistoryContext)
  


    async function generateConversation() {
      const chatSession = model.startChat({
        generationConfig,
        history: chatBotHistory,
      });
      
      const result = await chatSession.sendMessage(userInput);
      console.log(result.response.text());
      setResponse(result.response.text())
      console.log(await chatSession.getHistory())
    }

    useEffect(() => {      
      chatAreaRef.current?.lastElementChild?.scrollIntoView()
    }, [chatBotHistory]);

    useEffect(()=>{
      generateConversation()
    },[])


    

    


  return (
    <div>

      {/* <div className='flex flex-col justify-center items-center py-3 h-screen gap-4'>
      
        <div className={`container w-10/12 bg-gray-800 h-full overflow-y-scroll p-3 rounded-lg remove-scrollbar-view scroll-smooth text-white`} ref={chatAreaRef}>
        {
          response
        }
        </div>
        

        <div className=' container w-10/12 bg-gray-800  text-white py-2 px-5 items-center flex gap-2 rounded-lg text-xl '>
          <input 
          type="text" 
          name="" 
          id="" 
          className='w-full p-2  bg-transparent outline-none' value={userInput} onChange={(e)=>setUserInput(e.target.value)}
          placeholder='Enter your Query ...'
          onKeyDown={(e)=>{
            if(e.key == "Enter"){
              generateConversation()
              e.preventDefault()  // prevents form submission when enter is pressed
            }
          }}
          />
          <button className="" onClick={generateConversation}><IoSend /></button>
        </div> */}
        <ChatbotCompnent />

        
        
      {/* </div> */}
      
    </div>
  )
}

export default App
