import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faRobot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Markdown from 'markdown-to-jsx'
import React, { useContext } from 'react'
import { ChatBotConversationHistoryContext } from '../../Context/ChatBotConversationHistory'
// import { ThreeDots } from 'react-loader-spinner'
// import Markdown from 'react-markdown'

const MessageLayout = ({userType, message}) => {
  let {userDetails} = useContext(ChatBotConversationHistoryContext)
  return (
    <>
    <div className={` h-10  ${(userType=="user")?"rounded-br-none ml-auto" : "rounded-bl-none"} max-w-[340px] h-fit text-wrap flex gap-2 flex-col`}>
    {
    (userType=="user")?
    <div className='flex gap-2 items-center'><FontAwesomeIcon className='w-fit' icon={faUser} />{userDetails.name}</div>
    :
    <div className='flex gap-2 items-center'><FontAwesomeIcon className='w-fit' icon={faRobot} />
      {
      (userDetails.gender=="not definded")?
      "Carina-Ai"
      :
        (userDetails.gender=="male")?
        "Raj":
        "Shiba"
      }
    </div>
    }
      {/* <ThreeDots 
        visible={true}
        height="40"
        width="40"
      /> */}
      <Markdown className='bg-orange-100 rounded-xl p-2'>{message}</Markdown>
    </div>
    </>
  )
}

export default MessageLayout
