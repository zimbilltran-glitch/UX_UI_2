import React, { useState } from 'react';
import { Pencil, Star, ChevronDown, Info, Database, MoreHorizontal, X, Search, CheckCircle2 } from 'lucide-react';

const mockData = {
  PE: {
    trailing: {
      peers: [
        { ticker: "BID", name: "Commercial Bank for Investment and Development of Vietnam", value: 10.2, growth: "13.27%" },
        { ticker: "VPB", name: "Vietnam Prosperity Commercial Bank", value: 8.8, growth: "16.47%" },
        { ticker: "TCB", name: "Vietnam Technological and Commercial Bank", value: 8.8, growth: "15.92%" },
        { ticker: "MBB", name: "Military Commercial Bank", value: 8.0, growth: "16.69%", is_target: true },
        { ticker: "CTG", name: "Vietnam Commercial Bank for Industry and Trade", value: 8.0, growth: "10.30%" }
      ],
      peer_avg: 9.0,
      growth_label: "Earnings Growth"
    },
    forward: {
      peers: [
        { ticker: "BID", name: "Commercial Bank for Investment and Development of Vietnam", value: 10.7, growth: "13.27%" },
        { ticker: "VPB", name: "Vietnam Prosperity Commercial Bank", value: 7.2, growth: "16.47%" },
        { ticker: "TCB", name: "Vietnam Technological and Commercial Bank", value: 7.5, growth: "15.92%" },
        { ticker: "MBB", name: "Military Commercial Bank", value: 7.1, growth: "16.69%", is_target: true },
        { ticker: "CTG", name: "Vietnam Commercial Bank for Industry and Trade", value: 7.8, growth: "10.30%" }
      ],
      peer_avg: 8.3,
      growth_label: "Earnings Growth"
    }
  },
  PS: {
    trailing: {
      peers: [
        { ticker: "BID", name: "Commercial Bank for Investment and Development of Vietnam", value: 4.5, growth: "25.06%" },
        { ticker: "VPB", name: "Vietnam Prosperity Commercial Bank", value: 4.3, growth: "29.84%" },
        { ticker: "TCB", name: "Vietnam Technological and Commercial Bank", value: 4.6, growth: "19.34%" },
        { ticker: "MBB", name: "Military Commercial Bank", value: 4.0, growth: "25.57%", is_target: true },
        { ticker: "CTG", name: "Vietnam Commercial Bank for Industry and Trade", value: 4.0, growth: "26.21%" }
      ],
      peer_avg: 4.3,
      growth_label: "Sales Growth"
    },
    forward: {
      peers: [
        { ticker: "BID", name: "Commercial Bank for Investment and Development of Vietnam", value: 3.1, growth: "25.06%" },
        { ticker: "VPB", name: "Vietnam Prosperity Commercial Bank", value: 2.3, growth: "29.84%" },
        { ticker: "TCB", name: "Vietnam Technological and Commercial Bank", value: 3.7, growth: "19.34%" },
        { ticker: "MBB", name: "Military Commercial Bank", value: 2.6, growth: "25.57%", is_target: true },
        { ticker: "CTG", name: "Vietnam Commercial Bank for Industry and Trade", value: 2.8, growth: "26.21%" }
      ],
      peer_avg: 3.0,
      growth_label: "Sales Growth"
    }
  },
  PB: {
    trailing: {
      peers: [
        { ticker: "BID", name: "Commercial Bank for Investment and Development of Vietnam", value: 1.8, growth: "13.27%" },
        { ticker: "VPB", name: "Vietnam Prosperity Commercial Bank", value: 1.3, growth: "16.47%" },
        { ticker: "TCB", name: "Vietnam Technological and Commercial Bank", value: 1.3, growth: "15.92%" },
        { ticker: "MBB", name: "Military Commercial Bank", value: 1.6, growth: "16.69%", is_target: true },
        { ticker: "CTG", name: "Vietnam Commercial Bank for Industry and Trade", value: 1.6, growth: "10.30%" }
      ],
      peer_avg: 1.5,
      growth_label: "Earnings Growth"
    }
  }
};

