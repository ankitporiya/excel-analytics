// with animation
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AIsuggestion = ({
  currentFile,
  onChartSuggestion,
  currentChart,
  chartConfig,
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Updated Gemini API configuration
  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  // Updated to use current model name
  const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const suggestionVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    hover: {
      scale: 1.02,
      boxShadow: "0 8px 25px rgba(34, 139, 34, 0.15)",
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.98 },
  };

  const loadingVariants = {
    spin: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

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
      throw new Error(
        "Gemini API key is not configured. Please set VITE_GEMINI_API_KEY in your environment variables."
      );
    }

    // Try multiple models in case one fails
    const models = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-1.0-pro"];

    for (const model of models) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
          }),
        });

        if (response.ok) {
          const data = await response.json();
          // console.log(`✅ Success with model: ${model}`);
          return data.candidates[0]?.content?.parts[0]?.text || "";
        } else {
          console.warn(
            `❌ Model ${model} failed with status: ${response.status}`
          );
          if (response.status === 403) {
            throw new Error(
              "API key is invalid or doesn't have proper permissions"
            );
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

    throw new Error("All Gemini models failed to respond");
  };

  const generateChartSuggestions = async () => {
    setLoading(true);
    setError("");

    try {
      // Analyze the data structure
      const columns = currentFile.columns || [];
      const sampleData = currentFile.data?.slice(0, 10) || [];

      // Create data summary for AI
      const dataSummary = {
        columns: columns,
        sampleRows: sampleData.length,
        totalRows: currentFile.data?.length || 0,
        columnTypes: analyzeColumnTypes(columns, sampleData),
      };

      const prompt = `
Analyze this Excel data and suggest the best chart types for visualization:

Data Structure:
- Columns: ${columns.join(", ")}
- Total Rows: ${dataSummary.totalRows}
- Sample Data: ${JSON.stringify(sampleData.slice(0, 3))}

Column Analysis:
${Object.entries(dataSummary.columnTypes)
  .map(([col, type]) => `- ${col}: ${type}`)
  .join("\n")}

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
      "chartType": "bar|line|pie|scatter",
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
      console.error("Error generating suggestions:", error);
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
- Data Labels: ${chartData.labels?.join(", ") || "N/A"}
- Data Values: ${chartData.datasets?.[0]?.data?.join(", ") || "N/A"}

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
      console.error("Error generating analysis:", error);
      setAnalysis(
        "Unable to generate chart analysis. The chart has been created successfully."
      );
    }
  };

  const analyzeColumnTypes = (columns, sampleData) => {
    const types = {};

    columns.forEach((column) => {
      const sampleValues = sampleData
        .map((row) => row[column])
        .filter((val) => val !== null && val !== undefined);

      if (sampleValues.length === 0) {
        types[column] = "unknown";
        return;
      }

      const isNumeric = sampleValues.every(
        (val) => !isNaN(parseFloat(val)) && isFinite(val)
      );
      const isDate = sampleValues.some((val) => !isNaN(Date.parse(val)));

      if (isNumeric) {
        types[column] = "numeric";
      } else if (isDate) {
        types[column] = "date";
      } else {
        types[column] = "categorical";
      }
    });

    return types;
  };

  const parseTextResponse = (text) => {
    // Basic fallback parsing for non-JSON responses
    const suggestions = [];
    const lines = text.split("\n");

    lines.forEach((line) => {
      if (line.includes("bar") || line.includes("Bar")) {
        suggestions.push({
          chartType: "bar",
          reason: "Recommended for category comparison",
          confidence: "medium",
        });
      }
      // Add more parsing logic as needed
    });

    return suggestions.slice(0, 3);
  };

  const setFallbackSuggestions = () => {
    const columns = currentFile?.columns || [];
    const numericColumns = columns.filter((col) =>
      currentFile.data?.some((row) => !isNaN(parseFloat(row[col])))
    );
    const categoricalColumns = columns.filter(
      (col) => !numericColumns.includes(col)
    );

    const fallback = [];

    if (numericColumns.length > 0 && categoricalColumns.length > 0) {
      fallback.push({
        chartType: "bar",
        xAxis: categoricalColumns[0],
        yAxis: numericColumns[0],
        reason: "Good for comparing values across categories",
        confidence: "medium",
      });
    }

    if (numericColumns.length >= 2) {
      fallback.push({
        chartType: "scatter",
        xAxis: numericColumns[0],
        yAxis: numericColumns[1],
        reason: "Good for showing relationships between numeric variables",
        confidence: "medium",
      });
    }

    setSuggestions(fallback);
  };

  const handleSuggestionClick = (suggestion) => {
    onChartSuggestion({
      chartType: suggestion.chartType,
      xAxis: suggestion.xAxis,
      yAxis: suggestion.yAxis,
    });
  };

  if (!currentFile) return null;

  return (
    <motion.div
      className="bg-gradient-to-br from-[#f8fff8] via-[#e6f3e6] to-[#f0f8f0] rounded-xl shadow-lg border border-[#90EE90] overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header with animated background */}
      <motion.div
        className="bg-gradient-to-r from-[#228B22] to-[#32CD32] p-4 sm:p-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h3
          className="text-xl sm:text-2xl font-bold text-white mb-2 flex items-center flex-wrap gap-2"
          variants={pulseVariants}
          animate="pulse"
        >
          <motion.span
            className="text-2xl sm:text-3xl"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            🤖
          </motion.span>
          <span className="text-lg sm:text-xl">AI Chart Assistant</span>
        </motion.h3>
        <motion.p
          className="text-green-100 text-sm sm:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Smart recommendations powered by AI
        </motion.p>
      </motion.div>

      <div className="p-4 sm:p-6">
        {/* API Key Warning */}
        <AnimatePresence>
          {!GEMINI_API_KEY && (
            <motion.div
              className="mb-4 sm:mb-6 p-3 sm:p-4 bg-yellow-50 border-2 border-yellow-300 rounded-lg shadow-sm"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
            >
              <motion.p
                className="text-yellow-800 text-sm sm:text-base flex items-start gap-2"
                variants={itemVariants}
              >
                <span className="text-lg flex-shrink-0">⚠️</span>
                <span>
                  <strong>AI features disabled:</strong> Please set your
                  VITE_GEMINI_API_KEY in your environment variables to enable AI
                  suggestions.
                </span>
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chart Suggestions Section */}
        <AnimatePresence>
          {suggestions.length > 0 && (
            <motion.div
              className="mb-6 sm:mb-8"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h4
                className="text-lg sm:text-xl font-semibold text-[#228B22] mb-3 sm:mb-4 flex items-center gap-2"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <motion.span
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                >
                  📊
                </motion.span>
                Recommended Charts
              </motion.h4>

              {loading ? (
                <motion.div
                  className="flex flex-col sm:flex-row items-center justify-center py-6 sm:py-8 gap-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.div
                    className="rounded-full h-8 w-8 border-4 border-[#228B22] border-t-transparent"
                    variants={loadingVariants}
                    animate="spin"
                  />
                  <span className="text-[#228B22] font-medium text-center">
                    AI is analyzing your data...
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  className="grid gap-3 sm:gap-4"
                  variants={containerVariants}
                >
                  {suggestions.map((suggestion, index) => (
                    <motion.div
                      key={index}
                      className="bg-white rounded-lg border-2 border-[#90EE90] hover:border-[#32CD32] transition-all duration-300 cursor-pointer overflow-hidden"
                      variants={suggestionVariants}
                      whileHover="hover"
                      whileTap="tap"
                      onClick={() => handleSuggestionClick(suggestion)}
                      layout
                    >
                      <div className="p-4 sm:p-5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3 flex-wrap">
                              <motion.span
                                className="text-xl sm:text-2xl"
                                whileHover={{ scale: 1.3, rotate: 10 }}
                                transition={{ duration: 0.2 }}
                              >
                                {suggestion.chartType === "bar" && "📊"}
                                {suggestion.chartType === "line" && "📈"}
                                {suggestion.chartType === "pie" && "🥧"}
                                {suggestion.chartType === "scatter" && "⚡"}
                                {/* {suggestion.chartType === "column3d" && "📈"} */}
                              </motion.span>
                              <span className="font-semibold text-[#228B22] text-base sm:text-lg capitalize">
                                {suggestion.chartType}
                              </span>
                              <motion.span
                                className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                                  suggestion.confidence === "high"
                                    ? "bg-green-100 text-green-800"
                                    : suggestion.confidence === "medium"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-gray-100 text-gray-800"
                                }`}
                                whileHover={{ scale: 1.05 }}
                              >
                                {suggestion.confidence} confidence
                              </motion.span>
                            </div>

                            {suggestion.xAxis && suggestion.yAxis && (
                              <motion.p
                                className="text-sm sm:text-base text-gray-700 mb-2 font-medium"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                              >
                                <strong className="text-[#228B22]">
                                  Axes:
                                </strong>{" "}
                                {suggestion.xAxis} vs {suggestion.yAxis}
                              </motion.p>
                            )}

                            <motion.p
                              className="text-sm sm:text-base text-gray-600 line-clamp-3"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.3 }}
                            >
                              {suggestion.reason}
                            </motion.p>
                          </div>

                          <motion.button
                            className="ml-0 sm:ml-4 px-4 sm:px-6 py-2 sm:py-3 bg-[#228B22] text-white rounded-lg hover:bg-[#32CD32] transition-all duration-300 text-sm sm:text-base font-semibold shadow-lg self-start sm:self-center"
                            whileHover={{
                              scale: 1.05,
                              boxShadow: "0 6px 20px rgba(34, 139, 34, 0.3)",
                            }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Apply 2D Chart
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chart Analysis Section */}
        <AnimatePresence>
          {analysis && (
            <motion.div
              className="mt-6 sm:mt-8 pt-6 border-t-2 border-[#90EE90]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              variants={itemVariants}
            >
              <motion.h4
                className="text-lg sm:text-xl font-semibold text-[#228B22] mb-3 sm:mb-4 flex items-center gap-2"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <motion.span
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                >
                  🔍
                </motion.span>
                Chart Analysis
              </motion.h4>
              <motion.div
                className="bg-white rounded-lg border-2 border-[#90EE90] shadow-sm"
                whileHover={{
                  borderColor: "#32CD32",
                  boxShadow: "0 4px 20px rgba(34, 139, 34, 0.1)",
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="p-4 sm:p-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                    {analysis}
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Display */}
        <AnimatePresence>
          {error && (
            <motion.div
              className="mt-4 sm:mt-6 p-3 sm:p-4 bg-red-50 border-2 border-red-300 rounded-lg shadow-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
            >
              <motion.p
                className="text-red-700 text-sm sm:text-base flex items-start gap-2"
                variants={itemVariants}
              >
                <span className="text-lg flex-shrink-0">❌</span>
                <span>{error}</span>
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading State */}
        <AnimatePresence>
          {loading && !suggestions.length && (
            <motion.div
              className="text-center py-8 sm:py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="inline-block rounded-full h-10 w-10 sm:h-12 sm:w-12 border-4 border-[#228B22] border-t-transparent mb-4"
                variants={loadingVariants}
                animate="spin"
              />
              <motion.p
                className="text-[#228B22] font-medium text-base sm:text-lg"
                variants={pulseVariants}
                animate="pulse"
              >
                AI is analyzing your data...
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default AIsuggestion;
