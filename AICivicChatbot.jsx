import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  MapPin, 
  CheckCircle2, 
  HelpCircle, 
  PhoneCall, 
  Flame, 
  CornerDownLeft,
  RefreshCw,
  Search,
  ExternalLink
} from 'lucide-react';
import { getChatbotResponse } from '../data/aiModeration';

const QUICK_PROMPTS = [
  'Is there water supply cut in HSR Layout?',
  'Find potholes in Koramangala',
  'How to report illegal garbage dumping?',
  'BESCOM electricity helpline number',
  'Has the Indiranagar power cable issue been solved?'
];

export default function AICivicChatbot({ posts, onSelectLocality, onOpenNewPost }) {
  const [messages, setMessages] = useState([
    {
      id: 'm1',
      sender: 'ai',
      text: `👋 **Namaskara! I am Namma Mitra AI**, your Bengaluru Civic AI Assistant.\n\n` +
        `I help Bengaluru citizens to:\n` +
        `• 🔍 **Search for similar problems** in your ward to avoid duplicate complaints\n` +
        `• ✅ **Check if a reported issue has been solved** by BBMP/BESCOM/BWSSB\n` +
        `• 🏛️ **Identify the right department** & official 24x7 helpline\n` +
        `• 📝 **Guide you to file an escalated complaint**.\n\n` +
        `What locality or issue would you like to check today?`,
      timestamp: 'Just now',
      relatedPosts: []
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (textToSend = null) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    // Add user message
    const userMsg = {
      id: `m-u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now'
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    // Simulate AI thinking and querying posts database
    setTimeout(() => {
      const response = getChatbotResponse(query, posts);
      const aiMsg = {
        id: `m-ai-${Date.now()}`,
        sender: 'ai',
        text: response.reply,
        timestamp: 'Just now',
        relatedPosts: response.relatedPosts || []
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden flex flex-col h-[calc(100vh-140px)] max-w-4xl mx-auto shadow-2xl">
      
      {/* Bot Header */}
      <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-extrabold text-sm sm:text-base text-slate-100">
                Namma Mitra AI <span className="text-amber-400 text-xs font-normal">(ನಮ್ಮ ಮಿತ್ರ)</span>
              </h2>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                Online
              </span>
            </div>
            <p className="text-xs text-slate-400">
              AI Civic Search & Government Grievance Tracker
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setMessages([messages[0]]);
          }}
          className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-xl text-xs flex items-center gap-1"
          title="Reset conversation"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Clear Chat</span>
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.sender === 'user' ? 'items-end' : 'items-start'
            }`}
          >
            <div
              className={`max-w-xl rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-sm ${
                msg.sender === 'user'
                  ? 'bg-amber-500 text-slate-950 font-medium rounded-tr-none'
                  : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none'
              }`}
            >
              <div className="whitespace-pre-line">
                {msg.text}
              </div>

              {/* Matching Civic Issues Embed Cards inside AI message */}
              {msg.relatedPosts && msg.relatedPosts.length > 0 && (
                <div className="mt-3 pt-3 border-t border-slate-800/80 space-y-2">
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                    Matching Grievances in Database:
                  </span>
                  {msg.relatedPosts.slice(0, 3).map((p) => (
                    <div
                      key={p.id}
                      className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-xs flex items-center justify-between gap-2 hover:border-amber-500/40 transition-all cursor-pointer"
                      onClick={() => onSelectLocality(p.localityId)}
                    >
                      <div>
                        <span className="font-semibold text-slate-200 line-clamp-1">{p.title}</span>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                          <span>{p.localityName}</span>
                          <span>•</span>
                          <span className="font-mono text-amber-400 font-bold">#{p.ticketId}</span>
                        </div>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold whitespace-nowrap ${
                        p.status === 'RESOLVED'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}>
                        {p.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <span className="text-[10px] text-slate-500 mt-1 px-1 font-mono">
              {msg.timestamp}
            </span>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 p-3 bg-slate-950 border border-slate-800 rounded-2xl w-36 text-xs text-slate-400">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
            <span>Scanning wards...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Chips */}
      <div className="px-4 py-2 bg-slate-950/60 border-t border-slate-800/60 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <span className="text-[10px] text-slate-500 shrink-0 font-medium">Quick Prompts:</span>
        {QUICK_PROMPTS.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-amber-300 border border-slate-800 rounded-full text-xs whitespace-nowrap transition-all"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <div className="p-3 sm:p-4 bg-slate-950 border-t border-slate-800">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask about potholes, water cuts, or search by area (e.g. Koramangala)..."
            className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isTyping}
            className="p-2.5 sm:px-4 sm:py-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold rounded-2xl flex items-center gap-1.5 transition-all shadow-md shadow-amber-500/20"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline text-xs">Send</span>
          </button>
        </form>
      </div>

    </div>
  );
}
