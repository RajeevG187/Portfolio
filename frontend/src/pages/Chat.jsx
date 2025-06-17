import React, { useState, useEffect, useRef } from "react";

const AVATARS = {
  user: "https://ui-avatars.com/api/?name=User&background=1DCD9F&color=fff",
  bot: "https://ui-avatars.com/api/?name=Bot&background=333&color=fff"
};

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if ((!input.trim() && !image) || isLoading) return;
    setIsLoading(true);

    let userMessage = { sender: "user", text: input, image: imagePreview };
    let botMessage = { sender: "bot", text: "" };
    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInput("");
    setImage(null);
    setImagePreview(null);

    let response;
    if (image) {
      // Send image with FormData
      const formData = new FormData();
      formData.append("image", image);
      formData.append("question", input);
      response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/chat/upload-image`,
        {
          method: "POST",
          credentials: "include",
          body: formData
        }
      );
    } else {
      // Use fetch with credentials for SSE
      response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/chat/stream?question=${encodeURIComponent(input)}`,
        {
          method: 'GET',
          credentials: 'include'
        }
      );
    }

    if (image) {
      // Assume backend returns JSON with bot reply
      const data = await response.json();
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { ...updated[updated.length - 1], text: data.reply };
        return updated;
      });
      setIsLoading(false);
      return;
    }

    // SSE streaming for text
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value);
      const lines = chunk.split('\n\n');
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.substring(6);
          setMessages((prev) => {
            const updated = [...prev];
            const lastIndex = updated.length - 1;
            updated[lastIndex].text += data;
            return updated;
          });
        }
      }
    }
    setIsLoading(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen bg-[#151925] text-white flex flex-col items-center px-4 mt-15 pt-20">
      <h1 className="text-3xl font-bold text-[#1DCD9F] mb-4">Ask Me Anything 🤖</h1>
      <div className="w-full max-w-3xl flex flex-col border border-[#1DCD9F] rounded-xl p-4 h-[70vh] overflow-y-auto bg-[#222222] shadow-lg">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`my-2 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.sender === "bot" && (
              <img src={AVATARS.bot} alt="Bot" className="w-8 h-8 rounded-full mr-2 self-end shadow" />
            )}
            <div
              className={`max-w-[70%] px-4 py-2 rounded-2xl shadow-md flex flex-col gap-2 ${
                msg.sender === "user"
                  ? "bg-gradient-to-br from-[#1DCD9F] to-[#16a178] text-black rounded-br-none"
                  : "bg-gradient-to-br from-[#333] to-[#444] text-white rounded-bl-none"
              }`}
            >
              {msg.image && (
                <img
                  src={msg.image}
                  alt="sent"
                  className="max-w-[200px] max-h-[200px] rounded-lg border border-[#1DCD9F] mb-1"
                  style={{ objectFit: "cover" }}
                />
              )}
              <span>{msg.text}</span>
            </div>
            {msg.sender === "user" && (
              <img src={AVATARS.user} alt="User" className="w-8 h-8 rounded-full ml-2 self-end shadow" />
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {/* Input */}
      <div className="w-full max-w-3xl mt-4 flex items-center space-x-2">
        {/* <label className="cursor-pointer flex items-center">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
            disabled={isLoading}
          />
          <span className="bg-[#1DCD9F] hover:bg-[#16a178] text-black px-3 py-2 rounded-lg font-semibold transition flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5V19a2 2 0 002 2h14a2 2 0 002-2v-2.5M16.5 12.5L12 17m0 0l-4.5-4.5M12 17V3" />
            </svg>
            Image
          </span>
        </label>
        {imagePreview && (
          <img src={imagePreview} alt="preview" className="w-10 h-10 rounded-lg border border-[#1DCD9F] object-cover" />
        )} */}
        <input
          type="text"
          className="flex-1 bg-[#333] text-white border border-[#444] rounded-lg px-4 py-2 focus:outline-none focus:border-[#1DCD9F]"
          placeholder="Type your question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          disabled={isLoading}
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
