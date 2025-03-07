# React DeepSeek Chatbot

This project provides a React component for integrating a chatbot powered by DeepSeek AI.

## Installation

To install the package, run:

### `npm i react-deepseek-chatbot`

## Usage

In your React app, import and use the `Chatbot` component:

```jsx
import React from "react";
import { Chatbot } from "react-deepseek-chatbot/dist/index";

export default function App() {
  const apiKey = "YOUR_API_KEY"; // Replace with your actual API key

  return (
    <div>
      <h1>Import chatbot</h1>
      <Chatbot apiKey={apiKey} />
    </div>
  );
}
```

## API Key Setup

To use the chatbot, you need an API key from DeepSeek AI. You can obtain a free API key from:

[DeepSeek OpenRouter](https://openrouter.ai/deepseek/deepseek-r1:free)

Replace `YOUR_API_KEY` in the example above with your actual key.

## Version Compatibility

Ensure that your project meets the required compatibility:

- React: `>=18.0.0`
- Node.js: `>=14.0.0`

## License

This project is licensed under MIT.