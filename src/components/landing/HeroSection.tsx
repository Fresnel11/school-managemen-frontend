import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { heroContent } from '../../data/content';
import { ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  const { language } = useLanguage();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section 
      id="home" 
      className="pt-32 pb-20 md:pt-40 md:pb-28 px-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800"
    >
      <motion.div
        className="max-w-7xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gray-900 dark:text-white leading-tight"
        >
          {heroContent.title[language]}
        </motion.h1>
        
        <motion.p
          variants={itemVariants}
          className="mt-6 text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
        >
          {heroContent.subtitle[language]}
        </motion.p>
        
        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-primary-500 hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700 text-white font-medium rounded-lg text-lg shadow-lg shadow-primary-500/30 dark:shadow-primary-700/30 flex items-center justify-center group"
          >
            {heroContent.cta.primary[language]}
            <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 font-medium rounded-lg text-lg border-2 border-primary-500 dark:border-primary-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            {heroContent.cta.secondary[language]}
          </motion.button>
        </motion.div>
        
        <motion.div
          variants={itemVariants}
          className="mt-16"
        >
          <div className="relative w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.pexels.com/photos/4144294/pexels-photo-4144294.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              alt="School management system dashboard" 
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;