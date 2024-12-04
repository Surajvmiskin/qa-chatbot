import React from 'react';
import { MessageSquare } from 'lucide-react';

interface QuestionSuggestionsProps {
  story: string;
  onSelectQuestion: (question: string) => void;
}

export function QuestionSuggestions({ story, onSelectQuestion }: QuestionSuggestionsProps) {
  // Extract entities and generate relevant questions
  const generateQuestions = (story: string): string[] => {
    const questions: string[] = [];
    
    // Extract characters (words starting with capital letters)
    const characters = Array.from(new Set(story.match(/\b[A-Z][a-z]+\b/g) || []));
    
    // Extract locations (preceded by "to", "at", "in", etc.)
    const locationRegex = /(?:to|at|in|from) (?:the )?([a-zA-Z]+)/g;
    const locations = Array.from(new Set(
      Array.from(story.matchAll(locationRegex))
        .map(match => match[1])
        .filter(loc => loc.length > 2) // Filter out short words
    ));
    
    // Extract objects (nouns after "the", "a", "an")
    const objectRegex = /(?:the|a|an) ([a-zA-Z]+)/g;
    const objects = Array.from(new Set(
      Array.from(story.matchAll(objectRegex))
        .map(match => match[1])
        .filter(obj => !locations.includes(obj)) // Exclude locations
    ));

    // Generate location-based questions
    characters.forEach(character => {
      locations.forEach(location => {
        questions.push(`Is ${character} in the ${location}?`);
      });
    });

    // Generate object interaction questions
    characters.forEach(character => {
      objects.forEach(object => {
        questions.push(`Did ${character} take the ${object}?`);
        questions.push(`Does ${character} have the ${object}?`);
      });
    });

    // Generate character interaction questions
    if (characters.length > 1) {
      for (let i = 0; i < characters.length; i++) {
        for (let j = i + 1; j < characters.length; j++) {
          questions.push(`Did ${characters[i]} meet ${characters[j]}?`);
          questions.push(`Is ${characters[i]} with ${characters[j]}?`);
        }
      }
    }

    // Shuffle and limit questions
    return shuffleArray(questions).slice(0, 5);
  };

  // Fisher-Yates shuffle algorithm
  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const suggestions = generateQuestions(story);

  return (
    <div className="p-4 border-t bg-gray-50">
      <div className="flex items-center space-x-2 mb-3">
        <MessageSquare className="w-5 h-5 text-indigo-600" />
        <span className="font-semibold text-gray-800">Suggested Questions</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((question, index) => (
          <button
            key={index}
            onClick={() => onSelectQuestion(question)}
            className="bg-white border border-gray-200 hover:bg-indigo-50 hover:border-indigo-200 
                     text-gray-700 px-4 py-2 rounded-lg text-sm transition-all duration-200
                     shadow-sm hover:shadow"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
}