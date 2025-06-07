// import React, { useState, useEffect } from 'react';

// const AIsuggestion = ({ 
//   currentFile, 
//   onChartSuggestion, 
//   currentChart, 
//   chartConfig 
// }) => {
//   const [suggestions, setSuggestions] = useState([]);
//   const [analysis, setAnalysis] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   // Gemini API configuration
//   const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
//   const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

//   // Generate chart suggestions when file is selected
//   useEffect(() => {
//     if (currentFile && currentFile.columns && currentFile.data) {
//       generateChartSuggestions();
//     }
//   }, [currentFile]);

//   // Generate chart analysis when chart is created
//   useEffect(() => {
//     if (currentChart && chartConfig) {
//       generateChartAnalysis();
//     }
//   }, [currentChart, chartConfig]);

//   const callGeminiAPI = async (prompt) => {
//     try {
//       const response = await fetch(GEMINI_API_URL, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           contents: [{
//             parts: [{
//               text: prompt
//             }]
//           }]
//         })
//       });

//       if (!response.ok) {
//         throw new Error(`Gemini API error: ${response.status}`);
//       }

//       const data = await response.json();
//       return data.candidates[0]?.content?.parts[0]?.text || '';
//     } catch (error) {
//       console.error('Gemini API error:', error);
//       throw error;
//     }
//   };

//   const generateChartSuggestions = async () => {
//     setLoading(true);
//     setError('');

//     try {
//       // Analyze the data structure
//       const columns = currentFile.columns || [];
//       const sampleData = currentFile.data?.slice(0, 10) || [];
      
//       // Create data summary for AI
//       const dataSummary = {
//         columns: columns,
//         sampleRows: sampleData.length,
//         totalRows: currentFile.data?.length || 0,
//         columnTypes: analyzeColumnTypes(columns, sampleData)
//       };

//       const prompt = `
// Analyze this Excel data and suggest the best chart types for visualization:

// Data Structure:
// - Columns: ${columns.join(', ')}
// - Total Rows: ${dataSummary.totalRows}
// - Sample Data: ${JSON.stringify(sampleData.slice(0, 3))}

// Column Analysis:
// ${Object.entries(dataSummary.columnTypes).map(([col, type]) => `- ${col}: ${type}`).join('\n')}

// Available Chart Types:
// 1. Bar Chart - Good for comparing categories
// 2. Line Chart - Good for trends over time
// 3. Pie Chart - Good for showing parts of a whole
// 4. Scatter Plot - Good for showing relationships between variables
// 5. 3D Column Chart - Good for enhanced visual impact of comparisons

// Please provide:
// 1. Top 3 recommended chart types with reasons
// 2. Best X-axis and Y-axis combinations
// 3. Brief explanation for each recommendation

// Format your response as JSON:
// {
//   "recommendations": [
//     {
//       "chartType": "bar|line|pie|scatter|column3d",
//       "xAxis": "column_name",
//       "yAxis": "column_name", 
//       "reason": "explanation",
//       "confidence": "high|medium|low"
//     }
//   ]
// }
// `;

//       const response = await callGeminiAPI(prompt);
      
//       // Parse the JSON response
//       const jsonMatch = response.match(/\{[\s\S]*\}/);
//       if (jsonMatch) {
//         const aiResponse = JSON.parse(jsonMatch[0]);
//         setSuggestions(aiResponse.recommendations || []);
//       } else {
//         // Fallback parsing if JSON is not properly formatted
//         setSuggestions(parseTextResponse(response));
//       }

//     } catch (error) {
//       console.error('Error generating suggestions:', error);
//       setError('Failed to generate AI suggestions. Please try again.');
//       // Provide basic fallback suggestions
//       setFallbackSuggestions();
//     } finally {
//       setLoading(false);
//     }
//   };

//   const generateChartAnalysis = async () => {
//     if (!currentChart || !chartConfig) return;

//     try {
//       const chartData = currentChart.chartData;
//       const prompt = `
// Analyze this chart and provide a concise summary in 3-4 lines:

