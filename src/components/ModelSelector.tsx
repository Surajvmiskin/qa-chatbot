import React from 'react';
import { Brain } from 'lucide-react';

interface ModelSelectorProps {
  selectedModel: 'custom' | 'huggingface';
  onModelSelect: (model: 'custom' | 'huggingface') => void;
}

export function ModelSelector({ selectedModel, onModelSelect }: ModelSelectorProps) {
  return (
    <div className="flex space-x-4 p-4 bg-gray-50 border-b">
      <button
        onClick={() => onModelSelect('custom')}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
          selectedModel === 'custom'
            ? 'bg-indigo-600 text-white'
            : 'bg-white text-gray-700 hover:bg-gray-100'
        }`}
      >
        <Brain className="w-5 h-5" />
        <span>Custom Model</span>
      </button>
      <button
        onClick={() => onModelSelect('huggingface')}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
          selectedModel === 'huggingface'
            ? 'bg-indigo-600 text-white'
            : 'bg-white text-gray-700 hover:bg-gray-100'
        }`}
      >
        <Brain className="w-5 h-5" />
        <span>Hugging Face Model</span>
      </button>
    </div>
  );
}