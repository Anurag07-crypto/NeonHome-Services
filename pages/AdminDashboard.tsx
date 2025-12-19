import React from 'react';
import { NeonCard, Badge } from '../components/ui/NeonComponents';
import { Map, Users, Activity, AlertTriangle } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 px-6 bg-black pb-12">
      <div className="max-w-[1400px] mx-auto">
        <h1 className="text-4xl font-display font-bold text-white mb-8">City<span className="text-neon-blue">Command</span></h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <NeonCard className="col-span-2 h-[500px] relative overflow-hidden !p-0" accent="blue">
               <div className="absolute inset-0 bg-stone-900">
                  {/* Mock Map Grid */}
                  <div className="w-full h-full grid grid-cols-12 grid-rows-8 gap-1 opacity-20">
                     {Array.from({ length: 96 }).map((_, i) => (
                       <div key={i} className="bg-neon-blue/20 rounded-sm"></div>
                     ))}
                  </div>
                  {/* Map Points */}
                  <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-neon-red rounded-full shadow-[0_0_15px_#ff003c] animate-pulse"></div>
                  <div className="absolute top-1/2 left-1/3 w-3 h-3 bg-neon-green rounded-full shadow-[0_0_10px_#0aff0a]"></div>
                  <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-neon-green rounded-full shadow-[0_0_10px_#0aff0a]"></div>
                  <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-neon-green rounded-full shadow-[0_0_10px_#0aff0a]"></div>
               </div>
               <div className="absolute top-4 left-4 bg-black/80 backdrop-blur border border-neon-blue p-4 rounded z-10">
                  <h3 className="text-neon-blue font-bold flex items-center gap-2"><Map size={16} /> Live Demand</h3>
                  <div className="mt-2 text-xs text-gray-400">
                     <div className="flex items-center gap-2"><div className="w-2 h-2 bg-neon-red rounded-full"></div> High Demand Area</div>
                     <div className="flex items-center gap-2"><div className="w-2 h-2 bg-neon-green rounded-full"></div> Active Pro</div>
                  </div>
               </div>
            </NeonCard>

            <div className="flex flex-col gap-6">
               <NeonCard accent="red" className="flex-1">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-neon-red"><AlertTriangle size={20} /> SLA Breaches</h3>
                  <div className="space-y-3">
                     <div className="p-3 bg-neon-red/10 border border-neon-red/30 rounded flex justify-between items-center">
                        <span className="text-sm text-white">#8829 - Cleaning</span>
                        <span className="text-xs text-neon-red font-bold">+12m Late</span>
                     </div>
                     <div className="p-3 bg-neon-red/10 border border-neon-red/30 rounded flex justify-between items-center">
                        <span className="text-sm text-white">#8831 - Plumber</span>
                        <span className="text-xs text-neon-red font-bold">+5m Late</span>
                     </div>
                  </div>
               </NeonCard>
               <NeonCard accent="green" className="flex-1">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-neon-green"><Activity size={20} /> System Health</h3>
                  <div className="space-y-2 text-sm text-gray-400">
                     <div className="flex justify-between"><span>Server Latency</span> <span className="text-white">12ms</span></div>
                     <div className="flex justify-between"><span>Active Users</span> <span className="text-white">1,204</span></div>
                     <div className="flex justify-between"><span>Verification Queue</span> <span className="text-white">3 Pending</span></div>
                  </div>
               </NeonCard>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;