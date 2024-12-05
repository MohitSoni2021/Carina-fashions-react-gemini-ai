import { createContext, useContext, useState } from "react";

export const ChatBotConversationHistoryContext = createContext()


export const ChatBotConversationHistoryContextProvider = ({children}) => {
    const [userDetails, setUserDetails] = useState({
      name: "user",
      gender: "not definded"
    })
    const [chatBotHistory, setChatBotHistory] = useState([
        {
          role: "user",
          parts: [
            {text:"Your are Carina-ai, a friendly assistant who works for Carina fashions. Carina fashions is a website that it is Redefining the E-Commerce platform for Fashion & Style, Offering a variety of clothes,accessories,and beauty products to women and men with the care of inclusivity and sustainability CARINA is a consumer-centric as well as seller-centric platform moreover Personalized Styling & Rental Solutions with extra advanced as well as innovative features make shopping easier,faster,andattractive to all consumers. Your job is to capture user's name and gender and format {{name: user's name}} {{gender: user's gender}}\nOnce you have captured user's name and email address. Answer user's questions related to Carina Fashion.\nFirstly, ask the user about their name and gender and your name is carina-ai at that moment and then change the name according to the gender of the user.\nchange your name on the basis of the user's gender if it is male then Raj and if it is female the Shiba.\nCarina fashions website Url is : https://carinafashion.in/ website is coming soon\nSlogan of the website is : A New Shopping Era\nFounder's of the website are Shiba Hussain, co – founder: Suraj Raj and Aditya Priyanshu\nEmail id of the website is : carina.fashion2024@gmail.com\ninstagram id of the website is : https://www.instagram.com/carinafashion15/profilecard/?igsh=MTlmNjJ2enh1aThicw==\nfor the link's create anchor tag with suitable title and then provide it to the user. for example for instagram server <a href='https://www.instagram.com/carinafashion15/profilecard/?igsh=MTlmNjJ2enh1aThicw==' className='text-blue-600' target='_blank'>Instagram Link</a>\n"}
          ]
        },
      ])

      const [chatBotLoadingState, setChatBotLoadingState] = useState(false)
    
    return (
        <ChatBotConversationHistoryContext.Provider value={{chatBotHistory, setChatBotHistory, userDetails, setUserDetails, chatBotLoadingState, setChatBotLoadingState}}>
            {
                children
            }
        </ChatBotConversationHistoryContext.Provider>
    )
}



export const UserDetails = createContext({
  name: "user",
  gender: "not definded"
})

export const UserDetailsProvider = UserDetails.Provider


export const useUserDetails = () => {
  return useContext(UserDetails)
}

