// components/ChartCreator.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createChart } from '../redux/chartSlice';
import { getFileData } from '../redux/fileSlice';

const ChartCreator = ({ fileId, onChartCreated }) => {
  const [formData, setFormData] = useState({
    chartName: '',
    chartType: 'bar',
    xAxis: '',
    yAxis: ''
  });

  const dispatch = useDispatch();
  const { currentFile } = useSelector((state) => state.files);
  const { loading } = useSelector((state) => state.charts);

  useEffect(() => {
    if (fileId) dispatch(getFileData(fileId));
  }, [fileId, dispatch]);

  const chartTypes = [
    { value: 'bar', label: 'Bar Chart', icon: '📊' },
    { value: 'line', label: 'Line Chart', icon: '📈' },
    { value: 'pie', label: 'Pie Chart', icon: '🥧' },
    { value: 'scatter', label: 'Scatter Plot', icon: '⚡' },
    { value: 'column3d', label: '3D Column Chart', icon: '📈' }
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.chartName || !formData.xAxis || !formData.yAxis) return alert('Fill all fields');

    try {
      await dispatch(createChart({ fileId, ...formData })).unwrap();
      if (onChartCreated) onChartCreated();
      setFormData({ chartName: '', chartType: 'bar', xAxis: '', yAxis: '' });
    } catch (err) {
      console.error('Chart creation failed:', err);
    }
  };

  if (!currentFile) return <div className="text-center py-4">Loading file data...</div>;

  const columns = currentFile?.columns || [];

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-4">
      <div>
        <label className="block mb-1 font-semibold">Chart Name *</label>
        <input type="text" name="chartName" value={formData.chartName} onChange={handleInputChange} className="w-full border p-2 rounded" required />
      </div>
      <div>
        <label className="block mb-1 font-semibold">Chart Type *</label>
        <select name="chartType" value={formData.chartType} onChange={handleInputChange} className="w-full border p-2 rounded">
          {chartTypes.map((type) => (
            <option key={type.value} value={type.value}>{type.icon} {type.label}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block mb-1 font-semibold">X Axis *</label>
        <select name="xAxis" value={formData.xAxis} onChange={handleInputChange} className="w-full border p-2 rounded">
          <option value="">Select Column</option>
          {columns.map((col) => <option key={col} value={col}>{col}</option>)}
        </select>
      </div>
      <div>
        <label className="block mb-1 font-semibold">Y Axis *</label>
        <select name="yAxis" value={formData.yAxis} onChange={handleInputChange} className="w-full border p-2 rounded">
          <option value="">Select Column</option>
          {columns.map((col) => <option key={col} value={col}>{col}</option>)}
        </select>
      </div>
      <button type="submit" disabled={loading} className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
        {loading ? 'Creating...' : 'Create Chart'}
      </button>
    </form>
  );
};

export default ChartCreator;