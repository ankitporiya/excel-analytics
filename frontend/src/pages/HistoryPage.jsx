// pages/HistoryPage.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserCharts } from '../redux/chartSlice';
import HistoryTable from '../components/HistoryTable';
import ChartDisplay from '../components/ChartDisplay';

const HistoryPage = () => {
  const dispatch = useDispatch();
  const { charts } = useSelector((state) => state.charts);
  const [selectedChart, setSelectedChart] = useState(null);

  useEffect(() => {
    dispatch(getUserCharts());
  }, [dispatch]);

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-blue-100 to-gray-100">
      <h1 className="text-2xl font-bold mb-4">Your Chart History</h1>
      <HistoryTable charts={charts} onViewChart={setSelectedChart} />
      {selectedChart && <ChartDisplay chart={selectedChart} />}
    </div>
  );
};

export default HistoryPage;
