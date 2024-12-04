import React from 'react';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  type: 'user' | 'bot';
  content: string;
}

export function ChatMessage({ type, content }: ChatMessageProps) {
  return (
    <div className={`flex ${type === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex space-x-2 max-w-[80%] ${type === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          type === 'user' ? 'bg-indigo-600' : 'bg-gray-600'
        }`}>
          {type === 'user' ? (
            <User className="w-5 h-5 text-white" />
          ) : (
            <Bot className="w-5 h-5 text-white" />
          )}
        </div>
        <div className={`rounded-lg px-4 py-2 ${
          type === 'user' 
            ? 'bg-indigo-600 text-white' 
            : 'bg-gray-100 text-gray-800'
        }`}>
          {content}
        </div>
      </div>
    </div>
  );
}