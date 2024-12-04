import React from 'react';
import { Brain, MessageSquare, Cpu, Database } from 'lucide-react';

const features = [
  {
    icon: <Brain className="w-8 h-8" />,
    title: 'Neural Network Architecture',
    description: 'Built using Keras with a sophisticated neural network architecture optimized for natural language processing.'
  },
  {
    icon: <MessageSquare className="w-8 h-8" />,
    title: 'bAbI Dataset Training',
    description: 'Trained on Facebook\'s bAbI dataset, enabling complex reasoning and contextual understanding.'
  },
  {
    icon: <Cpu className="w-8 h-8" />,
    title: 'Advanced Processing',
    description: 'Implements memory networks for improved context retention and more accurate responses.'
  },
  {
    icon: <Database className="w-8 h-8" />,
    title: 'Scalable Architecture',
    description: 'Designed for extensibility and easy integration with other AI models and datasets.'
  }
];

export function Features() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Technical Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="text-indigo-600 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}