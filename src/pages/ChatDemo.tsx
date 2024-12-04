import React, { useState } from 'react';
import { ArrowLeft, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ChatMessage } from '../components/ChatMessage';
import { StoryContext } from '../components/StoryContext';
import { ModelSelector } from '../components/ModelSelector';
import { StoryInput } from '../components/StoryInput';
import { QuestionSuggestions } from '../components/QuestionSuggestions';
import { getCustomModelPrediction, getHuggingFacePrediction } from '../services/api';
import { API_CONFIG } from '../services/config';

export function ChatDemo() {
  const [messages, setMessages] = useState<Array<{ type: 'user' | 'bot' | 'story', content: string }>>([
    { type: 'bot', content: 'Hello! Please enter a story about characters and their actions. Then you can ask questions about it. Try the hugging face as my custom model api is slow.' }
  ]);
  const [currentStory, setCurrentStory] = useState('');
  const [input, setInput] = useState('');
  const [selectedModel, setSelectedModel] = useState<'custom' | 'huggingface'>('custom');
  const [isLoading, setIsLoading] = useState(false);

  const handleStorySubmit = (story: string) => {
    setCurrentStory(story);
    setMessages([
      ...messages,
      { type: 'story', content: story },
      { type: 'bot', content: 'Great! Now you can ask questions about the story.' }
    ]);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading || !currentStory) return;

    const newMessages = [...messages, { type: 'user', content: input }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      let response;
      
      if (selectedModel === 'custom') {
        response = await getCustomModelPrediction({
          story: currentStory,
          question: input
        });
      } else {
        if (!API_CONFIG.HF_TOKEN) {
          throw new Error('Hugging Face token is not configured');
        }
        response = await getHuggingFacePrediction({
          story: currentStory,
          question: input
        }, API_CONFIG.HF_TOKEN);
      }

      setMessages([
        ...newMessages,
        { 
          type: 'bot', 
          content: `Based on the ${selectedModel} model: ${response.answer}${
            response.confidence 
              ? ` (Confidence: ${(response.confidence * 100).toFixed(1)}%)`
              : ''
          }`
        }
      ]);
    } catch (error) {
      setMessages([
        ...newMessages,
        { 
          type: 'bot', 
          content: error instanceof Error 
            ? `Error: ${error.message}`
            : 'Sorry, I encountered an error while processing your question. Please try again.'
        }
      ]);
    } finally {
      setIsLoading(false);
      setInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white min-h-screen shadow-xl">
        <div className="bg-indigo-600 text-white p-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 hover:text-indigo-200">
              <ArrowLeft className="w-6 h-6" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>

        <ModelSelector 
          selectedModel={selectedModel}
          onModelSelect={setSelectedModel}
        />

        <StoryInput onSubmit={handleStorySubmit} />

        <div className="flex flex-col h-[calc(100vh-400px)]">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              message.type === 'story' ? (
                <StoryContext key={index} story={message.content} />
              ) : (
                <ChatMessage key={index} type={message.type} content={message.content} />
              )
            ))}
          </div>

          {currentStory && (
            <QuestionSuggestions
              story={currentStory}
              onSelectQuestion={(question) => setInput(question)}
            />
          )}

          <div className="border-t p-4">
            <div className="flex space-x-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={currentStory ? "Ask a question about the story..." : "Please enter a story first"}
                className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                disabled={isLoading || !currentStory}
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !currentStory}
                className={`${
                  isLoading || !currentStory ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'
                } text-white px-4 py-2 rounded-lg transition-colors`}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}