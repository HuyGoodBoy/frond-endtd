import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
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
  
  const NavItem = ({ to, children }) => {
    const active = isActive(to);
    return (
      <Link
        to={to}
        className={`relative px-4 py-2 rounded-lg transition-all duration-300 ${
          active
            ? "text-white bg-gradient-to-r from-pink-600 to-pink-700"
            : "text-gray-600 hover:text-pink-600"
        }`}
      >
        {children}
      </Link>
    );
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div onClick={() => navigate("/")} className="cursor-pointer flex items-center space-x-2">
          <img src="./logo.png" alt="Logo" className="w-10 h-10 object-contain" />
          <span className="font-bold text-xl bg-gradient-to-r from-pink-600 to-pink-700 bg-clip-text text-transparent">
            TDCareerBoost
          </span>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-1">
          <NavItem to="/">Trang chủ</NavItem>
          <NavItem to="/cv-evaluation">Phân Tích CV</NavItem>
          <NavItem to="/jd-evaluation">Đánh Giá JD</NavItem>
          <NavItem to="/chat">Trợ Lý AI</NavItem>
          <NavItem to="/faq">Luyện Phỏng Vấn</NavItem>
          <NavItem to="/issue">Phản Hồi</NavItem>
        </div>
        
        {/* Mobile Menu Button */}
        <MobileMenuButton />
      </div>
    </nav>
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
          <MobileNavItem path="/cv-evaluation" label="Phân Tích CV" onClick={() => { navigate("/cv-evaluation"); setIsOpen(false); }} />
          <MobileNavItem path="/jd-evaluation" label="Đánh Giá JD" onClick={() => { navigate("/jd-evaluation"); setIsOpen(false); }} />
          <MobileNavItem path="/chat" label="Trợ Lý AI" onClick={() => { navigate("/chat"); setIsOpen(false); }} />
          <MobileNavItem path="/faq" label="Luyện Phỏng Vấn" onClick={() => { navigate("/faq"); setIsOpen(false); }} />
          <MobileNavItem path="/issue" label="Phản Hồi" onClick={() => { navigate("/issue"); setIsOpen(false); }} />
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
