import { Chatbot } from "./lib/index";

function App() {
  const apiKey = "YOUR_API_KEY";

  return (
    <>
      <Chatbot apiKey={apiKey} />
    </>
  );
}

export default App;
