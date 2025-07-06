import React, { useState, useEffect, useRef } from "react";

const AVATARS = {
  user: "https://ui-avatars.com/api/?name=User&background=1DCD9F&color=fff",
  bot: "https://ui-avatars.com/api/?name=Bot&background=333&color=fff"
};

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Initialize session on component mount
  useEffect(() => {
    const initializeSession = async () => {
      try {
        const newSessionId = Date.now().toString();
        setSessionId(newSessionId);
        
        // Call ping endpoint to initialize session
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/ping`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ session_id: newSessionId }),
        });
      } catch (error) {
        console.error("Error initializing session:", error);
      }
    };

    initializeSession();
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading || !sessionId) return;
    setIsLoading(true);

    let userMessage = { sender: "user", text: input };
    let botMessage = { sender: "bot", text: "" };
    setMessages((prev) => [...prev, userMessage, botMessage]);
    
    const currentInput = input;
    setInput("");

    try {
      // Use POST method as per your backend
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/chat/stream`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            session_id: sessionId,
            question: currentInput,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // SSE streaming for text
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.substring(6).trim();
            
            // Skip [DONE] signal
            if (data === '[DONE]') {
              continue;
            }
            
            if (data && data !== '') {
              setMessages((prev) => {
                const updated = [...prev];
                const lastIndex = updated.length - 1;
                if (updated[lastIndex] && updated[lastIndex].sender === 'bot') {
                  updated[lastIndex] = {
                    ...updated[lastIndex],
                    text: updated[lastIndex].text + data
                  };
                }
                return updated;
              });
            }
          }
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => {
        const updated = [...prev];
        const lastIndex = updated.length - 1;
        if (updated[lastIndex] && updated[lastIndex].sender === 'bot') {
          updated[lastIndex] = { 
            ...updated[lastIndex], 
            text: "Sorry, there was an error processing your request." 
          };
        }
        return updated;
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#151925] text-white flex flex-col items-center px-4 py-28">
      {/* Header */}
      <div className="w-full max-w-4xl mb-6 py-20">
        <h1 className="text-4xl font-bold text-center text-[#1DCD9F] mb-2">
          Ask Me Anything 🤖
        </h1>
        <p className="text-center text-gray-400 text-lg">
          Chat with AI and get instant responses
        </p>
      </div>

      {/* Chat Container */}
      <div className="w-full max-w-4xl flex flex-col bg-[#1a1f2e] rounded-2xl shadow-2xl border border-[#2a3441] overflow-hidden">
        {/* Messages Area */}
        <div className="flex-1 h-[600px] overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-[#1a1f2e] to-[#151925]">
          {messages.length === 0 && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-gray-400">
                <div className="text-6xl mb-4">💬</div>
                <p className="text-xl">Start a conversation!</p>
                <p className="text-sm mt-2">Ask me anything and I'll help you out.</p>
              </div>
            </div>
          )}
          
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${
                msg.sender === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              {/* Avatar */}
              <img
                src={msg.sender === "user" ? AVATARS.user : AVATARS.bot}
                alt={msg.sender}
                className="w-10 h-10 rounded-full shadow-lg border-2 border-[#1DCD9F] flex-shrink-0"
              />
              
              {/* Message Content */}
              <div
                className={`max-w-[75%] px-5 py-3 rounded-2xl shadow-lg relative ${
                  msg.sender === "user"
                    ? "bg-gradient-to-br from-[#1DCD9F] to-[#16a178] text-black font-medium"
                    : "bg-gradient-to-br from-[#2a3441] to-[#1e2936] text-white border border-[#3a4651]"
                }`}
              >
                {/* Message tail */}
                <div
                  className={`absolute top-3 w-0 h-0 ${
                    msg.sender === "user"
                      ? "right-[-8px] border-l-[8px] border-l-[#1DCD9F] border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent"
                      : "left-[-8px] border-r-[8px] border-r-[#2a3441] border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent"
                  }`}
                />
                
                <div className="text-sm leading-relaxed whitespace-pre-wrap">
                  {msg.text || (msg.sender === "bot" && isLoading && idx === messages.length - 1 ? (
                    <div className="flex items-center gap-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-[#1DCD9F] rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-[#1DCD9F] rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-[#1DCD9F] rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                      <span className="text-gray-400">Thinking...</span>
                    </div>
                  ) : msg.text)}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-6 bg-[#1e2936] border-t border-[#2a3441]">
          <div className="flex items-center gap-3">
            <input
              type="text"
              className="flex-1 bg-[#2a3441] text-white border border-[#3a4651] rounded-xl px-4 py-3 focus:outline-none focus:border-[#1DCD9F] focus:ring-2 focus:ring-[#1DCD9F]/20 transition-all placeholder-gray-400"
              placeholder="Type your message here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              disabled={isLoading || !sessionId}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim() || !sessionId}
              className="bg-gradient-to-r from-[#1DCD9F] to-[#16a178] text-black font-semibold px-6 py-3 rounded-xl hover:from-[#16a178] hover:to-[#138f64] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  <span>Sending</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                  <span>Send</span>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;