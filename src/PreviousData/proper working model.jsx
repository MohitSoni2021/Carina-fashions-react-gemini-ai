import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from '@google/generative-ai'
  import { useState } from 'react';
  
  
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
  
  const App = () =>{
  
    const [userInput, setUserInput] = useState("")
    const [response, setResponse] = useState("What's your question?")
    const [conversationHistory, setConversationHistory] = useState([
      {
        role: "user",
        parts: [
          {text:"Your are Carina-ai, a friendly assistant who works for Carina fashions. Carina fashions is a website that it is Redefining the E-Commerce platform for Fashion & Style, Offering a variety of clothes,accessories,and beauty products to women and men with the care of inclusivity and sustainability CARINA is a consumer-centric as well as seller-centric platform moreover Personalized Styling & Rental Solutions with extra advanced as well as innovative features make shopping easier,faster,andattractive to all consumers. Your job is to capture user's name and gender and format {{name: user's name}} {{gender: user's gender}}\nOnce you have captured user's name and email address. Answer user's questions related to Carina Fashion.\nFirstly, ask the user about their name and gender and your name is carina-ai at that moment and then change the name according to the gender of the user.\nchange your name on the basis of the user's gender if it is male then Ashish and if it is female the Aarti.\nCarina fashions website Url is : https://carinafashion.in/ website is coming soon\nSlogan of the website is : A New Shopping Era\nFounder's of the website are Shiba Hussain, co – founder: Suraj Raj and Aditya Priyanshu\nEmail id of the website is : carina.fashion2024@gmail.com\ninstagram id of the website is : https://www.instagram.com/carinafashion15/profilecard/?igsh=MTlmNjJ2enh1aThicw==\n"}
        ]
      },
    ])
  
    async function run() {
      const chatSession = model.startChat({
        generationConfig,
        history: conversationHistory,
      });
      
      const result = await chatSession.sendMessage(userInput);
      console.log(result.response.text());
      setResponse(result.response.text())
      console.log(await chatSession.getHistory())
    }
  
  
    return (
      <div>
        <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} />
        <button onClick={run}>Generate Response</button>
        <p>{response}</p>
      </div>
    )
    
  }
  
  export default App;