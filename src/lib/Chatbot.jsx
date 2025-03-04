import "./Chatbot.css"
import ChatForm from "./Components/ChatForm";
import { useEffect, useRef, useState } from "react";
import ChatMessage from "./Components/ChatMessage";
import xMark from './assets/xMark.svg';
import messageIcon from './assets/messageIcon.svg';
import angleDown from './assets/angleDown.svg';
import chatbotIcon from './assets/chatbotIcon.svg';
import chatbotIconViolet from './assets/chatbotIcon-violet.svg';

const App = ({ apiKey }) => {

  const [chatHistory, setChatHistory] = useState([]);
  const [showChatbot, setShowChatbot] = useState(false);
  const chatBodyRef = useRef();

  const generateBotResponse = async (history) => {
    const updateChats = (resText, isError = false) => {
      setChatHistory(chats => [...chats.filter(msg => msg.text !== "Thinking..."), { role: "model", text: resText, isError }])
    }
  
    // Parse the payload for DeepSeek API
    const messages = history.map(({ role, text }) => ({ role, content: text }));
  
    const requestOptions = {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1:free",
        messages: messages
      })
    };
  
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", requestOptions);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error.message || "Something went wrong");
  
      const deepSeekResponseText = data.choices[0].message.content.trim();
      updateChats(deepSeekResponseText);
    } catch (error) {
      updateChats(error.message, true);
    }
  }  

  useEffect(() => {
    //Show latest messages by scrolling down
    chatBodyRef.current.scrollTo({ top: chatBodyRef.current.scrollHeight, behaviour: "smooth" });
  }, [chatHistory])


  return (
    <div className={`container ${showChatbot && 'show-chatbot'}`}>
      <button id="chatbot-toggler" onClick={() => setShowChatbot(toggle => !toggle)}>
        {!showChatbot && <img src={messageIcon} alt="open chat" width={30} height={30} />}
        {showChatbot && <img src={xMark} alt="close chat" width={30} height={30} />}
      </button>

      <div className="chatbot-popup">
        {/* Chatbot Header */}
        <div className="chat-header">
          <div className="header-info">
            <img src={chatbotIconViolet} alt="close chat" width={50} height={50} />
            <h2 className="logo-text">Chatbot</h2>
          </div>
          <button onClick={() => setShowChatbot(toggle => !toggle)}>
            <img src={angleDown} alt="close chat" width={45} height={45} />
          </button>
        </div>

        {/* Chatbot body */}
        <div ref={chatBodyRef} className="chat-body">
          <div className="message bot-message">
            <img src={chatbotIcon} alt="close chat" width={30} height={30} />
            <p className="message-text">
              Hey there <br /> How can I help you today?
            </p>
          </div>

          {/* Render the chat messages */}
          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
        </div>

        {/* Chatbot footer */}
        <div className="chat-footer">
          <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotResponse={generateBotResponse} />
        </div>
      </div>
    </div>
  )
}

export default App;
