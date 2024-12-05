import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ChatBotConversationHistoryContextProvider } from './Context/ChatBotConversationHistory.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChatBotConversationHistoryContextProvider>
      <App />
    </ChatBotConversationHistoryContextProvider>
  </StrictMode>,
)
