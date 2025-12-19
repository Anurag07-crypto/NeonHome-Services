import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShieldCheck, Zap, Clock, Star, Wrench, Droplet, Paintbrush, Home, Wind, Bug } from 'lucide-react';
import { NeonButton, NeonCard, Badge } from '../components/ui/NeonComponents';
import { Link } from 'react-router-dom';

const services = [
  { icon: <Droplet className="w-8 h-8" />, name: "Cleaning", desc: "Deep home sterilization", accent: 'blue' as const },
  { icon: <Wrench className="w-8 h-8" />, name: "Plumbing", desc: "Leak fixes & installs", accent: 'red' as const },
  { icon: <Zap className="w-8 h-8" />, name: "Electrician", desc: "Wiring & safety checks", accent: 'green' as const },
  { icon: <Paintbrush className="w-8 h-8" />, name: "Painting", desc: "AR-preview walls", accent: 'blue' as const },
  { icon: <Wind className="w-8 h-8" />, name: "AC Repair", desc: "Cooling optimization", accent: 'blue' as const },
  { icon: <Bug className="w-8 h-8" />, name: "Pest Control", desc: "Safety-first removal", accent: 'red' as const },
];

const Landing: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, 100]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-stone-900 via-black to-black -z-10" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 -z-10"></div>
      
      {/* Hero Section */}
      <section className="h-screen flex flex-col justify-center items-center relative px-6 text-center">
        <motion.div 
          style={{ opacity, y }}
          className="max-w-4xl z-10"
        >
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 inline-block"
          >
            <span className="px-4 py-2 rounded-full bg-stone-900/60 border border-neon-blue/30 text-[10px] md:text-xs font-mono tracking-[0.3em] text-neon-blue uppercase backdrop-blur-md shadow-[0_0_15px_rgba(0,240,255,0.15)]">
              The Future of Service
            </span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-display font-black mb-6 leading-tight tracking-tight">
              BOOK TRUSTED <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-green drop-shadow-[0_0_10px_rgba(0,240,255,0.4)]">HOME SERVICES</span>
              <br /> INSTANTLY.
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto font-light"
          >
            Reinvented for your city. Verify pros instantly. Preview changes with AR. 
            <span className="text-neon-red font-medium ml-2"> <Zap className="inline w-4 h-4" /> 30-min arrival guarantee.</span>
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col md:flex-row gap-6 justify-center"
          >
            <Link to="/booking">
              <NeonButton variant="success" className="min-w-[200px]">Book Now</NeonButton>
            </Link>
            <a href="#services">
              <NeonButton variant="primary" className="min-w-[200px]">Explore Services</NeonButton>
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-6 relative z-10 bg-black/50 backdrop-blur-sm border-t border-stone-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12 border-b border-stone-800 pb-4">
            <div>
              <h2 className="text-4xl font-display font-bold text-white mb-2">Our Services</h2>
              <p className="text-gray-400">Premium care for your futuristic home.</p>
            </div>
            <div className="hidden md:block text-neon-blue font-mono text-sm">
              SYSTEM STATUS: <span className="text-neon-green animate-pulse">OPERATIONAL</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <NeonCard key={i} accent={s.accent} className="h-full flex flex-col justify-between">
                <div>
                  <div className={`mb-4 ${s.accent === 'red' ? 'text-neon-red' : s.accent === 'green' ? 'text-neon-green' : 'text-neon-blue'}`}>
                    {s.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-2 font-display">{s.name}</h3>
                  <p className="text-gray-400 text-sm">{s.desc}</p>
                </div>
                <div className="mt-6 flex justify-between items-center">
                  <Badge variant={s.accent === 'green' ? 'success' : s.accent === 'red' ? 'alert' : 'info'}>
                    Available Now
                  </Badge>
                  <Link to={`/booking?service=${s.name}`} className="text-gray-300 hover:text-white transition-colors text-sm uppercase tracking-widest font-bold">
                    Select &rarr;
                  </Link>
                </div>
              </NeonCard>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 bg-stone-900/30">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-8 border border-stone-800 rounded-2xl hover:border-neon-green transition-colors group">
              <div className="mx-auto w-16 h-16 bg-stone-800 rounded-full flex items-center justify-center mb-6 text-neon-green group-hover:scale-110 transition-transform">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Digital ID Verification</h3>
              <p className="text-gray-400 text-sm">Every pro is multi-layer KYC verified. Digital badges ensure you know who enters your home.</p>
            </div>
            <div className="p-8 border border-stone-800 rounded-2xl hover:border-neon-red transition-colors group">
              <div className="mx-auto w-16 h-16 bg-stone-800 rounded-full flex items-center justify-center mb-6 text-neon-red group-hover:scale-110 transition-transform">
                <Clock size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Instant SLA</h3>
              <p className="text-gray-400 text-sm">We guarantee arrival within selected slots or you get 50% cashback instantly.</p>
            </div>
            <div className="p-8 border border-stone-800 rounded-2xl hover:border-neon-blue transition-colors group">
              <div className="mx-auto w-16 h-16 bg-stone-800 rounded-full flex items-center justify-center mb-6 text-neon-blue group-hover:scale-110 transition-transform">
                <Star size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Loyalty Protocol</h3>
              <p className="text-gray-400 text-sm">Earn Neon Points on every booking. Redeem for service bundles and smart home upgrades.</p>
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-stone-800 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-2xl font-display font-black text-white">VICTOR<span className="text-neon-blue">जी</span></div>
          <div className="text-gray-500 text-sm">© 2024 Victor जी Inc. Service Fulfilled.</div>
          <div className="flex gap-4">
             <div className="w-8 h-8 rounded bg-stone-800 hover:bg-neon-blue hover:text-black flex items-center justify-center transition-colors cursor-pointer">IG</div>
             <div className="w-8 h-8 rounded bg-stone-800 hover:bg-neon-blue hover:text-black flex items-center justify-center transition-colors cursor-pointer">X</div>
             <div className="w-8 h-8 rounded bg-stone-800 hover:bg-neon-blue hover:text-black flex items-center justify-center transition-colors cursor-pointer">LN</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;