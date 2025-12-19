import React, { useState } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Briefcase, LayoutDashboard, Settings, ClipboardCheck } from 'lucide-react';
import Landing from './pages/Landing';
import Booking from './pages/Booking';
import ProDashboard from './pages/ProDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ChatWidget from './components/ChatWidget';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home size={18} /> },
    { name: 'Book', path: '/booking', icon: <Briefcase size={18} /> },
    { name: 'Pro Panel', path: '/pro', icon: <LayoutDashboard size={18} /> },
    { name: 'Admin', path: '/admin', icon: <Settings size={18} /> },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-neon-blue/20">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center w-10 h-10 bg-stone-900 rounded-lg border border-stone-700 group-hover:border-neon-blue transition-colors">
             <ClipboardCheck className="text-neon-blue group-hover:scale-110 transition-transform duration-300" size={24} />
             <div className="absolute inset-0 bg-neon-blue/20 blur-lg rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-display font-black tracking-tighter text-white leading-none">
              VICTOR<span className="text-neon-blue group-hover:text-neon-green transition-colors duration-300">जी</span>
            </span>
            <span className="text-[0.65rem] font-mono tracking-[0.2em] text-stone-500 group-hover:text-white transition-colors mt-0.5">
              SERVICE FULFILLMENT
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className={`flex items-center gap-2 text-sm font-bold uppercase tracking-wider transition-colors ${location.pathname === link.path ? 'text-neon-blue drop-shadow-[0_0_5px_rgba(0,240,255,0.8)]' : 'text-stone-400 hover:text-white'}`}
            >
              {link.icon} {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-black border-b border-stone-800 absolute w-full left-0 top-full">
           <div className="flex flex-col p-6 gap-4">
             {navLinks.map((link) => (
               <Link 
                 key={link.name} 
                 to={link.path} 
                 onClick={() => setIsOpen(false)}
                 className="text-lg font-bold text-gray-300 hover:text-neon-blue flex items-center gap-3"
               >
                 {link.icon} {link.name}
               </Link>
             ))}
           </div>
        </div>
      )}
    </nav>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="bg-black text-white min-h-screen font-sans selection:bg-neon-blue selection:text-black">
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/pro" element={<ProDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
        <ChatWidget />
      </div>
    </HashRouter>
  );
};

export default App;