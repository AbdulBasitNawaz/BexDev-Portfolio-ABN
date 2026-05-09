import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import "./ChatBot.css";
import { KNOWLEDGE_BASE, FOLLOW_UP_MAP, INITIAL_ACTIONS, KEYWORD_INTENTS, SUB_KEYWORD_INTENTS } from "./chatData";

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
    const [suggestedActions, setSuggestedActions] = useState(INITIAL_ACTIONS);
    const [showScrollBtn, setShowScrollBtn] = useState(false);
    
    const chatRef = useRef(null);
    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null);

    const scrollToBottom = (smooth = true) => {
        messagesEndRef.current?.scrollIntoView({ behavior: smooth ? "smooth" : "auto" });
    };

    const handleScroll = () => {
        if (!messagesContainerRef.current) return;
        const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
        // Show button if we are more than 100px away from bottom
        setShowScrollBtn(scrollHeight - scrollTop - clientHeight > 100);
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
            // Scroll to bottom on open
            setTimeout(() => scrollToBottom(false), 100);
        }
    }, [isOpen]);

    const processMessage = async (text) => {
        if (!text.trim() || isTyping) return;

        const userMessage = { role: "user", parts: [{ text: text }] };
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);

        // Simulate a small "thinking" delay for a premium feel
        setTimeout(async () => {
            let responseText = "";
            let matchedKey = null;
            const lowerInput = text.toLowerCase().trim();
            
            // 1. Check for Exact Match (Highest Priority)
            if (KNOWLEDGE_BASE[text]) {
                responseText = KNOWLEDGE_BASE[text];
                matchedKey = text;
            } 
            
            // 2. Check Top-Level Intents
            if (!matchedKey) {
                for (const intent of KEYWORD_INTENTS) {
                    if (intent.keywords.some(kw => lowerInput.includes(kw))) {
                        matchedKey = intent.responseKey;
                        responseText = KNOWLEDGE_BASE[matchedKey];
                        break;
                    }
                }
            }

            // 3. Check Sub-Level Intents
            if (!matchedKey) {
                for (const intent of SUB_KEYWORD_INTENTS) {
                    if (intent.keywords.some(kw => lowerInput.includes(kw))) {
                        matchedKey = intent.responseKey;
                        responseText = KNOWLEDGE_BASE[matchedKey];
                        break;
                    }
                }
            }

            // 4. Final Knowledge Base Scan (Deep Scan)
            if (!matchedKey) {
                for (const [key, value] of Object.entries(KNOWLEDGE_BASE)) {
                    if (key.toLowerCase().includes(lowerInput) || value.toLowerCase().includes(lowerInput)) {
                        responseText = value;
                        matchedKey = key;
                        break;
                    }
                }
            }

            // 5. Fallback
            if (!responseText) {
                responseText = "I’m here to help you navigate Abdul Basit’s professional background. While I didn't quite catch that, you might find what you're looking for in his Project Showcase, Technical Expertise, or Contact sections below.";
            }

            setMessages(prev => [...prev, { role: "model", parts: [{ text: responseText }] }]);
            setIsTyping(false);
            
            // Contextual Follow-up Logic
            if (matchedKey && FOLLOW_UP_MAP[matchedKey]) {
                setSuggestedActions(FOLLOW_UP_MAP[matchedKey]);
            } else {
                setSuggestedActions(INITIAL_ACTIONS);
            }
        }, 600);
    };

    const resetChat = () => {
        const initialMessage = [{ role: "model", parts: [{ text: "Hello! I'm your AI assistant. How can I help you today?" }] }];
        setMessages(initialMessage);
        setSuggestedActions(INITIAL_ACTIONS);
        sessionStorage.setItem("chat_history", JSON.stringify(initialMessage));
    };

    const handleSend = (e) => {
        e.preventDefault();
        processMessage(input);
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
                        <div className="header-actions">
                            <button className="reset-btn" onClick={resetChat} title="New Chat">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 4V9H9M20 20V15H15M20 9C18.5 5 15 2 12 2C7.5 2 4 5.5 4 10M4 14C5.5 19 9 22 12 22C16.5 22 20 18.5 20 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                            <button className="close-btn" onClick={() => setIsOpen(false)}>
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div 
                        className="chatbot-messages" 
                        ref={messagesContainerRef}
                        onScroll={handleScroll}
                    >
                        {messages.map((m, i) => (
                            <div key={i} className={`message ${m.role}`}>
                                <div className="message-content">
                                    {m.parts[0].text}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="message model">
                                <div className="message-content typing">
                                    <div className="typing-indicator">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                        )}
                        {suggestedActions.length > 0 && !isTyping && (
                            <div className="suggested-actions">
                                {suggestedActions.map((action, i) => (
                                    <button 
                                        key={i} 
                                        onClick={() => processMessage(action)}
                                        className="action-chip"
                                    >
                                        {action}
                                    </button>
                                ))}
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {showScrollBtn && (
                        <button className="scroll-bottom-btn" onClick={() => scrollToBottom()}>
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 13L12 18L17 13M7 6L12 11L17 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    )}

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
