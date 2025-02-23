import React from 'react';
import Suggestions from './components/suggestions/Suggestions';
import Header from './components/Header';

export default async function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Suggestions />
      </main>
    </>
  );
}
