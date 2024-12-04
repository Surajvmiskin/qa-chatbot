import React from 'react';

export function TechnicalDetails() {
  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Technical Implementation
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <div>
            <h3 className="text-xl font-semibold mb-4">Architecture</h3>
            <pre className="bg-gray-800 p-4 rounded-lg overflow-x-auto">
              <code className="text-sm text-gray-300">
{`model = Sequential([
    Embedding(vocab_size, 50),
    LSTM(64, return_sequences=True),
    Dropout(0.3),
    LSTM(32),
    Dense(num_classes, activation='softmax')
])`}
              </code>
            </pre>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Key Metrics</h3>
            <ul className="space-y-4">
              <li className="flex items-center justify-between">
                <span>Training Accuracy</span>
                <span className="text-indigo-400">98.5%</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Validation Accuracy</span>
                <span className="text-indigo-400">96.2%</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Response Time</span>
                <span className="text-indigo-400">&lt; 100ms</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Memory Network Layers</span>
                <span className="text-indigo-400">3</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}