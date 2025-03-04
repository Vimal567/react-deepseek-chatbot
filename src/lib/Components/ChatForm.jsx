import { useRef } from 'react';
import arrowUp from '../assets/arrowUp.svg';

const ChatForm = ({ chatHistory, setChatHistory, generateBotResponse }) => {

  const inputRef = useRef();

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const message = inputRef.current.value.trim();
    if (!message) return;
    //Clear value of submit
    inputRef.current.value = null;

    //Append the new message to the chat
    setChatHistory((history) => [...history, { role: "user", text: message }]);

    //Bot thinking
    setTimeout(() => {
      setChatHistory((history) => [...history, { role: "model", text: "Thinking..." }]);
      generateBotResponse([...chatHistory, { role: "user", text: message }]);
    }, 600);

  }

  return (
    <>
      <form action="#" className="chat-form" onSubmit={handleOnSubmit}>
        <input ref={inputRef} type="text" placeholder="Type here.." className="message-input" required />
        <button type='submit'><img src={arrowUp} alt="submit" width={30} height={30} /></button>
      </form>
    </>
  )
}

export default ChatForm