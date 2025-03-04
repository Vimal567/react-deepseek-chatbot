"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _chatbotIcon = _interopRequireDefault(require("../assets/chatbotIcon.svg"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const ChatMessage = _ref => {
  let {
    chat
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: `message ${chat.role === 'model' ? 'bot' : 'user'}-message ${chat.isError && 'error'}`,
      children: [chat.role === 'model' && /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
        src: _chatbotIcon.default,
        alt: "close chat",
        width: 30,
        height: 30
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
        className: "message-text",
        children: chat.text
      })]
    })
  });
};
var _default = exports.default = ChatMessage;