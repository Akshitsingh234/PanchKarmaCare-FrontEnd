import React, { useState, useRef, useEffect } from "react";
import Spline from "@splinetool/react-spline";

const ChatBot = () => {
  const [symptomInput, setSymptomInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!symptomInput.trim()) return;

    setChatHistory((prev) => [...prev, { role: "user", content: symptomInput }]);
    setLoading(true);

    try {
      const response = await fetch("${import.meta.env.VITE_API_URL}/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          symptoms: symptomInput.split(",").map((s) => s.trim()),
        }),
      });

      const data = await response.text();
      setChatHistory((prev) => [...prev, { role: "assistant", content: data }]);
    } catch (error) {
      console.error("❌ Backend error:", error);
      setChatHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "⚠️ Error contacting AI service. Please try again.",
        },
      ]);
    }

    setLoading(false);
    setSymptomInput("");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-100 via-blue-50 to-purple-100 px-4">
      {/* Centered container */}
      <div className="flex flex-col items-center space-y-6 w-full max-w-3xl">
        {/* Spline Robot */}
        <div className="h-64 w-full">
          <Spline scene="https://prod.spline.design/vbqIppeWgZQsGG4B/scene.splinecode" />
        </div>

        {/* ChatBot Card */}
        <div className="w-full bg-white shadow-xl rounded-2xl flex flex-col overflow-hidden flex-1">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white text-center py-4 text-xl font-semibold shadow-md">
            🩺 Symptom Checker ChatBot
          </div>

          {/* Chat Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50">
            {chatHistory.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl max-w-sm shadow ${
                    msg.role === "user"
                      ? "bg-purple-600 text-white rounded-br-none"
                      : "bg-gray-200 text-gray-900 rounded-bl-none"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <p className="text-center text-gray-500 italic">⏳ Thinking...</p>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <form
            onSubmit={handleSubmit}
            className="flex gap-2 border-t border-gray-200 p-4 bg-white"
          >
            <input
              type="text"
              placeholder="Enter symptoms (comma separated)..."
              value={symptomInput}
              onChange={(e) => setSymptomInput(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 focus:ring-2 focus:ring-purple-400 disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
