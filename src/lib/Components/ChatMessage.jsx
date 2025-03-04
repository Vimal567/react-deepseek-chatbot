import chatbotIcon from '../assets/chatbotIcon.svg';

const ChatMessage = ({chat}) => {
  return (
    <>
      <div className={`message ${chat.role === 'model' ? 'bot' : 'user'}-message ${chat.isError && 'error'}`}>
      {chat.role === 'model' && <img src={chatbotIcon} alt="close chat" width={30} height={30} />}
        <p className="message-text">{chat.text}</p>
      </div>
    </>
  )
}

export default ChatMessage