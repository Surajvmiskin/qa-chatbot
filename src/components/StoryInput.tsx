import React, { useState } from 'react';
import { BookOpen, Plus } from 'lucide-react';
import { StorySuggestions } from './StorySuggestions';

interface StoryInputProps {
  onSubmit: (story: string) => void;
}

export function StoryInput({ onSubmit }: StoryInputProps) {
  const [story, setStory] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (story.trim()) {
      onSubmit(story);
      setStory('');
    }
  };

  const handleSelectStory = (selectedStory: string) => {
    setStory(selectedStory);
  };

  return (
    <div>
      <StorySuggestions onSelectStory={handleSelectStory} />
      <form onSubmit={handleSubmit} className="p-4 bg-gray-50 border-b">
        <div className="flex items-center space-x-2 mb-2">
          <BookOpen className="w-5 h-5 text-gray-600" />
          <span className="font-semibold text-gray-700">Enter a Story</span>
        </div>
        <div className="flex space-x-2">
          <textarea
            value={story}
            onChange={(e) => setStory(e.target.value)}
            placeholder="Enter a story about characters and their actions..."
            className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[100px]"
          />
          <button
            type="submit"
            disabled={!story.trim()}
            className={`${
              !story.trim() ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'
            } text-white px-4 py-2 rounded-lg transition-colors`}
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}