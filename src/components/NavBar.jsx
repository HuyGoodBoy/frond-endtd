import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => {
    return location.pathname === path;
  };
  
  return (
    <nav className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div onClick={() => navigate("/")} className="cursor-pointer flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-800 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">TD</span>
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-indigo-800 bg-clip-text text-transparent">
            CareerBoost
          </span>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-1">
          <NavItem path="/" label="Trang chủ" isActive={isActive("/")} navigate={navigate} />
          <NavItem path="/cv-evaluation" label="CV Analyzer" isActive={isActive("/cv-evaluation")} navigate={navigate} />
          <NavItem path="/chat" label="Career Assistant" isActive={isActive("/chat")} navigate={navigate} />
          <NavItem path="/faq" label="Interview Prep" isActive={isActive("/faq")} navigate={navigate} />
          <NavItem path="/issue" label="Feedback" isActive={isActive("/issue")} navigate={navigate} />
        </div>
        
        {/* Mobile Menu Button */}
        <MobileMenuButton />
      </div>
    </nav>
  );
}

function NavItem({ path, label, isActive, navigate }) {
  return (
    <button 
      onClick={() => navigate(path)} 
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
        isActive 
          ? 'bg-gradient-to-r from-purple-600 to-indigo-800 text-white' 
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      {label}
    </button>
  );
}

function MobileMenuButton() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  
  return (
    <div className="md:hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="p-2 rounded-md text-gray-700 focus:outline-none"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>
      
      {/* Mobile dropdown menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-lg rounded-b-lg p-4 space-y-2 transition-all duration-200">
          <MobileNavItem path="/" label="Trang chủ" onClick={() => { navigate("/"); setIsOpen(false); }} />
          <MobileNavItem path="/cv-evaluation" label="CV Analyzer" onClick={() => { navigate("/cv-evaluation"); setIsOpen(false); }} />
          <MobileNavItem path="/chat" label="Career Assistant" onClick={() => { navigate("/chat"); setIsOpen(false); }} />
          <MobileNavItem path="/faq" label="Interview Prep" onClick={() => { navigate("/faq"); setIsOpen(false); }} />
          <MobileNavItem path="/issue" label="Feedback" onClick={() => { navigate("/issue"); setIsOpen(false); }} />
        </div>
      )}
    </div>
  );
}

function MobileNavItem({ label, onClick }) {
  return (
    <button 
      onClick={onClick} 
      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
    >
      {label}
    </button>
  );
}

export default NavBar;
