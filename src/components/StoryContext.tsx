import React from 'react';
import { BookOpen } from 'lucide-react';

interface StoryContextProps {
  story: string;
}

export function StoryContext({ story }: StoryContextProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <div className="flex items-center space-x-2 mb-2">
        <BookOpen className="w-5 h-5 text-gray-600" />
        <span className="font-semibold text-gray-700">Current Story</span>
      </div>
      <p className="text-gray-600">{story}</p>
    </div>
  );
}