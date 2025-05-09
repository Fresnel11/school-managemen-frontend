import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { aboutContent } from '../../data/content';

const AboutSection: React.FC = () => {
  const { language } = useLanguage();
  
   // État pour les compteurs animés
   const [counters, setCounters] = useState<number[]>([0, 0, 0]);

   // Fonction pour parser les valeurs et extraire le nombre et le suffixe
  const parseStatValue = (value: string): { number: number; suffix: string } => {
    const match = value.match(/^([\d,]+)(\D*)$/);
    if (match) {
      const number = parseInt(match[1].replace(/,/g, ''), 10);
      const suffix = match[2] || '';
      return { number, suffix };
    }
    return { number: 0, suffix: '' };
  };
  
   // Animation des compteurs
   useEffect(() => {
    const duration = 2000; // Durée de l'animation en ms
    const steps = 60; // Nombre d'étapes pour une animation fluide
    const incrementTime = duration / steps;

    const intervals = aboutContent.stats.map((stat, index) => {
      const { number } = parseStatValue(stat.value);
      const increment = number / steps;
      let current = 0;

      const interval = setInterval(() => {
        current += increment;
        if (current >= number) {
          current = number;
          clearInterval(interval);
        }
        setCounters((prev) => {
          const newCounters = [...prev];
          newCounters[index] = Math.round(current);
          return newCounters;
        });
      }, incrementTime);

      return interval;
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  // Formatage des nombres pour l'affichage
  const formatCounter = (index: number): string => {
    const { number, suffix } = parseStatValue(aboutContent.stats[index].value);
    const current = counters[index];
    if (current >= number) {
      return aboutContent.stats[index].value; // Retourne la valeur originale (ex: "50,000+")
    }
    if (index === 1) {
      // Format avec virgules pour "50,000+"
      return Math.round(current).toLocaleString('en-US') + suffix;
    }
    return Math.round(current) + suffix;
  };

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
      id="about" 
      className="py-20 md:py-28 px-4 bg-white dark:bg-gray-900"
    >
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div variants={itemVariants}>
            <div className="relative">
              <div className="absolute -inset-4 bg-primary-100 dark:bg-primary-900/30 rounded-xl transform rotate-3"></div>
              <div className="absolute -inset-4 bg-secondary-100 dark:bg-secondary-900/30 rounded-xl transform -rotate-3"></div>
              <img 
                src="https://images.pexels.com/photos/8617557/pexels-photo-8617557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Teacher helping students" 
                className="relative rounded-lg shadow-xl w-full h-auto z-10"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent-100 dark:bg-accent-900/30 rounded-full z-0"></div>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="flex flex-col">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white">
              {aboutContent.title[language]}
            </h2>
            
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {aboutContent.description[language]}
            </p>
            
            <div className="mt-12 grid grid-cols-3 gap-6">
              {aboutContent.stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center shadow-md"
                >
                  <span className="block text-3xl font-bold text-primary-600 dark:text-primary-400">
                    {formatCounter(index)}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 mt-2 block">
                    {stat.label[language]}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;