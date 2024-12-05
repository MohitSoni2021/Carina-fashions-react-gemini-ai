import React, { useEffect, useRef, useState } from 'react'
import { IoSend } from "react-icons/io5";
import { GoogleGenerativeAI } from '@google/generative-ai';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
// import './App.css'
import { Comment } from 'react-loader-spinner';




const AppPreviousModel = () => {

  const [userInput, setUserInput] = useState("")
  const [response, setResponse] = useState("What's your question ?")
  const [chatHistory, setChatHistory] = useState([])
  let chatAreaRef = useRef(null)

  useEffect(() => {      
    chatAreaRef.current?.lastElementChild?.scrollIntoView()
}, [chatHistory]);
  

  const genAI = new GoogleGenerativeAI("AIzaSyBka8vNow5KUCY4h0kz_PaY_NEm4ekBVi4")
  const generationConfig = {
    temperature: 2,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };




  const generateResponse = async () => {
    try {

      // model.startChat({
      //   generationConfig,
      //   history : [
      //     {
      //       role: "user",
      //       parts: [
      //         {text: "Your are Carina-ai, a friendly assistant who works for Carina fashions. Carina fashions is a website that it is Redefining the E-Commerce platform for Fashion & Style, Offering a variety of clothes,accessories,and beauty products to women and men with the care of inclusivity and sustainability CARINA is a consumer-centric as well as seller-centric platform moreover Personalized Styling & Rental Solutions with extra advanced as well as innovative features make shopping easier,faster,andattractive to all consumers. Your job is to capture user's name and gender and format {{name: user's name}} {{gender: user's gender}}\nOnce you have captured user's name and email address. Answer user's questions related to Carina Fashion.\nFirstly, ask the user about their name and gender and your name is carina-ai at that moment and then change the name according to the gender of the user.\nchange your name on the basis of the user's gender if it is male then Ashish and if it is female the Aarti.\nCarina fashions website Url is : https://carinafashion.in/ website is coming soon\nSlogan of the website is : A New Shopping Era\nFounder's of the website are Shiba Hussain, co – founder: Suraj Raj and Aditya Priyanshu\nEmail id of the website is : carina.fashion2024@gmail.com\ninstagram id of the website is : https://www.instagram.com/carinafashion15/profilecard/?igsh=MTlmNjJ2enh1aThicw==\n"},
      //       ],
      //     }
      //   ]
      // })

      setResponse("loading...")
      setChatHistory((prev)=>prev.concat({view : "YOU : ", query : userInput}))
      setUserInput("")
      setChatHistory((prev)=>prev.concat({view:"AI : ", query:'loading...'}))
      
      const model = genAI.getGenerativeModel({model : "gemini-1.5-flash"})
      
      const result = await (await model.generateContent(userInput)).response
      setResponse(result.text())
      setChatHistory((previousArr) => (previousArr.slice(0, -1)))
      setChatHistory((prev)=>prev.concat({view:"AI : ", query:result.text()}))
      console.log(chatHistory)
    } catch (error) {
      setResponse(error.message)
    }

  }



  return (
    <div className='flex flex-col justify-center items-center py-3 h-screen gap-4'>
      <div className={`container w-10/12 bg-gray-800 h-full overflow-y-scroll p-3 rounded-lg remove-scrollbar-view scroll-smooth`} ref={chatAreaRef}>
        {
          chatHistory.map((ele)=>{
            // return(<div key={ele.view+ele.query}>{ele.view}{ele.query}</div>)
            return(
              <div className={`${((chatHistory.at(-1)).query=="loading")?"bg-blue-400":"bg-slate-900"} p-5 rounded-md text-white mt-3 w-fit max-w-80 ${(ele.view=="YOU : ")?" ml-auto":""}`}>
              {
              (ele.query=="loading...")?
                <Comment
                visible={true}
                height="40"
                width="40"
                ariaLabel="comment-loading"
                wrapperStyle={{}}
                wrapperClass="comment-wrapper"
                color="#fff"
                backgroundColor="#F4442E"
                /> 
                :
                <>
                  <b>{ele.view}</b>
                  <pre className='text-wrap text-left overflow-x-scroll remove-scrollbar-view '>
                    <Markdown remarkPlugins={[remarkGfm]} className={"text-wrap"}>
                      {ele.query}
                    </Markdown>
                  </pre>
                </>
              }  

              </div>
            )
          })
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
            generateResponse()
            e.preventDefault()  // prevents form submission when enter is pressed
          }
        }}
        />
        <button className="" onClick={generateResponse}><IoSend /></button>
      </div>

      
      
    </div>
  )
}

export default AppPreviousModel
