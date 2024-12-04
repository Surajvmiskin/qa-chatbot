import React from 'react';
import { BookOpen } from 'lucide-react';
import { suggestedStories } from '../data/suggestedStories';

interface StorySuggestionsProps {
  onSelectStory: (story: string) => void;
}

export function StorySuggestions({ onSelectStory }: StorySuggestionsProps) {
  return (
    <div className="p-4 bg-gray-50 border-b">
      <div className="flex items-center space-x-2 mb-3">
        <BookOpen className="w-5 h-5 text-indigo-600" />
        <span className="font-semibold text-gray-800">Example Stories</span>
      </div>
      <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto">
        {suggestedStories.map((item, index) => (
          <button
            key={index}
            onClick={() => onSelectStory(item.story)}
            className="text-left bg-white border border-gray-200 hover:bg-indigo-50 
                     hover:border-indigo-200 text-gray-700 p-3 rounded-lg text-sm 
                     transition-all duration-200 shadow-sm hover:shadow"
          >
            {item.story}
          </button>
        ))}
      </div>
    </div>
  );
}