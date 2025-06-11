import React, { useState, useEffect } from 'react';
import { NAV_LINKS, SECTION_IDS } from '../constants';
import { NavLink, UserInfo } from '../types';
import { MenuIcon, XIcon } from './icons/MenuIcons'; 
import { LogoutIcon } from './icons/LogoutIcon'; // Create this icon

interface NavbarProps {
  onToggleAdmin: () => void;
  userInfo: UserInfo;
  isAuthenticated: boolean;
  onLogout: () => void;
  isProjectDetailView?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleAdmin, userInfo, isAuthenticated, onLogout, isProjectDetailView }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (isProjectDetailView && href === `#${SECTION_IDS.HOME}`) {
      window.location.hash = `#${SECTION_IDS.HOME}`; // Navigate to main view then scroll
    } else if (isProjectDetailView) {
      window.location.hash = href; // will trigger view change and then scroll
    }
    else {
      const targetId = href.substring(1); 
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };
  
  const handleAdminAction = () => {
    onToggleAdmin();
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  }

  const handleLogoutAction = () => {
    onLogout();
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  }

  const navClass = isScrolled || isProjectDetailView
    ? 'bg-ui-bg/90 backdrop-blur-sm shadow-lg py-3 text-dark-text' 
    : 'bg-transparent py-5 text-light-text';
  const linkClass = isScrolled || isProjectDetailView 
    ? 'text-dark-text hover:text-primary' 
    : 'text-light-text hover:text-secondary';
  const mobileMenuBgClass = isScrolled || isProjectDetailView ? 'bg-ui-bg' : 'bg-accent/95 backdrop-blur-sm';


  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${navClass}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a 
          href={`#${SECTION_IDS.HOME}`}
          onClick={(e) => smoothScroll(e, `#${SECTION_IDS.HOME}`)} 
          className={`text-3xl font-bold font-serif ${isScrolled || isProjectDetailView ? 'text-primary' : 'text-white'}`}
          aria-label="Home"
        >
          {userInfo.name.split(' ')[0]}
        </a>
        <div className="hidden md:flex items-center space-x-6">
          {NAV_LINKS.map((link: NavLink) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => smoothScroll(e, link.href)}
              className={`font-medium text-sm tracking-wide ${linkClass} transition-colors duration-200`}
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={handleAdminAction}
            className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200 ${isScrolled || isProjectDetailView ? 'bg-primary text-white hover:bg-green-500' : 'bg-secondary text-dark-text hover:bg-amber-500'}`}
          >
            {isAuthenticated ? 'Admin Panel' : 'Admin Login'}
          </button>
          {isAuthenticated && (
            <button
              onClick={handleLogoutAction}
              title="Logout"
              className={`p-2 rounded-lg transition-colors duration-200 ${isScrolled || isProjectDetailView ? 'text-primary hover:bg-primary/10' : 'text-secondary hover:bg-secondary/20'}`}
            >
              <LogoutIcon className="w-5 h-5" />
            </button>
          )}
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`focus:outline-none p-2 rounded-md ${linkClass}`}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <XIcon className="w-7 h-7" /> : <MenuIcon className="w-7 h-7" />}
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className={`md:hidden absolute top-full left-0 w-full ${mobileMenuBgClass} shadow-xl py-2`}>
          {NAV_LINKS.map((link: NavLink) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => smoothScroll(e, link.href)}
              className={`block px-6 py-3 text-center font-medium ${linkClass} hover:bg-primary/20 transition-colors duration-200`}
            >
              {link.name}
            </a>
          ))}
          <div className="px-6 py-3">
            <button
              onClick={handleAdminAction}
              className={`w-full text-sm font-medium px-4 py-3 rounded-lg mb-2 transition-colors duration-200 ${isScrolled || isProjectDetailView ? 'bg-primary text-white hover:bg-green-500' : 'bg-secondary text-dark-text hover:bg-amber-500'}`}
            >
              {isAuthenticated ? 'Admin Panel' : 'Admin Login'}
            </button>
            {isAuthenticated && (
              <button
                onClick={handleLogoutAction}
                className={`w-full text-sm font-medium px-4 py-3 rounded-lg transition-colors duration-200 ${(isScrolled || isProjectDetailView) ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-red-400 text-dark-text hover:bg-red-500'}`}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;