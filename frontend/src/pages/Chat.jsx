import React, { useState, useEffect, useRef } from "react";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return; // Prevent double send or empty messages

    setIsLoading(true);

    const userMessage = { sender: "user", text: input };
    const botMessage = { sender: "bot", text: "" };
    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInput("");

    const eventSource = new EventSource(
      `${process.env.REACT_APP_BACKEND_URL}/api/chat/stream?question=${encodeURIComponent(input)}`
    );

    eventSource.onmessage = (event) => {
      const data = event.data;

      setMessages((prev) => {
        const updated = [...prev];
        const lastIndex = updated.length - 1;
        updated[lastIndex].text += data;
        return updated;
      });
    };

    eventSource.onerror = () => {
      eventSource.close();
      setIsLoading(false);
    };

    eventSource.onopen = () => {
      setIsLoading(false);
    };
  };

  return (
    <div className="min-h-screen bg-[#151925] text-white flex flex-col items-center px-4 mt-15 pt-20">
      <h1 className="text-3xl font-bold text-[#1DCD9F] mb-4">Ask Me Anything 🤖</h1>

      <div className="w-full max-w-3xl flex flex-col border border-[#1DCD9F] rounded-xl p-4 h-[70vh] overflow-y-auto bg-[#222222]">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`my-2 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] px-4 py-2 rounded-lg ${
                msg.sender === "user"
                  ? "bg-[#1DCD9F] text-black"
                  : "bg-[#333] text-white"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="w-full max-w-3xl mt-4 flex items-center space-x-2">
        <input
          type="text"
          className="flex-1 bg-[#333] text-white border border-[#444] rounded-lg px-4 py-2 focus:outline-none focus:border-[#1DCD9F]"
          placeholder="Type your question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          disabled={isLoading}
          className="bg-[#1DCD9F] text-black font-semibold px-4 py-2 rounded-lg hover:bg-[#16a178] transition"
        >
          {isLoading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default Chat;
