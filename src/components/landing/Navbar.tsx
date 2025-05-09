import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, Moon, Sun, X, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { navItems } from '../../data/content';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-4 left-0 right-0 mx-auto w-[95%] md:w-[90%] max-w-7xl z-50 backdrop-blur-md rounded-xl transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 dark:bg-gray-900/80 shadow-lg'
          : 'bg-white/50 dark:bg-gray-900/50'
      }`}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0"
            >
              <span className="font-heading font-bold text-xl text-landingPrimary-600 dark:text-landingPrimary-400">
                EduManage
              </span>
            </motion.div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navItems.map((item) => (
                <motion.a
                  key={item.id}
                  href={item.href}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="font-medium text-gray-700 hover:text-landingPrimary-500 dark:text-gray-200 dark:hover:text-landingPrimary-400 px-3 py-2 rounded-md text-sm"
                >
                  {item.label[language]}
                </motion.a>
              ))}
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: '#e6f1ff' }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleLanguage}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-full border border-primary-200 bg-primary-50 text-primary-700 hover:bg-primary-100 dark:bg-primary-900 dark:text-primary-200 dark:border-primary-700 dark:hover:bg-primary-800 transition-all duration-200"
              aria-label="Toggle language"
            >
              <Globe size={18} />
              <span className="text-xs font-medium">{language.toUpperCase()}</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: '#e6f1ff' }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2 rounded-full border border-primary-200 bg-primary-50 text-primary-700 hover:bg-primary-100 dark:bg-primary-900 dark:text-primary-200 dark:border-primary-700 dark:hover:bg-primary-800 transition-all duration-200"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </motion.button>
            
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary-500 hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md text-sm transition-colors duration-200"
              >
                {language === 'en' ? 'Login' : 'Connexion'}
              </motion.button>
            </Link>
            
            <Link to="/register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-accent-500 hover:bg-accent-600 dark:bg-accent-600 dark:hover:bg-accent-700 text-white font-medium py-2 px-4 rounded-md text-sm transition-colors duration-200"
              >
                {language === 'en' ? 'Sign Up' : 'Inscription'}
              </motion.button>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: '#e6f1ff' }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleLanguage}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-full border border-landingPrimary-200 bg-landingPrimary-50 text-landingPrimary-700 hover:bg-landingPrimary-100 dark:bg-landingPrimary-900 dark:text-landingPrimary-200 dark:border-landingPrimary-700 dark:hover:bg-landingPrimary-800 transition-all duration-200"
              aria-label="Toggle language"
            >
              <Globe size={18} />
              <span className="text-xs font-medium">{language.toUpperCase()}</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: '#e6f1ff' }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2 rounded-full border border-landingPrimary-200 bg-landingPrimary-50 text-landingPrimary-700 hover:bg-landingPrimary-100 dark:bg-landingPrimary-900 dark:text-landingPrimary-200 dark:border-landingPrimary-700 dark:hover:bg-landingPrimary-800 transition-all duration-200"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleMobileMenuToggle}
              className="p-2 rounded-full text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-800"
              aria-label="Open menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white dark:bg-gray-900 rounded-b-xl shadow-lg"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-landingPrimary-500 hover:bg-gray-100 dark:text-gray-200 dark:hover:text-landingPrimary-400 dark:hover:bg-gray-800"
                onClick={handleMobileMenuToggle}
              >
                {item.label[language]}
              </a>
            ))}
            <Link to="/login">
              <div
                className="block w-full text-center mt-2 px-4 py-2 rounded-md text-base font-medium bg-landingPrimary-500 hover:bg-landingPrimary-600 dark:bg-landingPrimary-600 dark:hover:bg-landingPrimary-700 text-white"
                onClick={handleMobileMenuToggle}
              >
                {language === 'en' ? 'Login' : 'Connexion'}
              </div>
            </Link>
            <Link to="/register">
              <div
                className="block w-full text-center mt-2 px-4 py-2 rounded-md text-base font-medium bg-landingAccent-500 hover:bg-landingAccent-600 dark:bg-landingAccent-600 dark:hover:bg-landingAccent-700 text-white"
                onClick={handleMobileMenuToggle}
              >
                {language === 'en' ? 'Sign Up' : 'Inscription'}
              </div>
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;