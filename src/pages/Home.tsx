import React from 'react';
import { Header } from '../components/Header';
import { Features } from '../components/Features';
import { Demo } from '../components/Demo';
import { TechnicalDetails } from '../components/TechnicalDetails';

export function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Features />
      <Demo />
      <TechnicalDetails />
      
      <footer className="bg-gray-50 py-8">
        <div className="container mx-auto px-6 text-center text-gray-600">
          <p>© 2024 bAbI Chatbot. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}