import React from 'react';
import { Brain, Github } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
      <div className="container mx-auto px-6 py-8">
        <nav className="flex items-center justify-between mb-16">
          <div className="flex items-center space-x-2">
            <Brain className="w-8 h-8" />
            <span className="text-xl font-bold">bAbI Chatbot</span>
          </div>
          <a
            href="https://github.com/Surajvmiskin/bAbI_Chatbot_using_keras"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 hover:text-indigo-200 transition-colors"
          >
            <Github className="w-6 h-6" />
            <span>View on GitHub</span>
          </a>
        </nav>
        
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-6">
            Intelligent Conversational AI
          </h1>
          <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
            A sophisticated chatbot built with Keras, trained on the bAbI dataset
            for natural language understanding and contextual responses.
          </p>
        </div>
      </div>
    </header>
  );
}