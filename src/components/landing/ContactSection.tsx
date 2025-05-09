import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { contactContent } from '../../data/content';
import { Mail, MessageSquare, Phone, MapPin, Send } from 'lucide-react';

const ContactSection: React.FC = () => {
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
      id="contact" 
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
            {contactContent.title[language]}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            {contactContent.subtitle[language]}
          </motion.p>
        </div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid md:grid-cols-2 gap-12"
        >
          {/* Contact Form */}
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8"
          >
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {contactContent.form.name.label[language]}
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder={contactContent.form.name.placeholder[language]}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {contactContent.form.email.label[language]}
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder={contactContent.form.email.placeholder[language]}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {contactContent.form.message.label[language]}
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder={contactContent.form.message.placeholder[language]}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
                ></textarea>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3 px-6 bg-primary-500 hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700 text-white font-medium rounded-lg shadow-md transition-colors duration-200 flex items-center justify-center"
              >
                {contactContent.form.submit[language]}
                <Send size={18} className="ml-2" />
              </motion.button>
            </form>
          </motion.div>
          
          {/* Contact Information */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                {language === 'en' ? 'Contact Information' : 'Informations de Contact'}
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mr-4">
                    <Mail size={20} className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {language === 'en' ? 'Email' : 'Courriel'}
                    </h4>
                    <p className="mt-1 text-gray-900 dark:text-white">info@edumanage.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mr-4">
                    <Phone size={20} className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {language === 'en' ? 'Phone' : 'Téléphone'}
                    </h4>
                    <p className="mt-1 text-gray-900 dark:text-white">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mr-4">
                    <MapPin size={20} className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {language === 'en' ? 'Office' : 'Bureau'}
                    </h4>
                    <p className="mt-1 text-gray-900 dark:text-white">
                      {language === 'en' 
                        ? '123 Education Street, Suite 400, Tech City, CA 94103'
                        : '123 Rue de l\'Éducation, Suite 400, Ville Tech, CA 94103'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mr-4">
                    <MessageSquare size={20} className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {language === 'en' ? 'Support Hours' : 'Heures de Support'}
                    </h4>
                    <p className="mt-1 text-gray-900 dark:text-white">
                      {language === 'en' 
                        ? 'Monday - Friday, 9am - 6pm EST'
                        : 'Lundi - Vendredi, 9h - 18h EST'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                {language === 'en' ? 'Schedule a Demo' : 'Planifier une Démo'}
              </h3>
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="#"
                className="block w-full py-3 px-6 bg-secondary-500 hover:bg-secondary-600 dark:bg-secondary-600 dark:hover:bg-secondary-700 text-white font-medium rounded-lg shadow-md text-center transition-colors duration-200"
              >
                {language === 'en' ? 'Book a Free Demo' : 'Réserver une Démo Gratuite'}
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;