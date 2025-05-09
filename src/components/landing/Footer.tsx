import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { footerContent } from '../../data/content';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  const { language } = useLanguage();
  
  const socialLinks = [
    { icon: Facebook, href: '#' },
    { icon: Twitter, href: '#' },
    { icon: Instagram, href: '#' },
    { icon: Linkedin, href: '#' },
    { icon: Youtube, href: '#' },
  ];

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white pt-16 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-heading font-bold text-primary-400 mb-4">
              {footerContent.company[language]}
            </h3>
            <p className="text-gray-400 max-w-md mb-4">
              {language === 'en'
                ? 'Empowering educational institutions with modern technology solutions to enhance management, teaching, and learning experiences.'
                : 'Donner aux établissements d\'enseignement des solutions technologiques modernes pour améliorer la gestion, l\'enseignement et les expériences d\'apprentissage.'}
            </p>
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ y: -3, color: '#0073ff' }}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    <Icon size={20} />
                  </motion.a>
                );
              })}
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              {language === 'en' ? 'Company' : 'Entreprise'}
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#about" className="text-gray-400 hover:text-white transition-colors duration-200">
                  {language === 'en' ? 'About Us' : 'À Propos de Nous'}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  {language === 'en' ? 'Careers' : 'Carrières'}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  {language === 'en' ? 'Blog' : 'Blog'}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  {language === 'en' ? 'Press' : 'Presse'}
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              {language === 'en' ? 'Resources' : 'Ressources'}
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  {language === 'en' ? 'Documentation' : 'Documentation'}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  {language === 'en' ? 'Help Center' : 'Centre d\'Aide'}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  {language === 'en' ? 'Tutorials' : 'Tutoriels'}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  {language === 'en' ? 'Webinars' : 'Webinaires'}
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            {footerContent.copyright[language]}
          </p>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            {footerContent.links.map((link, index) => (
              <a 
                key={index} 
                href={link.href}
                className="text-gray-500 hover:text-white text-sm transition-colors duration-200"
              >
                {link.label[language]}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;