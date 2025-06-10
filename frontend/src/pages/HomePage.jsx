import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const navigate = useNavigate();

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const parallaxStyle = {
    transform: `translate(${mousePosition.x * 0.02}px, ${
      mousePosition.y * 0.02
    }px)`,
  };

  const FloatingOrb = ({ delay, size, position }) => (
    <div
      className="absolute rounded-full opacity-20 animate-pulse"
      style={{
        width: size,
        height: size,
        background: "linear-gradient(45deg, #5b6e74, #819fa7)",
        left: position.x,
        top: position.y,
        animationDelay: `${delay}s`,
        animationDuration: "4s",
        filter: "blur(1px)",
      }}
    />
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(40px, 40px); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        
        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-shimmer {
          animation: shimmer 0.8s ease-out;
        }
        
        @media (max-width: 640px) {
          .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }
      `}</style>

      <div
        className="min-h-screen relative overflow-hidden"
        style={{
          background: `
            radial-gradient(circle at ${mousePosition.x * 0.1}% ${
            mousePosition.y * 0.1
          }%, rgba(34, 139, 34, 0.08) 0%, transparent 50%),
            linear-gradient(135deg, #f8fff8 0%, #e6f3e6 25%, #f0f8f0 50%, #e8f5e8 75%, #f2f9f2 100%)
          `,
          transition: "background 0.3s ease",
        }}
      >
        {/* Excel-themed data visualization elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated spreadsheet grid */}
          <div
            className="absolute inset-0 opacity-8"
            style={{
              backgroundImage: `
                linear-gradient(rgba(34, 139, 34, 0.15) 1px, transparent 1px),
                linear-gradient(90deg, rgba(34, 139, 34, 0.15) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
              animation: "gridMove 25s linear infinite",
            }}
          />

          {/* Floating chart elements */}
          <div
            className="absolute w-32 h-20 opacity-10"
            style={{
              left: "15%",
              top: "25%",
              background: "linear-gradient(45deg, #228B22 0%, #32CD32 100%)",
              clipPath:
                "polygon(0 100%, 25% 60%, 50% 80%, 75% 40%, 100% 60%, 100% 100%)",
              animation: "float 6s ease-in-out infinite",
            }}
          />

          <div
            className="absolute w-24 h-24 opacity-10"
            style={{
              right: "20%",
              top: "20%",
              background:
                "conic-gradient(from 0deg, #228B22 0deg, #32CD32 120deg, #90EE90 240deg, #228B22 360deg)",
              borderRadius: "50%",
              animation: "rotate 15s linear infinite",
            }}
          />

          <div
            className="absolute w-28 h-16 opacity-10"
            style={{
              left: "70%",
              bottom: "30%",
              background:
                "linear-gradient(to top, #228B22 0%, #32CD32 50%, #90EE90 100%)",
              clipPath:
                "polygon(10% 100%, 20% 85%, 30% 90%, 40% 75%, 50% 80%, 60% 65%, 70% 70%, 80% 55%, 90% 60%, 100% 45%, 100% 100%)",
              animation: "float 8s ease-in-out infinite reverse",
            }}
          />

          {/* Data points */}
          <div
            className="absolute w-3 h-3 rounded-full opacity-20"
            style={{
              left: "25%",
              top: "40%",
              backgroundColor: "#228B22",
              animation: "pulse 2s infinite",
            }}
          />
          <div
            className="absolute w-2 h-2 rounded-full opacity-20"
            style={{
              right: "30%",
              top: "55%",
              backgroundColor: "#32CD32",
              animation: "pulse 2.5s infinite",
            }}
          />
          <div
            className="absolute w-4 h-4 rounded-full opacity-15"
            style={{
              left: "80%",
              bottom: "60%",
              backgroundColor: "#90EE90",
              animation: "pulse 3s infinite",
            }}
          />
        </div>

        <div className="container mx-auto px-4 py-8 sm:py-12 lg:py-16 relative z-10">
          <div
            className={`text-center mb-12 lg:mb-16 transition-all duration-1000 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
            style={parallaxStyle}
          >
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 lg:mb-6 relative"
              style={{
                color: "#0d0d0d",
                fontFamily:
                  "'Inter', 'SF Pro Display', -apple-system, system-ui, sans-serif",
                textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                letterSpacing: "-0.02em",
              }}
            >
              <span
                className="relative inline-block hover:scale-105 transition-transform duration-500"
                style={{ color: "#228B22" }}
              >
                Excel Analytics Platform
                <div className="absolute -inset-1 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg opacity-0 hover:opacity-30 transition-opacity duration-500 -z-10" />
              </span>
              {/* <br className="sm:hidden" />
              <span className="relative inline-block hover:scale-105 transition-transform duration-500 delay-100">
                Platform
              </span> */}
            </h1>

            <p
              className="text-lg sm:text-xl lg:text-2xl mb-6 lg:mb-8 animate-fade-in-up"
              style={{
                color: "#5b6e74",
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: "500",
                animationDelay: "0.3s",
              }}
            >
              Transform your Excel data into powerful insights
            </p>

            <p
              className="text-base sm:text-lg max-w-xl lg:max-w-2xl mx-auto leading-relaxed animate-fade-in-up px-4"
              style={{
                color: "#819fa7",
                fontFamily: "'Inter', system-ui, sans-serif",
                animationDelay: "0.6s",
              }}
            >
              Upload, analyze, and visualize your Excel data with advanced
              charting capabilities and AI-powered insights.
            </p>
          </div>

          <div
            className={`flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center max-w-sm sm:max-w-md mx-auto px-4 transition-all duration-1000 delay-300 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <button
              onClick={() => navigate("/login")}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-500 transform hover:scale-110 hover:shadow-2xl active:scale-95 relative overflow-hidden group"
              style={{
                backgroundColor: "#228B22",
                color: "#f2f2f0",
                fontFamily: "'Inter', system-ui, sans-serif",
                boxShadow: "0 8px 32px rgba(91, 110, 116, 0.3)",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#819fa7")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#5b6e74")}
            >
              <span className="relative z-10">Login</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:animate-shimmer" />
            </button>

            <button
              onClick={() => navigate("/register")}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg border-2 transition-all duration-500 transform hover:scale-110 hover:shadow-2xl active:scale-95 relative overflow-hidden group"
              style={{
                borderColor: "#228B22",
                color: "#228B22",
                backgroundColor: "rgba(59, 218, 10, 0.3)",
                fontFamily: "'Inter', system-ui, sans-serif",
                boxShadow: "0 8px 32px rgba(12, 241, 81, 0.15)",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#5b6e74";
                e.target.style.color = "#f2f2f0";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "rgba(90, 238, 21, 0.3)";
                e.target.style.color = "#228B22";
              }}
            >
              <span className="relative z-10">Register</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 transform -skew-x-12 group-hover:animate-shimmer" />
            </button>
          </div>

          <div
            className={`mt-12 lg:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto px-4 transition-all duration-1000 delay-500 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {[
              {
                icon: "📊",
                title: "Data Visualization",
                desc: "Create stunning charts and graphs from your Excel data",
                delay: "0s",
              },
              {
                icon: "🤖",
                title: "AI Insights",
                desc: "Get intelligent analysis and recommendations",
                delay: "0.2s",
              },
              {
                icon: "📈",
                title: "Advanced Analytics",
                desc: "Perform complex data analysis with ease",
                delay: "0.4s",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 lg:p-8 rounded-2xl transition-all duration-500 transform hover:scale-105 hover:rotate-1 group cursor-pointer backdrop-blur-sm border border-white/20"
                style={{
                  backgroundColor: "rgba(189, 232, 241, 0.2)",
                  boxShadow: "0 8px 32px rgba(189, 232, 241, 0.3)",
                  animationDelay: feature.delay,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(189, 232, 241, 0.4)";
                  e.currentTarget.style.transform =
                    "scale(1.05) translateY(-10px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(189, 232, 241, 0.2)";
                  e.currentTarget.style.transform = "scale(1) translateY(0)";
                }}
              >
                <div
                  className="text-4xl lg:text-5xl mb-4 lg:mb-6 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12"
                  style={{
                    filter: "drop-shadow(0 4px 8px rgba(34,139,34,0.1))",
                  }}
                >
                  {feature.icon}
                </div>
                <h3
                  className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 lg:mb-4 transition-colors duration-300"
                  style={{
                    color: "#0d0d0d",
                    fontFamily: "'Inter', system-ui, sans-serif",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  className="text-sm sm:text-base leading-relaxed"
                  style={{
                    color: "#819fa7",
                    fontFamily: "'Inter', system-ui, sans-serif",
                  }}
                >
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