// Chart Details:
// - Chart Name: ${chartConfig.chartName}
// - Chart Type: ${chartConfig.chartType}
// - X-axis: ${chartConfig.xAxis}
// - Y-axis: ${chartConfig.yAxis}
// - Data Labels: ${chartData.labels?.join(', ') || 'N/A'}
// - Data Values: ${chartData.datasets?.[0]?.data?.join(', ') || 'N/A'}

// Please provide:
// 1. Key insights from the data
// 2. Notable trends or patterns
// 3. Highest/lowest values if applicable
// 4. Overall summary

// Keep the analysis concise and focused (3-4 sentences maximum).
// `;

//       const response = await callGeminiAPI(prompt);
//       setAnalysis(response.trim());

//     } catch (error) {
//       console.error('Error generating analysis:', error);
//       setAnalysis('Unable to generate chart analysis. The chart has been created successfully.');
//     }
//   };

//   const analyzeColumnTypes = (columns, sampleData) => {
//     const types = {};
    
//     columns.forEach(column => {
//       const sampleValues = sampleData.map(row => row[column]).filter(val => val !== null && val !== undefined);
      
//       if (sampleValues.length === 0) {
//         types[column] = 'unknown';
//         return;
//       }

//       const isNumeric = sampleValues.every(val => !isNaN(parseFloat(val)) && isFinite(val));
//       const isDate = sampleValues.some(val => !isNaN(Date.parse(val)));
      
//       if (isNumeric) {
//         types[column] = 'numeric';
//       } else if (isDate) {
//         types[column] = 'date';
//       } else {
//         types[column] = 'categorical';
//       }
//     });

//     return types;
//   };

//   const parseTextResponse = (text) => {
//     // Basic fallback parsing for non-JSON responses
//     const suggestions = [];
//     const lines = text.split('\n');
    
//     lines.forEach(line => {
//       if (line.includes('bar') || line.includes('Bar')) {
//         suggestions.push({
//           chartType: 'bar',
//           reason: 'Recommended for category comparison',
//           confidence: 'medium'
//         });
//       }
//       // Add more parsing logic as needed
//     });

//     return suggestions.slice(0, 3);
//   };

//   const setFallbackSuggestions = () => {
//     const columns = currentFile?.columns || [];
//     const numericColumns = columns.filter(col => 
//       currentFile.data?.some(row => !isNaN(parseFloat(row[col])))
//     );
//     const categoricalColumns = columns.filter(col => !numericColumns.includes(col));

//     const fallback = [];
    
//     if (numericColumns.length > 0 && categoricalColumns.length > 0) {
//       fallback.push({
//         chartType: 'bar',
//         xAxis: categoricalColumns[0],
//         yAxis: numericColumns[0],
//         reason: 'Good for comparing values across categories',
//         confidence: 'medium'
//       });
//     }

//     if (numericColumns.length >= 2) {
//       fallback.push({
//         chartType: 'scatter',
//         xAxis: numericColumns[0],
//         yAxis: numericColumns[1],
//         reason: 'Good for showing relationships between numeric variables',
//         confidence: 'medium'
//       });
//     }

//     setSuggestions(fallback);
//   };

//   const handleSuggestionClick = (suggestion) => {
//     onChartSuggestion({
//       chartType: suggestion.chartType,
//       xAxis: suggestion.xAxis,
//       yAxis: suggestion.yAxis
//     });
//   };

//   if (!currentFile) return null;

//   return (
//     <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl shadow-lg p-6 border border-purple-200">
//       <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
//         🤖 AI Chart Assistant
//       </h3>

//       {/* Chart Suggestions Section */}
//       {suggestions.length > 0 && (
//         <div className="mb-6">
//           <h4 className="text-lg font-medium text-gray-700 mb-3">
//             📊 Recommended Charts
//           </h4>
          
