"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _arrowUp = _interopRequireDefault(require("../assets/arrowUp.svg"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const ChatForm = _ref => {
  let {
    chatHistory,
    setChatHistory,
    generateBotResponse
  } = _ref;
  const inputRef = (0, _react.useRef)();
  const handleOnSubmit = event => {
    event.preventDefault();
    const message = inputRef.current.value.trim();
    if (!message) return;
    //Clear value of submit
    inputRef.current.value = null;

    //Append the new message to the chat
    setChatHistory(history => [...history, {
      role: "user",
      text: message
    }]);

    //Bot thinking
    setTimeout(() => {
      setChatHistory(history => [...history, {
        role: "model",
        text: "Thinking..."
      }]);
      generateBotResponse([...chatHistory, {
        role: "user",
        text: message
      }]);
    }, 600);
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("form", {
      action: "#",
      className: "chat-form",
      onSubmit: handleOnSubmit,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
        ref: inputRef,
        type: "text",
        placeholder: "Type here..",
        className: "message-input",
        required: true
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        type: "submit",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
          src: _arrowUp.default,
          alt: "submit",
          width: 30,
          height: 30
        })
      })]
    })
  });
};
var _default = exports.default = ChatForm;