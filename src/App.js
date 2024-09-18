import "./App.css";
import React, { useState  } from "react";
import axios from "axios";
import logo from "./assets/image.png";
import enter from "./assets/hehe.svg";


function App() {
  const [chatHistory, setChatHistory] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");

  async function sendMessage(message) {
    try {
      const options = {
        method: "POST",
        // url: "add your api here where mine i get my free api at rapid api so get some now",
        headers: {
          // "Put your headers here to activate or to have authorization of the api",
        },
        data: {
          messages: [
            {
              role: "user",
              content: message,
            },
          ],
          model: "gpt-4o",
          max_tokens: 100,
          temperature: 0.9,
        },
      };

      const response = await axios.request(options);
      return response.data.choices[0].message.content;
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  }

  const handleSendMessage = async () => {
    if (currentMessage.trim()) {
      try {
        const response = await sendMessage(currentMessage);
        setChatHistory((prevHistory) => [
          ...prevHistory,
          { role: "user", content: currentMessage },
        ]);
        setChatHistory((prevHistory) => [
          ...prevHistory,
          { role: "assistant", content: response },
        ]);
        setCurrentMessage("");
      } catch (error) {
        console.error("Error processing response:", error);
      }
    }
  };

  return (
    <div className="main-container">
      <div className="logo-container">
        <img src={logo} alt="Company Logo" className="logo" />
        <h1 className="charles">CharlsGpt 2.1.0</h1>
      </div>

      <div className="txt-container">
        <span className="letter">C</span>
        <span className="letter">H</span>
        <span className="letter">A</span>
        <span className="letter">T</span>
        <span className="letter">W</span>
        <span className="letter">I</span>
        <span className="letter">T</span>
        <span className="letter">H</span>
        <span className="letter">C</span>
        <span className="letter">H</span>
        <span className="letter">A</span>
        <span className="letter">R</span>
        <span className="letter">L</span>
        <span className="letter">E</span>
        <span className="letter">S</span>
        <span className="letter">B</span>
        <span className="letter">O</span>
        <span className="letter">T</span>
      </div>

      <div className="chat-history">
      {chatHistory.map((message, index) => (
        <div key={index} className={`message-container ${message.role}`}>
          <div className={`message ${message.role}`}>{message.content}</div>
          <span className={`role-indicator ${message.role}`}></span>
        </div>
      ))}
    </div>

      <div className="text-area">
        <textarea
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          className="txtinput"
          placeholder="Type your message here..."
        ></textarea>
        <img
          onClick={handleSendMessage}
          src={enter}
          alt="hehe"
          className="enter"
        />
      </div>
    </div>
  );
}
export default App;

