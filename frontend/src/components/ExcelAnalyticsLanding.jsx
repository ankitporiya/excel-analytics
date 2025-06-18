import { useState, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef } from "react";

const ExcelAnalyticsLanding = () => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const ctaRef = useRef(null);
  
  const heroInView = useInView(heroRef, { once: true });
  const featuresInView = useInView(featuresRef, { once: true });
  const ctaInView = useInView(ctaRef, { once: true });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Cycle through features for mobile
    const interval = setInterval(() => {
      setCurrentFeature(prev => (prev + 1) % 6);
    }, 3000);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearInterval(interval);
    };
  }, []);

  const features = [
    {
      icon: "📤",
      title: "Upload Excel Files",
      description: "Drag & drop Excel files instantly",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: "📊",
      title: "Visualize Data",
      description: "Create stunning charts automatically",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: "⚙️",
      title: "Dynamic Axes",
      description: "Customize your data views",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: "🧠",
      title: "AI Insights",
      description: "Get intelligent recommendations",
      color: "from-pink-500 to-pink-600"
    },
    {
      icon: "🕓",
      title: "History Tracking",
      description: "Track all your analysis sessions",
      color: "from-indigo-500 to-indigo-600"
    },
    {
      icon: "📥",
      title: "Export Charts",
      description: "Save in multiple formats",
      color: "from-teal-500 to-teal-600"
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };



  const scaleHover = {
    scale: 1.05,
    y: -5,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  };

  const tapEffect = {
    scale: 0.95,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 17
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-transparent">
      {/* Animated Background Elements */}
      <motion.div 
        className="fixed inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-green-300 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>

    
      
      {/* Features Section */}
      <section ref={featuresRef} className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4" 
            style={{ color: "#228B22" }}
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            🚀 Powerful Features
          </motion.h2>
          <motion.p 
            className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto" 
            style={{ color: "#2d5a3d" }}
          >
            Everything you need to transform your Excel data into actionable insights
          </motion.p>
        </motion.div>

        {/* Features Grid - Responsive */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 md:gap-4 lg:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={featuresInView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group flex flex-col items-center cursor-pointer p-4"
              whileHover={scaleHover}
              whileTap={tapEffect}
            >
              <motion.div 
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-3xl flex items-center justify-center mb-4 shadow-lg"
                style={{ backgroundColor: "#228B22" }}
                
                animate="animate"
                whileHover={{
                  backgroundColor: "#1f4a1f",
                  boxShadow: "0 20px 40px rgba(34, 139, 34, 0.4)",
                  transition: { duration: 0.3 }
                }}
              >
                <motion.div 
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
                  whileHover={{ 
                    scale: 1.2,
                    rotate: [0, -10, 10, 0],
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {feature.icon}
                </motion.div>
              </motion.div>
              
              <motion.h3 
                className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-center transition-colors duration-300"
                style={{ color: "#228B22" }}
                whileHover={{ color: "#16a34a", scale: 1.05 }}
              >
                {feature.title}
              </motion.h3>
              
              <motion.p 
                className="text-xs sm:text-sm md:text-base text-gray-600 text-center mt-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
                initial={{ y: 10 }}
                whileHover={{ y: 0 }}
              >
                {feature.description}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </section>

    </div>
  );
};

export default ExcelAnalyticsLanding;



