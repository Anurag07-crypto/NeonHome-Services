import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Cpu } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: 'Welcome to Victor जी. How can I assist you today? ⚡' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    const response = await sendMessageToGemini(userMsg);
    setMessages(prev => [...prev, { role: 'bot', text: response }]);
    setLoading(false);
  };

  return (
    <>
      <motion.button
        className="fixed bottom-6 right-6 z-50 p-4 bg-neon-blue text-black rounded-full shadow-[0_0_20px_rgba(0,240,255,0.6)] hover:scale-110 transition-transform"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ rotate: 15 }}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="fixed bottom-24 right-6 w-80 md:w-96 h-[500px] bg-black border border-neon-blue/40 rounded-xl shadow-[0_0_30px_rgba(0,240,255,0.2)] flex flex-col z-50 overflow-hidden backdrop-blur-xl"
          >
            <div className="p-4 bg-neon-blue/10 border-b border-neon-blue/20 flex items-center justify-between">
              <h3 className="text-neon-blue font-display font-bold flex items-center gap-2">
                <Cpu size={18} /> Victor جی AI
              </h3>
              <span className="w-2 h-2 bg-neon-green rounded-full shadow-[0_0_8px_#0aff0a] animate-pulse"></span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    msg.role === 'user' 
                      ? 'bg-neon-blue/20 text-white border border-neon-blue/30 rounded-br-none' 
                      : 'bg-stone-900 text-gray-300 border border-stone-700 rounded-bl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-stone-900 p-3 rounded-lg border border-stone-700 rounded-bl-none flex gap-1">
                    <span className="w-1.5 h-1.5 bg-neon-blue rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-neon-blue rounded-full animate-bounce delay-100"></span>
                    <span className="w-1.5 h-1.5 bg-neon-blue rounded-full animate-bounce delay-200"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-neon-blue/20 bg-black/50">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about services..."
                  className="flex-1 bg-stone-900 border border-stone-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-neon-blue focus:shadow-[0_0_10px_rgba(0,240,255,0.2)]"
                />
                <button 
                  onClick={handleSend}
                  className="p-2 bg-neon-blue text-black rounded hover:bg-white transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;