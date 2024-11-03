import React, { useState, useEffect, useRef } from "react";
import Papa from "papaparse";
import Fuse from "fuse.js";

const AssistantChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: "assistant", content: "Hello! I'm here to help you find resources. Let's get started!" }]);
  const [input, setInput] = useState("");
  const [resources, setResources] = useState([]);
  const [fuse, setFuse] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  const [userLocation, setUserLocation] = useState(null);
  const [userLanguage, setUserLanguage] = useState(null);
  const [userServiceType, setUserServiceType] = useState(null);

  const [conversationStep, setConversationStep] = useState(0); // Tracks the step in the question flow
  const messagesEndRef = useRef(null);

  const toggleChatbox = () => setIsOpen(!isOpen);

  // Smoothly scroll to the latest message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Load and parse the CSV file when the component mounts
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch("/resources.csv");
        const csvText = await response.text();

        // Parse CSV text using PapaParse
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            const parsedData = result.data.map((item) => ({
              ...item,
              // Tokenize the Service Type and Languages fields to allow partial matches
              "Service Type": item["Service Type"]?.split(/,\s*/).map(service => service.trim()) || [],
              "Languages": item["Languages"]?.split(/[-,\s]+/).map(language => language.trim()) || []
            }));

            setResources(parsedData); // Store tokenized data in state

            // Initialize Fuse.js with tighter matching options
            const fuseInstance = new Fuse(parsedData, {
              keys: [
                { name: "Service Type", weight: 0.6 }, // Prioritize Service Type matching
                { name: "Languages", weight: 0.4 },     // Prioritize Language matching
                { name: "City/State/ZIP", weight: 0.3 },
              ],
              threshold: 0.5, // Lower threshold for stricter matches
              distance: 90, // Smaller distance for closer matches
              includeMatches: true,
              tokenize: true,
            });
            setFuse(fuseInstance);
          },
        });
      } catch (error) {
        console.error("Error loading CSV:", error);
      }
    };

    fetchResources();
  }, []);

  const searchResources = () => {
    if (!fuse) return [];
    const query = `${userServiceType || ""} ${userLanguage || ""} ${userLocation || ""}`;
    return fuse.search(query).map(result => result.item);
  };

  const formatRecommendation = (resource) => (
    <div>
      <strong>{resource["Name of Organization"]}</strong>
      <br />
      <p><strong>Summary:</strong> {resource["Summary of Services"]}</p>
      <p><strong>Location:</strong> {resource["City/State/ZIP"]}</p>
      <p><strong>Website:</strong> {resource["Website"] || "N/A"}</p>
      <p><strong>Contact:</strong> {resource["Phone Number"] || "N/A"}</p>
    </div>
  );

  const displayTypingEffect = (text) => {
    setIsTyping(true);
    let index = 0;
    const interval = setInterval(() => {
      setMessages((prevMessages) => {
        const lastMessage = prevMessages[prevMessages.length - 1];
        const updatedContent = lastMessage.content + (text[index] || "");
        return [...prevMessages.slice(0, -1), { ...lastMessage, content: updatedContent }];
      });
      index++;
      if (index >= text.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 25); // Faster typing effect
  };

  const resetConversation = () => {
    setUserLocation(null);
    setUserLanguage(null);
    setUserServiceType(null);
    setConversationStep(0);
  };

  const sendMessage = () => {
    if (!input.trim() || input.length > 500) return;

    const userMessage = { role: "user", content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    let botMessageContent = "";

    switch (conversationStep) {
      case 0:
        botMessageContent = "LLet's start by getting your location. Could you please tell me your city or area?";
        setConversationStep(1);
        break;
      case 1:
        setUserLocation(input);
        botMessageContent = "TThank you! What language(s) are you most comfortable with?";
        setConversationStep(2);
        break;
      case 2:
        setUserLanguage(input);
        botMessageContent = "GGot it! Lastly, what type of services are you looking for?";
        setConversationStep(3);
        break;
      case 3:
        setUserServiceType(input);
        const matches = searchResources();

        if (matches.length > 0) {
          botMessageContent = formatRecommendation(matches[0]);
          resetConversation();
        } else {
          botMessageContent = "II'm sorry, but I couldn't find any resources that match all your criteria. Let's start over. Please provide more specific details.";
          resetConversation();
        }
        break;
      default:
        botMessageContent = "How can I assist you today?";
        resetConversation();
    }

    // Start typing effect with an initial empty message to append letters to
    setMessages((prevMessages) => [...prevMessages, { role: "assistant", content: "" }]);
    if (typeof botMessageContent === "string") {
      displayTypingEffect(botMessageContent);
    } else {
      setMessages((prevMessages) => [...prevMessages.slice(0, -1), { role: "assistant", content: botMessageContent }]);
    }
    setInput("");
  };

  return (
    <div>
      <button onClick={toggleChatbox} style={chatButtonStyle}>
        {isOpen ? <span style={closeButtonStyle}>✖</span> : "Chat with Assistant"}
      </button>
      {isOpen && (
        <div style={chatboxStyle}>
          <div style={messagesStyle}>
            {messages.map((msg, index) => (
              <div key={index} style={msg.role === "user" ? userMessageStyle : assistantMessageStyle}>
                {typeof msg.content === "string" ? msg.content : msg.content}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <textarea
            style={inputStyle}
            value={input}
            onChange={(e) => setInput(e.target.value.slice(0, 500))}
            placeholder="Type your message..."
            disabled={isTyping}
          />
          <button onClick={sendMessage} style={sendButtonStyle} disabled={isTyping}>
            Send
          </button>
        </div>
      )}
    </div>
  );
};

// Styling
const chatButtonStyle = {
  position: "fixed",
  bottom: "30px",
  right: "30px",
  backgroundColor: "#1f7ecb ",
  color: "white",
  padding: "15px 20px", // Increased size
  borderRadius: "25px",
  border: "none",
  cursor: "pointer",
  fontSize: "16px", // Increased font size for better visibility
};

const closeButtonStyle = {
  color: "#f1f1f1",
  fontSize: "20px",
};

const chatboxStyle = {
  position: "fixed",
  bottom: "80px",
  right: "20px",
  width: "300px",
  maxHeight: "400px",
  backgroundColor: "#f1f1f1",
  borderRadius: "10px",
  padding: "10px",
  display: "flex",
  flexDirection: "column",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
};

const messagesStyle = {
  flex: 1,
  overflowY: "auto",
  marginBottom: "10px",
  maxHeight: "300px",
  paddingRight: "5px",
  whiteSpace: "pre-wrap",
};

const userMessageStyle = {
  backgroundColor: "#007bff",
  color: "white",
  padding: "8px",
  borderRadius: "8px",
  marginBottom: "5px",
  alignSelf: "flex-end",
  maxWidth: "80%",
};

const assistantMessageStyle = {
  backgroundColor: "#e0e0e0",
  color: "black",
  padding: "8px",
  borderRadius: "8px",
  marginBottom: "5px",
  alignSelf: "flex-start",
  maxWidth: "80%",
};

const inputStyle = {
  padding: "8px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  resize: "none",
  outline: "none",
};

const sendButtonStyle = {
  backgroundColor: "#1f7ecb",
  color: "white",
  border: "none",
  padding: "8px",
  borderRadius: "8px",
  cursor: "pointer",
  marginTop: "10px",
};

export default AssistantChatbot;
