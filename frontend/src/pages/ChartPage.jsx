// ChartPage.jsx
import React from 'react';
import ChartCreator from '../components/ChartCreator';
import ChartDisplay from '../components/ChartDisplay';
import HistoryTable from '../components/HistoryTable';

const ChartPage = () => {
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center">Create and View Charts</h1>

      <section className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">1. Create a New Chart</h2>
        <ChartCreator />
      </section>

      <section className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">2. View Chart Output</h2>
        <ChartDisplay />
      </section>


    </div>
  );
};

export default ChartPage;
