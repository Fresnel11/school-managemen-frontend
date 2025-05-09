import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { features } from '../../data/content';
import * as LucideIcons from 'lucide-react';

const FeaturesSection: React.FC = () => {
  const { language } = useLanguage();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  // Dynamic icon component rendering
  const IconComponent = ({ name }: { name: string }) => {
    const Icon = (LucideIcons[name as keyof typeof LucideIcons] as React.ElementType) || null;
    return Icon ? <Icon size={32} className="text-primary-500 dark:text-primary-400" /> : null;
  };

  return (
    <section 
      id="features" 
      className="py-20 md:py-28 px-4 bg-gray-50 dark:bg-gray-800"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white"
          >
            {language === 'en' ? 'Powerful Features' : 'Fonctionnalités Puissantes'}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            {language === 'en' 
              ? 'Everything you need to streamline school management in one platform' 
              : 'Tout ce dont vous avez besoin pour simplifier la gestion scolaire en une seule plateforme'}
          </motion.p>
        </div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden transition-all duration-300"
            >
              <div className="p-8">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mb-6">
                  <IconComponent name={feature.icon} />
                </div>
                <h3 className="text-xl font-heading font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title[language]}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description[language]}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;