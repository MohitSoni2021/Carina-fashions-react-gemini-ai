import React, { useContext, useState, useRef, useEffect } from 'react'
import { IoSend } from "react-icons/io5";
import MessageLayout from './MessageLayout';
import { ChatBotConversationHistoryContext } from '../../Context/ChatBotConversationHistory';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai'
import ChatbotCompnent from '../Chatbot';
import '../Chatbot Components/Chatbotcss.css'
import { BraketFormatChecker } from '../../_utils/FormatChecker';
import { ThreeDots } from 'react-loader-spinner';






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







const ChatBotOuterCard = ({className, viewToggle}) => {


  let chatAreaRef = useRef(null)
  const [userInput, setUserInput] = useState("")
  const [response, setResponse] = useState("What's your question?")
  let {chatBotHistory, setChatBotHistory, setUserDetails, chatBotLoadingState, setChatBotLoadingState} = useContext(ChatBotConversationHistoryContext)
  


    async function generateConversation() {

      setChatBotLoadingState((prev)=>!prev)


      const chatSession = model.startChat({
        generationConfig,
        history: chatBotHistory,
      });
      

      

      
      const result = await chatSession.sendMessage(userInput);
      setChatBotLoadingState((prev)=>!prev)
      setUserInput("")
      let filterResult = BraketFormatChecker(result.response.text())
      try {
        if(filterResult!=[]){
          setUserDetails({
            name: filterResult[0].name,
            gender: filterResult[1].gender,
          })
        }
      } catch (error) {
        console.log()
      }

      
    }

    useEffect(() => {      
      chatAreaRef.current?.lastElementChild?.scrollIntoView()
    }, [chatBotHistory, generateConversation]);

    useEffect(()=>{
      generateConversation()
    },[])






  return (
    <div className={`min-h-[550px] min-w-96 max-sm:min-w-80 border-2 bg-white border-gray-600 ${className} overflow-hidden ${(viewToggle)?"hidden":""}`}>
        <h1 className='w-full bg-blue-500 text-2xl p-3 text-center font-extrabold text-white '>CaninaFashions.in</h1>
        <div className="response h-[483px] p-2 flex flex-col gap-5 overflow-y-scroll scrollbar-hidden" ref={chatAreaRef}>
            
            {
              chatBotHistory.map((ele, id)=>{
                return(
                  (id>7)?<MessageLayout key={id} userType={ele.role} message={ele.parts[0].text} />:""
                )
              })
            }

            {
              (chatBotLoadingState==true)?
              <div className='w-full flex items-center justify-center'>
                <ThreeDots 
                height={40}
                width={40}
                />
              </div>
              :
              ""
            }
            

        </div>
        <div className="flex border-gray-800 border-t-2 items-center ">
            <input type="text" className='w-full p-1 text-lg outline-none' placeholder='Start Conversations'
              onChange={(e)=>setUserInput(e.target.value)}
              value={userInput}
              onKeyDown={(e)=>{
                if(e.key == "Enter"){
                  generateConversation()  
                  e.preventDefault() 
                }
              }}
            />
            <IoSend className='text-2xl  min-w-10 bg-blue-400 h-full p-2 cursor-pointer'
            onClick={generateConversation}
            />
        </div>
      
    </div>
  )
}

export default ChatBotOuterCard
