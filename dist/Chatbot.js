"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("./Chatbot.css");
var _ChatForm = _interopRequireDefault(require("./Components/ChatForm"));
var _react = require("react");
var _ChatMessage = _interopRequireDefault(require("./Components/ChatMessage"));
var _xMark = _interopRequireDefault(require("./assets/xMark.svg"));
var _messageIcon = _interopRequireDefault(require("./assets/messageIcon.svg"));
var _angleDown = _interopRequireDefault(require("./assets/angleDown.svg"));
var _chatbotIcon = _interopRequireDefault(require("./assets/chatbotIcon.svg"));
var _chatbotIconViolet = _interopRequireDefault(require("./assets/chatbotIcon-violet.svg"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const App = _ref => {
  let {
    apiKey
  } = _ref;
  const [chatHistory, setChatHistory] = (0, _react.useState)([]);
  const [showChatbot, setShowChatbot] = (0, _react.useState)(false);
  const chatBodyRef = (0, _react.useRef)();
  const generateBotResponse = async history => {
    const updateChats = function (resText) {
      let isError = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      setChatHistory(chats => [...chats.filter(msg => msg.text !== "Thinking..."), {
        role: "model",
        text: resText,
        isError
      }]);
    };

    // Parse the payload for DeepSeek API
    const messages = history.map(_ref2 => {
      let {
        role,
        text
      } = _ref2;
      return {
        role,
        content: text
      };
    });
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
  };
  (0, _react.useEffect)(() => {
    //Show latest messages by scrolling down
    chatBodyRef.current.scrollTo({
      top: chatBodyRef.current.scrollHeight,
      behaviour: "smooth"
    });
  }, [chatHistory]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: `container ${showChatbot && 'show-chatbot'}`,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("button", {
      id: "chatbot-toggler",
      onClick: () => setShowChatbot(toggle => !toggle),
      children: [!showChatbot && /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
        src: _messageIcon.default,
        alt: "open chat",
        width: 30,
        height: 30
      }), showChatbot && /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
        src: _xMark.default,
        alt: "close chat",
        width: 30,
        height: 30
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "chatbot-popup",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "chat-header",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "header-info",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
            src: _chatbotIconViolet.default,
            alt: "close chat",
            width: 50,
            height: 50
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("h2", {
            className: "logo-text",
            children: "Chatbot"
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
          onClick: () => setShowChatbot(toggle => !toggle),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
            src: _angleDown.default,
            alt: "close chat",
            width: 45,
            height: 45
          })
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        ref: chatBodyRef,
        className: "chat-body",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "message bot-message",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
            src: _chatbotIcon.default,
            alt: "close chat",
            width: 30,
            height: 30
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
            className: "message-text",
            children: ["Hey there ", /*#__PURE__*/(0, _jsxRuntime.jsx)("br", {}), " How can I help you today?"]
          })]
        }), chatHistory.map((chat, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_ChatMessage.default, {
          chat: chat
        }, index))]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "chat-footer",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ChatForm.default, {
          chatHistory: chatHistory,
          setChatHistory: setChatHistory,
          generateBotResponse: generateBotResponse
        })
      })]
    })]
  });
};
var _default = exports.default = App;