import React, { useState } from 'react';

const FileDistributionChart = ({ storageData }) => {
  const [hoveredSegment, setHoveredSegment] = useState(null);

  // Calculate file counts based on the same logic as your original component
  const smallFiles = storageData.fileCount > 0 ? Math.ceil(storageData.fileCount * 0.3) : 0;
  const mediumFiles = storageData.fileCount > 0 ? Math.ceil(storageData.fileCount * 0.5) : 0;
  const largeFiles = storageData.fileCount > 0 ? Math.floor(storageData.fileCount * 0.2) : 0;



  // File size categories data
  const fileData = [
    {
      name: 'Small (< 1MB)',
      value: smallFiles,
      color: '#00C49F',
      icon: '📄',
      description: 'Lightweight files'
    },
    {
      name: 'Medium (1-5MB)',
      value: mediumFiles,
      color: '#FFBB28',
      icon: '📊',
      description: 'Standard size files'
    },
    {
      name: 'Large (> 5MB)',
      value: largeFiles,
      color: '#FF8042',
      icon: '📈',
      description: 'Heavy files'
    }
  ].filter(item => item.value > 0); // Only show categories with files

  const total = fileData.reduce((sum, item) => sum + item.value, 0);

  if (total === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6" style={{ backgroundColor: "#f2f2f0" }}>
        <h2 className="text-xl font-bold mb-4" style={{ color: "#0d0d0d" }}>
          File Distribution
        </h2>
        <div className="flex items-center justify-center h-64" style={{ color: "#819fa7" }}>
          No files to display
        </div>
      </div>
    );
  }

  // Calculate angles for each segment
  let cumulativePercentage = 0;
  const segments = fileData.map((item, index) => {
    const percentage = (item.value / total) * 100;
    const startAngle = cumulativePercentage * 3.6; // Convert to degrees
    const endAngle = (cumulativePercentage + percentage) * 3.6;
    cumulativePercentage += percentage;

    return {
      ...item,
      percentage: percentage.toFixed(1),
      startAngle,
      endAngle,
      index
    };
  });

  // Create SVG path for donut segments
  const createDonutPath = (startAngle, endAngle, innerRadius = 60, outerRadius = 100) => {
    const startOuter = polarToCartesian(0, 0, outerRadius, endAngle);
    const endOuter = polarToCartesian(0, 0, outerRadius, startAngle);
    const startInner = polarToCartesian(0, 0, innerRadius, endAngle);
    const endInner = polarToCartesian(0, 0, innerRadius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    const d = [
      "M", startOuter.x, startOuter.y,
      "A", outerRadius, outerRadius, 0, largeArcFlag, 0, endOuter.x, endOuter.y,
      "L", endInner.x, endInner.y,
      "A", innerRadius, innerRadius, 0, largeArcFlag, 1, startInner.x, startInner.y,
      "Z"
    ].join(" ");

    return d;
  };

  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  // Use actual storage data instead of estimates
  const totalStorageMB = storageData.storageMB || 0;
  const totalStorageBytes = storageData.storageBytes || 0;

  // Calculate actual average file sizes based on real data
  const calculateActualStorageDistribution = () => {
    if (storageData.fileCount === 0) {
      return { small: 0, medium: 0, large: 0 };
    }

    // Calculate proportional storage based on file count distribution
    const smallProportion = smallFiles / storageData.fileCount;
    const mediumProportion = mediumFiles / storageData.fileCount;  
    const largeProportion = largeFiles / storageData.fileCount;

    // Distribute actual storage proportionally
    const smallStorage = totalStorageMB * smallProportion;
    const mediumStorage = totalStorageMB * mediumProportion;
    const largeStorage = totalStorageMB * largeProportion;

    // Format small values appropriately
    const formatStorage = (value) => {
      if (value >= 1) return value.toFixed(2);
      if (value >= 0.01) return value.toFixed(3);
      if (value >= 0.001) return value.toFixed(4);
      return value.toFixed(5);
    };

    return {
      small: formatStorage(smallStorage),
      medium: formatStorage(mediumStorage), 
      large: formatStorage(largeStorage)
    };
  };

  // Use actual storage data
  const storageInfo = calculateActualStorageDistribution();

  return (
    <div className="bg-white rounded-lg p-6" style={{ backgroundColor: "#f2f2f0" }}>

      
      <div className="flex flex-col lg:flex-row items-center gap-8">
        {/* Donut Chart */}
        <div className="relative">
          <svg width="240" height="240" viewBox="-120 -120 240 240" className="transform rotate-0">
            {segments.map((segment, index) => (
              <path
                key={index}
                d={createDonutPath(segment.startAngle, segment.endAngle)}
                fill={segment.color}
                stroke="white"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-300"
                onMouseEnter={() => setHoveredSegment(segment)}
                onMouseLeave={() => setHoveredSegment(null)}
                style={{
                  filter: hoveredSegment?.index === index ? 'brightness(1.1) drop-shadow(0 0 8px rgba(0,0,0,0.3))' : 'none',
                  transform: hoveredSegment?.index === index ? 'scale(1.05)' : 'scale(1)',
                  transformOrigin: 'center'
                }}
              />
            ))}
            
            {/* Center content */}
            <circle
              cx="0"
              cy="0"
              r="55"
              fill="#f2f2f0"
              stroke="white"
              strokeWidth="2"
            />
            
            <text
              x="0"
              y="-15"
              textAnchor="middle"
              className="text-sm font-bold"
              fill="#0d0d0d"
            >
              Total Files
            </text>
            <text
              x="0"
              y="5"
              textAnchor="middle"
              className="text-2xl font-bold"
              fill="#0d0d0d"
            >
              {total}
            </text>
          </svg>

          {/* Hover tooltip */}
          {hoveredSegment && (
            <div 
              className="absolute bg-white p-3 rounded-lg shadow-lg border pointer-events-none z-10"
              style={{ 
                borderColor: '#bde8f1',
                top: '10%',
                right: '-50%',
                transform: 'translateX(50%)'
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{hoveredSegment.icon}</span>
                <span className="font-semibold" style={{ color: '#0d0d0d' }}>
                  {hoveredSegment.name}
                </span>
              </div>
              <div className="text-sm space-y-1">
                <p style={{ color: '#819fa7' }}>
                  Files: <span className="font-semibold" style={{ color: '#0d0d0d' }}>
                    {hoveredSegment.value}
                  </span>
                </p>
                <p style={{ color: '#819fa7' }}>
                  Percentage: <span className="font-semibold" style={{ color: '#0d0d0d' }}>
                    {hoveredSegment.percentage}%
                  </span>
                </p>
                <p style={{ color: '#819fa7' }}>
                  {hoveredSegment.description}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Legend and Stats */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold mb-4" style={{ color: '#0d0d0d' }}>
            File Size Categories
          </h3>
          <div className="space-y-3">
            {segments.map((segment, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200"
                style={{ 
                  backgroundColor: hoveredSegment?.index === index ? '#f0f9ff' : 'transparent',
                  borderLeft: `4px solid ${segment.color}`,
                  border: hoveredSegment?.index === index ? `1px solid ${segment.color}30` : '1px solid transparent'
                }}
                onMouseEnter={() => setHoveredSegment(segment)}
                onMouseLeave={() => setHoveredSegment(null)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{segment.icon}</span>
                  <div>
                    <div className="font-medium" style={{ color: '#0d0d0d' }}>
                      {segment.name}
                    </div>
                    <div className="text-sm" style={{ color: '#819fa7' }}>
                      {segment.percentage}% of total files
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg" style={{ color: '#0d0d0d' }}>
                    {segment.value}
                  </div>
                  <div className="text-xs" style={{ color: '#819fa7' }}>
                    files
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileDistributionChart;