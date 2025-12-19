import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NeonButton, NeonCard, Badge } from '../components/ui/NeonComponents';
import { Check, Calendar, MapPin, User, Box, ArrowRight, ArrowLeft } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

const steps = ['Service', 'Details', 'AR Preview', 'Confirm'];

const Booking: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState(0);
  
  // Form State
  const [selectedService, setSelectedService] = useState(searchParams.get('service') || '');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [address, setAddress] = useState('');
  const [arActive, setArActive] = useState(false);

  // Sync state with URL param changes if necessary
  useEffect(() => {
    const s = searchParams.get('service');
    if (s && s !== selectedService) {
      setSelectedService(s);
    }
  }, [searchParams]);

  const isNextDisabled = () => {
    if (currentStep === 0) return !selectedService;
    if (currentStep === 1) return !date || !time || !address.trim();
    return false;
  };

  const nextStep = () => {
    if (isNextDisabled()) return; // Strict validation guard
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  };
  
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const renderStepContent = () => {
    switch(currentStep) {
      case 0:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['Deep Clean', 'AC Service', 'Pipe Fix', 'Wall Paint'].map(s => (
              <div 
                key={s}
                // Allow toggling selection by clicking again
                onClick={() => setSelectedService(selectedService === s ? '' : s)}
                className={`p-6 border rounded-xl cursor-pointer transition-all ${selectedService === s ? 'border-neon-green bg-neon-green/10 shadow-[0_0_15px_rgba(10,255,10,0.2)]' : 'border-stone-700 hover:border-stone-500 bg-stone-900'}`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-display font-bold text-lg">{s}</span>
                  {selectedService === s && <Check className="text-neon-green" />}
                </div>
              </div>
            ))}
          </div>
        );
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Date & Time</label>
              <div className="grid grid-cols-3 gap-2">
                 {['Today', 'Tomorrow', 'Sat 24'].map(d => (
                   <button 
                     key={d} 
                     onClick={() => setDate(d)}
                     className={`p-3 border rounded transition-all text-sm font-medium ${date === d ? 'border-neon-blue bg-neon-blue/20 text-white shadow-[0_0_10px_rgba(0,240,255,0.3)]' : 'border-stone-700 hover:border-neon-blue/50 text-stone-400'}`}
                   >
                     {d}
                   </button>
                 ))}
              </div>
              <div className="grid grid-cols-4 gap-2 mt-2">
                 {['10:00', '12:00', '14:00', '16:00'].map(t => (
                   <button 
                    key={t} 
                    onClick={() => setTime(t)}
                    className={`p-2 border rounded text-xs transition-all ${time === t ? 'border-neon-green bg-neon-green/20 text-white shadow-[0_0_10px_rgba(10,255,10,0.3)]' : 'bg-stone-900 border-stone-800 text-stone-500 hover:border-neon-red hover:text-white'}`}
                   >
                     {t}
                   </button>
                 ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
               <label className="text-sm text-gray-400">Address</label>
               <input 
                 type="text" 
                 value={address}
                 onChange={(e) => setAddress(e.target.value)}
                 placeholder="Enter street address" 
                 className="bg-transparent border border-stone-700 p-3 rounded text-white focus:border-neon-blue outline-none transition-colors" 
               />
            </div>
          </div>
        );
      case 2:
        return (
           <div className="flex flex-col items-center justify-center min-h-[300px]">
             {!arActive ? (
               <div className="text-center">
                 <Box size={64} className="text-neon-blue mx-auto mb-4 animate-bounce" />
                 <h3 className="text-xl font-bold mb-2">Initialize AR Preview?</h3>
                 <p className="text-gray-400 mb-6 text-sm">Visualize the service outcome in your space using your camera.</p>
                 <NeonButton onClick={() => setArActive(true)}>Launch AR Module</NeonButton>
               </div>
             ) : (
               <div className="relative w-full h-64 bg-stone-900 rounded-xl overflow-hidden border border-neon-blue/50 flex items-center justify-center">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80')] bg-cover opacity-30" />
                  <div className="w-32 h-32 border-2 border-neon-green rounded-lg animate-[spin_5s_linear_infinite] shadow-[0_0_20px_#0aff0a] flex items-center justify-center backdrop-blur-sm">
                    <span className="text-neon-green font-mono text-xs">SCANNING...</span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 bg-black/80 p-2 rounded text-xs text-center border border-neon-blue">
                    Simulating {selectedService || 'Service'} Result...
                  </div>
               </div>
             )}
           </div>
        );
      case 3:
        return (
          <div className="space-y-4">
             <div className="p-4 bg-stone-900 rounded border border-stone-800 flex justify-between items-center">
                <span className="text-gray-400">Service</span>
                <span className="font-bold text-white">{selectedService || 'General Service'}</span>
             </div>
             <div className="p-4 bg-stone-900 rounded border border-stone-800">
                <div className="flex justify-between items-center mb-1">
                   <span className="text-gray-400">Date & Time</span>
                   <span className="font-bold text-white text-sm">{date} @ {time}</span>
                </div>
                <div className="flex justify-between items-center">
                   <span className="text-gray-400">Address</span>
                   <span className="font-bold text-white text-sm truncate max-w-[200px]">{address}</span>
                </div>
             </div>
             <div className="p-4 bg-stone-900 rounded border border-stone-800 flex justify-between items-center">
                <span className="text-gray-400">Total</span>
                <span className="font-bold text-neon-green text-xl">$89.00</span>
             </div>
             <div className="p-4 bg-neon-blue/5 rounded border border-neon-blue/20">
                <div className="flex items-center gap-2 mb-2">
                   <User size={16} className="text-neon-blue" />
                   <span className="text-sm font-bold text-neon-blue">Pro Assigned: Alex K.</span>
                </div>
                <div className="text-xs text-gray-500">Verified ID • 4.98 Rating • 500+ Jobs</div>
             </div>
          </div>
        );
      default: return null;
    }
  }

  return (
    <div className="min-h-screen pt-24 px-6 bg-black flex items-center justify-center">
      <div className="max-w-2xl w-full">
        {/* Progress Bar */}
        <div className="flex justify-between mb-8 relative">
           <div className="absolute top-1/2 left-0 w-full h-0.5 bg-stone-800 -z-10" />
           {steps.map((s, i) => (
             <div key={s} className="flex flex-col items-center bg-black px-2">
               <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 text-sm font-bold mb-2 transition-colors ${i <= currentStep ? 'border-neon-blue text-neon-blue bg-neon-blue/10 shadow-[0_0_10px_rgba(0,240,255,0.4)]' : 'border-stone-700 text-stone-500'}`}>
                 {i + 1}
               </div>
               <span className={`text-xs uppercase tracking-wider ${i <= currentStep ? 'text-white' : 'text-stone-600'}`}>{s}</span>
             </div>
           ))}
        </div>

        <NeonCard className="min-h-[400px]">
          <div className="mb-6">
             <h2 className="text-3xl font-display font-bold text-white">{steps[currentStep]}</h2>
             <p className="text-stone-400 text-sm">Step {currentStep + 1} of {steps.length}</p>
          </div>

          <motion.div
             key={currentStep}
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             exit={{ opacity: 0, x: -20 }}
             transition={{ duration: 0.3 }}
          >
            {renderStepContent()}
          </motion.div>

          <div className="mt-8 flex justify-between">
            <button 
              onClick={prevStep} 
              disabled={currentStep === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded transition-colors ${currentStep === 0 ? 'text-stone-700 cursor-not-allowed' : 'text-stone-300 hover:text-white'}`}
            >
              <ArrowLeft size={16} /> Back
            </button>
            
            {currentStep === steps.length - 1 ? (
               <NeonButton variant="success" className="w-full md:w-auto" onClick={() => alert("Booking Confirmed! The pro is on their way.")}>
                 Confirm & Pay
               </NeonButton>
            ) : (
              <NeonButton 
                variant="primary" 
                className="w-full md:w-auto flex items-center gap-2 justify-center" 
                onClick={nextStep} 
                disabled={isNextDisabled()}
              >
                 Next Step <ArrowRight size={16} />
              </NeonButton>
            )}
          </div>
        </NeonCard>
      </div>
    </div>
  );
};

export default Booking;