import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { getChatResponse } from "../../services/aiService";
import "./ChatBot.css";

export const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState(() => {
        const saved = sessionStorage.getItem("chat_history");
        return saved ? JSON.parse(saved) : [
            { role: "model", parts: [{ text: "Hello! I'm your AI assistant. How can I help you today?" }] }
        ];
    });
    const [isTyping, setIsTyping] = useState(false);
    
    const chatRef = useRef(null);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
        sessionStorage.setItem("chat_history", JSON.stringify(messages));
    }, [messages]);

    useEffect(() => {
        if (isOpen) {
            gsap.fromTo(".chatbot-window", 
                { opacity: 0, y: 20, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power3.out" }
            );
        }
    }, [isOpen]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || isTyping) return;

        const userMessage = { role: "user", parts: [{ text: input }] };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput("");
        setIsTyping(true);

        try {
            // Gemini history must start with 'user'. Filter out initial model greeting.
            const historyForGemini = [];
            messages.forEach((m, idx) => {
                if (idx === 0 && m.role === "model") return;
                historyForGemini.push({
                    role: m.role,
                    parts: m.parts
                });
            });

            const aiResponse = await getChatResponse(historyForGemini, input);
            setMessages(prev => [...prev, { role: "model", parts: [{ text: aiResponse }] }]);
        } catch (error) {
            console.error("ChatBot Error Detail:", error);
            setMessages(prev => [...prev, { 
                role: "model", 
                parts: [{ text: "I'm having trouble connecting right now. Please try again in a few moments!" }] 
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="chatbot-container">
            {!isOpen && (
                <button className="chatbot-trigger" onClick={() => setIsOpen(true)}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 13.4876 3.36093 14.891 4 16.1272L3 21L7.8728 20C9.10898 20.6391 10.5124 21 12 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            )}

            {isOpen && (
                <div className="chatbot-window">
                    <div className="chatbot-header">
                        <h3>AI Assistant</h3>
                        <button className="close-btn" onClick={() => setIsOpen(false)}>
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </div>

                    <div className="chatbot-messages">
                        {messages.map((m, i) => (
                            <div key={i} className={`message ${m.role}`}>
                                <div className="message-content">
                                    {m.parts[0].text}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="message model">
                                <div className="typing-indicator">
                                    <span></span><span></span><span></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <form className="chatbot-input" onSubmit={handleSend}>
                        <input 
                            type="text" 
                            placeholder="Ask me anything..." 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button type="submit" disabled={!input.trim() || isTyping}>
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9L22 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};