//           {loading ? (
//             <div className="flex items-center justify-center py-4">
//               <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500 mr-2"></div>
//               <span className="text-gray-600">AI is analyzing your data...</span>
//             </div>
//           ) : (
//             <div className="grid gap-3">
//               {suggestions.map((suggestion, index) => (
//                 <div
//                   key={index}
//                   className="bg-white rounded-lg p-4 border border-gray-200 hover:border-purple-300 transition-colors cursor-pointer"
//                   onClick={() => handleSuggestionClick(suggestion)}
//                 >
//                   <div className="flex items-center justify-between">
//                     <div className="flex-1">
//                       <div className="flex items-center space-x-2 mb-2">
//                         <span className="text-lg">
//                           {suggestion.chartType === 'bar' && '📊'}
//                           {suggestion.chartType === 'line' && '📈'}
//                           {suggestion.chartType === 'pie' && '🥧'}
//                           {suggestion.chartType === 'scatter' && '⚡'}
//                           {suggestion.chartType === 'column3d' && '📈'}
//                         </span>
//                         <span className="font-medium text-gray-800 capitalize">
//                           {suggestion.chartType} Chart
//                         </span>
//                         <span className={`px-2 py-1 rounded-full text-xs ${
//                           suggestion.confidence === 'high' ? 'bg-green-100 text-green-800' :
//                           suggestion.confidence === 'medium' ? 'bg-yellow-100 text-yellow-800' :
//                           'bg-gray-100 text-gray-800'
//                         }`}>
//                           {suggestion.confidence} confidence
//                         </span>
//                       </div>
                      
//                       {suggestion.xAxis && suggestion.yAxis && (
//                         <p className="text-sm text-gray-600 mb-1">
//                           <strong>Axes:</strong> {suggestion.xAxis} vs {suggestion.yAxis}
//                         </p>
//                       )}
                      
//                       <p className="text-sm text-gray-700">{suggestion.reason}</p>
//                     </div>
                    
//                     <button className="ml-4 px-3 py-1 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors text-sm">
//                       Use This
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       )}

//       {/* Chart Analysis Section */}
//       {analysis && (
//         <div className="mt-6 pt-6 border-t border-purple-200">
//           <h4 className="text-lg font-medium text-gray-700 mb-3 flex items-center">
//             🔍 Chart Analysis
//           </h4>
//           <div className="bg-white rounded-lg p-4 border border-gray-200">
//             <p className="text-gray-700 leading-relaxed">{analysis}</p>
//           </div>
//         </div>
//       )}

//       {/* Error Display */}
//       {error && (
//         <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
//           <p className="text-red-700 text-sm">{error}</p>
//         </div>
//       )}

//       {/* Loading State */}
//       {loading && !suggestions.length && (
//         <div className="text-center py-8">
//           <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
//           <p className="mt-2 text-gray-600">AI is analyzing your data...</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AIsuggestion;































//AI integrted


import React, { useState, useEffect } from 'react';

