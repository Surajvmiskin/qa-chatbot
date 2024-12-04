import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Demo() {
  const navigate = useNavigate();

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            See It In Action
          </h2>
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=1600&q=80"
              alt="AI Visualization"
              className="w-full h-64 object-cover"
            />
            <div className="p-8">
              <p className="text-gray-600 mb-6">
                Our chatbot demonstrates sophisticated natural language understanding
                through its training on the bAbI dataset. It can handle complex
                queries, maintain context across conversations, and provide
                accurate, contextual responses.
              </p>
              <div className="flex justify-center">
                <button 
                  onClick={() => navigate('/demo')}
                  className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Try Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}