export function RatioVsPeers() {
  const [metric, setMetric] = useState<'PE' | 'PS' | 'PB'>('PE');
  const [isForward, setIsForward] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLearnModalOpen, setIsLearnModalOpen] = useState(false);
  const [isEditPeersModalOpen, setIsEditPeersModalOpen] = useState(false);

  const currentData = mockData[metric][isForward && metric !== 'PB' ? 'forward' : 'trailing'];
  
  const metricNameMap = {
    PE: 'Price to Earnings',
    PS: 'Price to Sales',
    PB: 'Price to Book'
  };

  const metricLabel = metricNameMap[metric];
  const targetPeer = currentData.peers.find(p => p.is_target);
  const targetValue = targetPeer ? targetPeer.value : 0;
  
  // Calculate max value for chart scaling
  const maxValue = Math.max(...currentData.peers.map(p => p.value), currentData.peer_avg) * 1.2;

  return (
    <div className="mb-12 font-sans">
      <h2 className="text-2xl font-bold text-white mb-4">
        1.3 {metricLabel} Ratio vs Peers
      </h2>
      <p className="text-gray-300 mb-6">
        How does MBB's {metric} Ratio compare to its peers?
      </p>

      <div className="bg-[#111827] rounded-xl p-6 border border-gray-800 shadow-lg">
        
        {/* Top Controls */}
        <div className="flex justify-end mb-12 space-x-3 relative z-30">
          <button 
            onClick={() => setIsEditPeersModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-1.5 bg-transparent hover:bg-gray-800 text-white rounded-full text-sm border border-gray-600 transition-colors"
          >
            <Pencil className="w-4 h-4" />
            <span>Edit Peers</span>
          </button>
          
          <div className="relative">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 px-4 py-1.5 bg-transparent hover:bg-gray-800 text-white rounded-full text-sm border border-gray-600 transition-colors"
            >
              <Star className="w-4 h-4 text-yellow-500" fill="#eab308" />
              <span>{metricLabel}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#1F2937] border border-gray-700 rounded-lg shadow-xl z-50 py-1">
                {(['PE', 'PB', 'PS'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => { 
                      setMetric(m); 
                      if (m === 'PB') setIsForward(false);
                      setIsDropdownOpen(false); 
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    {metricNameMap[m]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Chart Area */}
        <div className="relative mb-8">
          {/* Background Zones */}
          <div className="absolute top-0 bottom-0 left-0 right-0 flex z-0 pr-[6rem]">
            {/* Left zone (undervalued) */}
            <div 
              className="h-full" 
              style={{ width: `${(currentData.peer_avg / maxValue) * 100}%` }}
            ></div>
            {/* Right zone (overvalued) - red stripes */}
            <div 
              className="h-full relative overflow-hidden" 
              style={{ width: `${(1 - currentData.peer_avg / maxValue) * 100}%` }}
            >
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #ef4444, #ef4444 2px, transparent 2px, transparent 8px)' }}></div>
            </div>
          </div>

          {/* Peer Avg Line */}
          <div 
            className="absolute top-0 bottom-0 w-px bg-yellow-500 z-10"
            style={{ left: `calc(${(currentData.peer_avg / maxValue) * 100}% - ${(currentData.peer_avg / maxValue) * 6}rem)` }}
          >
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded whitespace-nowrap">
              Peer Avg {currentData.peer_avg.toFixed(1)}x
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-yellow-500"></div>
            </div>
          </div>

          {/* Bars Container */}
          <div className="relative z-20 flex">
            <div className="flex-grow flex flex-col space-y-2 pr-4">
              {currentData.peers.map((peer, idx) => (
                <div key={idx} className="relative h-14 flex items-center">
                  {/* Bar */}
                  <div 
                    className={`absolute left-0 top-0 bottom-0 rounded-r-sm ${peer.is_target ? 'bg-[#262626] border border-gray-600' : 'bg-[#2ecc71]'}`}
                    style={{ width: `${(peer.value / maxValue) * 100}%` }}
                  ></div>
                  
                  {/* Label inside bar */}
                  <div className="relative z-30 px-3 flex flex-col justify-center h-full">
                    <span className="text-white font-bold text-sm">{peer.value}x</span>
                    {peer.is_target ? (
                      <span className="bg-[#fcd34d] text-black text-xs font-semibold px-1.5 py-0.5 rounded inline-block w-fit mt-0.5">
                        {peer.name}
                      </span>
                    ) : (
                      <span className="text-white text-xs truncate max-w-[300px] mt-0.5">
                        {peer.name}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Growth Column */}
            <div className="w-24 flex-shrink-0 flex flex-col space-y-2 border-l border-gray-600/50 pl-4 relative z-20">
              {/* Header for Growth */}
              <div className="absolute -top-8 left-4 text-gray-400 text-xs border-b border-dashed border-gray-500 pb-0.5">
                {currentData.growth_label.split(' ').map((word, i) => <div key={i}>{word}</div>)}
              </div>
              
              {currentData.peers.map((peer, idx) => (
                <div key={idx} className="h-14 flex items-center text-white text-sm font-medium">
                  {peer.growth}
                </div>
              ))}
            </div>
          </div>
          
          {/* X-axis labels */}
          <div className="flex mt-2 relative z-20">
            <div className="flex-grow flex justify-between text-gray-400 text-xs font-bold pr-4">
              <span>{metric}</span>
              <span>{Math.round(maxValue * 0.25)}</span>
              <span>{Math.round(maxValue * 0.5)}</span>
              <span>{Math.round(maxValue * 0.75)}</span>
              <span>{Math.round(maxValue)}</span>
            </div>
            <div className="w-24 flex-shrink-0 pl-4"></div>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="flex justify-between items-center mt-8 pt-4 border-t border-gray-800">
          <div className="flex items-center">
            {metric !== 'PB' && (
              <>
                <button 
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${isForward ? 'bg-[#eab308]' : 'bg-gray-600'}`}
                  onClick={() => setIsForward(!isForward)}
                >
                  <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${isForward ? 'translate-x-4' : 'translate-x-1'}`} />
                </button>
                <span className="ml-3 text-gray-400 text-sm font-medium">Forward {metric}</span>
              </>
            )}
          </div>

          <div className="flex space-x-2">
            <button className="flex items-center px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm font-medium rounded-md border border-gray-700 transition-colors">
              <Database className="w-4 h-4 mr-2" />
              Data
            </button>
            <button 
              onClick={() => setIsLearnModalOpen(true)}
              className="flex items-center px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm font-medium rounded-md border border-gray-700 transition-colors"
            >
              <Info className="w-4 h-4 mr-2" />
              Learn
            </button>
            <button className="flex items-center px-2 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-md border border-gray-700 transition-colors">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Audit Summary */}
        <div className="mt-6 flex items-start space-x-3 bg-transparent">
          <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
          <p className="text-gray-300 text-sm leading-relaxed">
            <span className="text-emerald-400 font-medium">{metricLabel} vs Peers:</span> MBB is good value based on its {metricLabel} ({targetValue}x) compared to the peer average ({currentData.peer_avg.toFixed(1)}x).
          </p>
        </div>
      </div>

      {/* Learn Modal */}
      {isLearnModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-xl w-full max-w-2xl overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-2xl font-serif font-bold text-gray-900">Preferred Ratio vs Peers</h3>
              <button onClick={() => setIsLearnModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 text-gray-800 space-y-6 text-base leading-relaxed">
              <p>Peers are the companies that are most similar to the company we are valuing. Arriving at a relevant list of peers includes things like what products they make or services they provide, but also things like their size, growth rates and structure of their income statement and balance sheets.</p>
              <p>Selecting a group of peers is a difficult task, requiring years of experience. Our peers algorithm gives you the power of that experience by selecting peers, using a range of data points.</p>
              <p className="pt-2">For a more detailed breakdown of how we compare stocks to their industry, please check out our <a href="#" className="text-[#d97706] hover:text-[#b45309] underline decoration-[#d97706]/30 underline-offset-4 transition-colors">Help Centre</a>.</p>
            </div>
            <div className="p-4 border-t border-gray-200 flex justify-end">
              <button 
                onClick={() => setIsLearnModalOpen(false)}
                className="px-4 py-2 bg-[#fde047] hover:bg-[#facc15] text-gray-900 font-medium rounded-md transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Peers Modal */}
      {isEditPeersModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-xl w-full max-w-2xl overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Edit Peers</h3>
              <button onClick={() => setIsEditPeersModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <p className="text-sm font-bold text-gray-900 mb-4">Change peers for HOSE:MBB</p>
              
              <div className="space-y-3 mb-6">
                {currentData.peers.filter(p => !p.is_target).map((peer, idx) => (
                  <div key={idx} className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-yellow-600" />
                    <input 
                      type="text" 
                      defaultValue={peer.name}
                      className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-200 hover:text-gray-400">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              
              <button className="text-yellow-600 text-sm font-medium hover:text-yellow-700">
                Reset to Default
              </button>
            </div>
            
            <div className="p-4 border-t border-gray-200 flex justify-end space-x-3 bg-gray-50">
              <button 
                onClick={() => setIsEditPeersModalOpen(false)}
                className="px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-md transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => setIsEditPeersModalOpen(false)}
                className="px-6 py-2 bg-[#fcd34d] hover:bg-[#fbbf24] text-gray-900 text-sm font-medium rounded-md transition-colors"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