const AIsuggestion = ({ 
  currentFile, 
  onChartSuggestion, 
  currentChart, 
  chartConfig 
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Updated Gemini API configuration
  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  
  // Updated to use current model name
  const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

  // Generate chart suggestions when file is selected
  useEffect(() => {
    if (currentFile && currentFile.columns && currentFile.data) {
      generateChartSuggestions();
    }
  }, [currentFile]);

  // Generate chart analysis when chart is created
  useEffect(() => {
    if (currentChart && chartConfig) {
      generateChartAnalysis();
    }
  }, [currentChart, chartConfig]);

  const callGeminiAPI = async (prompt) => {
    // Check if API key is available
    if (!GEMINI_API_KEY) {
      throw new Error('Gemini API key is not configured. Please set VITE_GEMINI_API_KEY in your environment variables.');
    }

    // Try multiple models in case one fails
    const models = [
      'gemini-1.5-flash',
      'gemini-1.5-pro',
      'gemini-1.0-pro'
    ];

    for (const model of models) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
        
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: prompt
              }]
            }]
          })
        });

        if (response.ok) {
          const data = await response.json();
          console.log(`✅ Success with model: ${model}`);
          return data.candidates[0]?.content?.parts[0]?.text || '';
        } else {
          console.warn(`❌ Model ${model} failed with status: ${response.status}`);
          if (response.status === 403) {
            throw new Error('API key is invalid or doesn\'t have proper permissions');
          }
          continue;
        }
      } catch (error) {
        console.warn(`❌ Model ${model} failed:`, error.message);
        if (model === models[models.length - 1]) {
          // If this is the last model, throw the error
          throw error;
        }
        continue;
      }
    }
    
    throw new Error('All Gemini models failed to respond');
  };

  const generateChartSuggestions = async () => {
    setLoading(true);
    setError('');

    try {
      // Analyze the data structure
      const columns = currentFile.columns || [];
      const sampleData = currentFile.data?.slice(0, 10) || [];
      
      // Create data summary for AI
      const dataSummary = {
        columns: columns,
        sampleRows: sampleData.length,
        totalRows: currentFile.data?.length || 0,
        columnTypes: analyzeColumnTypes(columns, sampleData)
      };

      const prompt = `
Analyze this Excel data and suggest the best chart types for visualization:

Data Structure:
- Columns: ${columns.join(', ')}
- Total Rows: ${dataSummary.totalRows}
- Sample Data: ${JSON.stringify(sampleData.slice(0, 3))}

Column Analysis:
${Object.entries(dataSummary.columnTypes).map(([col, type]) => `- ${col}: ${type}`).join('\n')}

Available Chart Types:
1. Bar Chart - Good for comparing categories
2. Line Chart - Good for trends over time
3. Pie Chart - Good for showing parts of a whole
4. Scatter Plot - Good for showing relationships between variables
5. 3D Column Chart - Good for enhanced visual impact of comparisons

Please provide:
1. Top 3 recommended chart types with reasons
2. Best X-axis and Y-axis combinations
3. Brief explanation for each recommendation

Format your response as JSON:
{
  "recommendations": [
    {
      "chartType": "bar|line|pie|scatter|column3d",
      "xAxis": "column_name",
      "yAxis": "column_name", 
      "reason": "explanation",
      "confidence": "high|medium|low"
    }
  ]
}
`;

      const response = await callGeminiAPI(prompt);
      
      // Parse the JSON response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const aiResponse = JSON.parse(jsonMatch[0]);
        setSuggestions(aiResponse.recommendations || []);
      } else {
        // Fallback parsing if JSON is not properly formatted
        setSuggestions(parseTextResponse(response));
      }

    } catch (error) {
      console.error('Error generating suggestions:', error);
      setError(`Failed to generate AI suggestions: ${error.message}`);
      // Provide basic fallback suggestions
      setFallbackSuggestions();
    } finally {
      setLoading(false);
    }
  };

  const generateChartAnalysis = async () => {
    if (!currentChart || !chartConfig) return;

    try {
      const chartData = currentChart.chartData;
      const prompt = `
Analyze this chart and provide a concise summary in 3-4 lines:

Chart Details:
- Chart Name: ${chartConfig.chartName}
- Chart Type: ${chartConfig.chartType}
- X-axis: ${chartConfig.xAxis}
- Y-axis: ${chartConfig.yAxis}
- Data Labels: ${chartData.labels?.join(', ') || 'N/A'}
- Data Values: ${chartData.datasets?.[0]?.data?.join(', ') || 'N/A'}

Please provide:
1. Key insights from the data
2. Notable trends or patterns
3. Highest/lowest values if applicable
4. Overall summary

Keep the analysis concise and focused (3-4 sentences maximum).
`;

      const response = await callGeminiAPI(prompt);
      setAnalysis(response.trim());

    } catch (error) {
      console.error('Error generating analysis:', error);
      setAnalysis('Unable to generate chart analysis. The chart has been created successfully.');
    }
  };

  const analyzeColumnTypes = (columns, sampleData) => {
    const types = {};
    
    columns.forEach(column => {
      const sampleValues = sampleData.map(row => row[column]).filter(val => val !== null && val !== undefined);
      
      if (sampleValues.length === 0) {
        types[column] = 'unknown';
        return;
      }

      const isNumeric = sampleValues.every(val => !isNaN(parseFloat(val)) && isFinite(val));
      const isDate = sampleValues.some(val => !isNaN(Date.parse(val)));
      
      if (isNumeric) {
        types[column] = 'numeric';
      } else if (isDate) {
        types[column] = 'date';
      } else {
        types[column] = 'categorical';
      }
    });

    return types;
  };

  const parseTextResponse = (text) => {
    // Basic fallback parsing for non-JSON responses
    const suggestions = [];
    const lines = text.split('\n');
    
    lines.forEach(line => {
      if (line.includes('bar') || line.includes('Bar')) {
        suggestions.push({
          chartType: 'bar',
          reason: 'Recommended for category comparison',
          confidence: 'medium'
        });
      }
      // Add more parsing logic as needed
    });

    return suggestions.slice(0, 3);
  };

  const setFallbackSuggestions = () => {
    const columns = currentFile?.columns || [];
    const numericColumns = columns.filter(col => 
      currentFile.data?.some(row => !isNaN(parseFloat(row[col])))
    );
    const categoricalColumns = columns.filter(col => !numericColumns.includes(col));

    const fallback = [];
    
    if (numericColumns.length > 0 && categoricalColumns.length > 0) {
      fallback.push({
        chartType: 'bar',
        xAxis: categoricalColumns[0],
        yAxis: numericColumns[0],
        reason: 'Good for comparing values across categories',
        confidence: 'medium'
      });
    }

    if (numericColumns.length >= 2) {
      fallback.push({
        chartType: 'scatter',
        xAxis: numericColumns[0],
        yAxis: numericColumns[1],
        reason: 'Good for showing relationships between numeric variables',
        confidence: 'medium'
      });
    }

    setSuggestions(fallback);
  };

  const handleSuggestionClick = (suggestion) => {
    onChartSuggestion({
      chartType: suggestion.chartType,
      xAxis: suggestion.xAxis,
      yAxis: suggestion.yAxis
    });
  };

  if (!currentFile) return null;

  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl shadow-lg p-6 border border-purple-200">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        🤖 AI Chart Assistant
      </h3>

      {/* API Key Warning */}
      {!GEMINI_API_KEY && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-800 text-sm">
            ⚠️ <strong>AI features disabled:</strong> Please set your VITE_GEMINI_API_KEY in your environment variables to enable AI suggestions.
          </p>
        </div>
      )}

      {/* Chart Suggestions Section */}
      {suggestions.length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-medium text-gray-700 mb-3">
            📊 Recommended Charts
          </h4>
          
          {loading ? (
            <div className="flex items-center justify-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500 mr-2"></div>
              <span className="text-gray-600">AI is analyzing your data...</span>
            </div>
          ) : (
            <div className="grid gap-3">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-4 border border-gray-200 hover:border-purple-300 transition-colors cursor-pointer"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-lg">
                          {suggestion.chartType === 'bar' && '📊'}
                          {suggestion.chartType === 'line' && '📈'}
                          {suggestion.chartType === 'pie' && '🥧'}
                          {suggestion.chartType === 'scatter' && '⚡'}
                          {suggestion.chartType === 'column3d' && '📈'}
                        </span>
                        <span className="font-medium text-gray-800 capitalize">
                          {suggestion.chartType} Chart
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          suggestion.confidence === 'high' ? 'bg-green-100 text-green-800' :
                          suggestion.confidence === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {suggestion.confidence} confidence
                        </span>
                      </div>
                      
                      {suggestion.xAxis && suggestion.yAxis && (
                        <p className="text-sm text-gray-600 mb-1">
                          <strong>Axes:</strong> {suggestion.xAxis} vs {suggestion.yAxis}
                        </p>
                      )}
                      
                      <p className="text-sm text-gray-700">{suggestion.reason}</p>
                    </div>
                    
                    <button className="ml-4 px-3 py-1 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors text-sm">
                      Use This
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Chart Analysis Section */}
      {analysis && (
        <div className="mt-6 pt-6 border-t border-purple-200">
          <h4 className="text-lg font-medium text-gray-700 mb-3 flex items-center">
            🔍 Chart Analysis
          </h4>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className="text-gray-700 leading-relaxed">{analysis}</p>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Loading State */}
      {loading && !suggestions.length && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
          <p className="mt-2 text-gray-600">AI is analyzing your data...</p>
        </div>
      )}
    </div>
  );
};

export default AIsuggestion;
