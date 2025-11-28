import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, X, Sparkles, AlertCircle } from 'lucide-react';
import { getServiceRecommendation } from '../services/geminiService';
import { ChatMessage } from '../types';
import { SERVICES } from '../constants';

interface AIChatProps {
  isOpen: boolean;
  onClose: () => void;
  onAddService: (id: string) => void;
}

export const AIChat: React.FC<AIChatProps> = ({ isOpen, onClose, onAddService }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hi! I'm Sparky ⚡. Describe your electrical issue, and I'll suggest the right fix!" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (!isOpen) return null;

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userText = input;
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setInput('');
    setLoading(true);

    try {
      const responseStr = await getServiceRecommendation(userText);
      const data = JSON.parse(responseStr);
      
      const service = SERVICES.find(s => s.id === data.recommendedServiceId);
      
      let replyText = data.explanation;
      
      setMessages(prev => [...prev, { role: 'model', text: replyText }]);

      // If a service was found, add a special system message with a button
      if (service) {
         setMessages(prev => [...prev, { 
           role: 'model', 
           text: `Recommendation: **${service.name}** - ₹${service.price}`,
           isThinking: false // piggybacking this prop to trigger the special render in the map below is messy but quick for this demo
         }]);
         // We handle the "Add to Cart" UI inside the render loop for simplicity
      }

    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I short-circuited. Try again?" }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  }

  return (
    <div className="fixed bottom-24 right-4 w-96 max-w-[90vw] h-[500px] bg-slate-900 border border-electric-500 rounded-2xl shadow-2xl shadow-electric-500/20 flex flex-col z-50 overflow-hidden">
      {/* Header */}
      <div className="bg-electric-600 p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-yellow-400 p-1.5 rounded-full">
            <Bot size={20} className="text-black" />
          </div>
          <span className="font-bold text-white tracking-wide">Sparky AI</span>
        </div>
        <button onClick={onClose} className="text-white/80 hover:text-white transition">
          <X size={20} />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950">
        {messages.map((m, i) => {
            const isServiceRec = m.text.startsWith("Recommendation:");
            return (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  m.role === 'user' 
                    ? 'bg-electric-600 text-white rounded-tr-none' 
                    : 'bg-slate-800 text-gray-200 border border-slate-700 rounded-tl-none'
                }`}>
                  {isServiceRec ? (
                    <div className="flex flex-col gap-2">
                       <span dangerouslySetInnerHTML={{__html: m.text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')}} />
                       {/* Extract ID logic is weak here, in a real app we'd pass structured data. 
                           For this demo, we rely on the flow that just happened. 
                           However, to make the button work, we need the ID. 
                           Let's parse the message or better yet, store metadata in the message object.
                           Since I cannot change the type easily without breaking XML flow, I'll find the service by name.
                       */}
                       <button 
                         onClick={() => {
                            // Find service based on text match from previous logic
                            // This is a hack for the visual demo
                            const serviceName = m.text.split('**')[1];
                            const svc = SERVICES.find(s => s.name === serviceName);
                            if (svc) {
                                onAddService(svc.id);
                                onClose();
                            }
                         }}
                         className="mt-1 bg-yellow-400 text-black font-bold py-1 px-3 rounded hover:bg-yellow-300 text-xs self-start flex items-center gap-1"
                       >
                         Book Now <Sparkles size={12}/>
                       </button>
                    </div>
                  ) : (
                    m.text
                  )}
                </div>
              </div>
            );
        })}
        {loading && (
            <div className="flex justify-start">
                <div className="bg-slate-800 p-3 rounded-2xl rounded-tl-none flex items-center gap-2">
                    <div className="w-2 h-2 bg-electric-500 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-electric-500 rounded-full animate-bounce delay-75" />
                    <div className="w-2 h-2 bg-electric-500 rounded-full animate-bounce delay-150" />
                </div>
            </div>
        )}
      </div>

      {/* Input */}
      <div className="p-3 bg-slate-900 border-t border-slate-800 flex gap-2">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="E.g. My fan is wobbling..."
          className="flex-1 bg-slate-950 text-white border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-electric-500 text-sm"
        />
        <button 
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="bg-electric-500 hover:bg-electric-400 disabled:opacity-50 text-white p-2.5 rounded-lg transition"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};
