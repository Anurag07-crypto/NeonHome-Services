import React, { useState } from 'react';
import { NeonCard, Badge, NeonButton } from '../components/ui/NeonComponents';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { DollarSign, CheckCircle, Clock, RotateCcw } from 'lucide-react';

const initialData = [
  { name: 'Mon', jobs: 4, amt: 240 },
  { name: 'Tue', jobs: 3, amt: 180 },
  { name: 'Wed', jobs: 5, amt: 350 },
  { name: 'Thu', jobs: 7, amt: 500 },
  { name: 'Fri', jobs: 6, amt: 420 },
  { name: 'Sat', jobs: 9, amt: 700 },
  { name: 'Sun', jobs: 4, amt: 300 },
];

const ProDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    earnings: 2690,
    jobs: 38,
    avgResponse: '4m 20s',
    rating: 4.98
  });
  
  const [chartData, setChartData] = useState(initialData);

  const handleReset = () => {
    setStats({
      earnings: 0,
      jobs: 0,
      avgResponse: '0m 00s',
      rating: 0.00
    });
    setChartData(initialData.map(item => ({ ...item, jobs: 0, amt: 0 })));
  };

  return (
    <div className="min-h-screen pt-24 px-6 bg-black pb-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
           <h1 className="text-4xl font-display font-bold text-white">Pro<span className="text-neon-green">Panel</span></h1>
           <div className="flex items-center gap-4">
              <NeonButton 
                variant="secondary" 
                onClick={handleReset}
                className="!py-2 !px-4 flex items-center gap-2 text-sm"
              >
                <RotateCcw size={16} /> Reset Stats
              </NeonButton>
              <Badge variant="success">Verified Pro</Badge>
              <div className="w-10 h-10 rounded-full bg-stone-800 border border-neon-green shadow-[0_0_10px_#0aff0a] overflow-hidden">
                <img src="https://picsum.photos/100/100" alt="Pro" />
              </div>
           </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
           <div className="bg-stone-900/50 p-6 rounded-lg border border-stone-800">
              <div className="text-stone-400 text-sm mb-1 flex items-center gap-2"><DollarSign size={14} /> Earnings (Week)</div>
              <div className="text-3xl font-mono text-neon-green font-bold">
                ${stats.earnings.toLocaleString()}
              </div>
           </div>
           <div className="bg-stone-900/50 p-6 rounded-lg border border-stone-800">
              <div className="text-stone-400 text-sm mb-1 flex items-center gap-2"><CheckCircle size={14} /> Jobs Done</div>
              <div className="text-3xl font-mono text-white font-bold">{stats.jobs}</div>
           </div>
           <div className="bg-stone-900/50 p-6 rounded-lg border border-stone-800">
              <div className="text-stone-400 text-sm mb-1 flex items-center gap-2"><Clock size={14} /> Avg Response</div>
              <div className="text-3xl font-mono text-neon-blue font-bold">{stats.avgResponse}</div>
           </div>
           <div className="bg-stone-900/50 p-6 rounded-lg border border-stone-800">
              <div className="text-stone-400 text-sm mb-1 flex items-center gap-2">Rating</div>
              <div className="text-3xl font-mono text-yellow-400 font-bold">{stats.rating.toFixed(2)}</div>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chart */}
          <NeonCard className="lg:col-span-2 h-[400px]">
            <h3 className="text-xl font-bold mb-6 text-white">Performance Heatmap</h3>
            <ResponsiveContainer width="100%" height="80%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#000', borderColor: '#333' }}
                  itemStyle={{ color: '#00f0ff' }}
                />
                <Bar dataKey="amt" fill="#00f0ff" barSize={30} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </NeonCard>

          {/* Upcoming Jobs */}
          <NeonCard accent="red">
            <h3 className="text-xl font-bold mb-6 text-white">Instant Alerts</h3>
            <div className="space-y-4">
               {[1, 2, 3].map(i => (
                 <div key={i} className="p-4 bg-stone-900 border border-stone-700 rounded-lg hover:border-neon-red transition-colors cursor-pointer group">
                    <div className="flex justify-between items-start mb-2">
                       <span className="font-bold text-white group-hover:text-neon-red transition-colors">AC Repair - Urgent</span>
                       <span className="text-xs text-neon-red border border-neon-red/30 px-1 rounded animate-pulse">LIVE</span>
                    </div>
                    <p className="text-stone-400 text-sm mb-3">Unit 402, Neo-Tokyo Tower...</p>
                    <NeonButton variant="danger" glow={false} className="w-full py-2 text-sm">Accept Job</NeonButton>
                 </div>
               ))}
            </div>
          </NeonCard>
        </div>
      </div>
    </div>
  );
};

export default ProDashboard;