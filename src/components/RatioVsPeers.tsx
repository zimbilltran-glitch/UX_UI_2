import React, { useState, useMemo } from 'react';
import { Pencil, Star, ChevronDown, Info, Database, MoreHorizontal, X, Search, CheckCircle2 } from 'lucide-react';

const metricNameMap = {
  PE: 'Price to Earnings',
  PS: 'Price to Sales',
  PB: 'Price to Book'
} as const;

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
  
  const metricLabel = metricNameMap[metric];
  const targetPeer = useMemo(() => currentData.peers.find(p => p.is_target), [currentData]);
  const targetValue = targetPeer ? targetPeer.value : 0;
  
  // Calculate max value for chart scaling
  const maxValue = useMemo(() => Math.max(...currentData.peers.map(p => p.value), currentData.peer_avg) * 1.2, [currentData]);

  return (
    <div className="mb-12 font-sans">
      <h2 className="text-2xl font-bold text-primary mb-4">
        1.3 {metricLabel} Ratio vs Peers
      </h2>
      <p className="text-secondary mb-6">
        How does MBB's {metric} Ratio compare to its peers?
      </p>

      <div className="bg-card rounded-xl p-6 border border-subtle shadow-lg">
        
        {/* Top Controls */}
        <div className="flex justify-end mb-12 space-x-3 relative z-30">
          <button 
            onClick={() => setIsEditPeersModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-1.5 bg-transparent hover:bg-subtle text-primary rounded-full text-sm border border-subtle transition-colors"
          >
            <Pencil className="w-4 h-4" />
            <span>Edit Peers</span>
          </button>
          
          <div className="relative">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 px-4 py-1.5 bg-transparent hover:bg-subtle text-primary rounded-full text-sm border border-subtle transition-colors"
            >
              <Star className="w-4 h-4 text-yellow-500" fill="#eab308" />
              <span>{metricLabel}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-card border border-subtle rounded-lg shadow-xl z-50 py-1">
                {(['PE', 'PB', 'PS'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => { 
                      setMetric(m); 
                      if (m === 'PB') setIsForward(false);
                      setIsDropdownOpen(false); 
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-secondary hover:bg-subtle hover:text-primary"
                  >
                    {metricNameMap[m]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Chart Area */}
        <div className="overflow-x-auto">
          <div className="relative mb-8 min-w-[600px]">
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
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-yellow-500 text-primary text-xs font-bold px-2 py-1 rounded whitespace-nowrap">
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
                      className={`absolute left-0 top-0 bottom-0 rounded-r-sm ${peer.is_target ? 'bg-card border border-subtle' : 'bg-[#2ecc71]'}`}
                      style={{ width: `${(peer.value / maxValue) * 100}%` }}
                    ></div>
                    
                    {/* Label inside bar */}
                    <div className="relative z-30 px-3 flex flex-col justify-center h-full">
                      <span className={`font-bold text-sm ${peer.is_target ? 'text-primary' : 'text-white'}`}>{peer.value}x</span>
                      {peer.is_target ? (
                        <span className="bg-[#fcd34d] text-primary text-xs font-semibold px-1.5 py-0.5 rounded inline-block w-fit mt-0.5">
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
              <div className="w-24 flex-shrink-0 flex flex-col space-y-2 border-l border-subtle pl-4 relative z-20">
                {/* Header for Growth */}
                <div className="absolute -top-8 left-4 text-secondary text-xs border-b border-dashed border-subtle pb-0.5">
                  {currentData.growth_label.split(' ').map((word, i) => <div key={i}>{word}</div>)}
                </div>
                
                {currentData.peers.map((peer, idx) => (
                  <div key={idx} className="h-14 flex items-center text-primary text-sm font-medium">
                    {peer.growth}
                  </div>
                ))}
              </div>
            </div>
            
            {/* X-axis labels */}
            <div className="flex mt-2 relative z-20">
              <div className="flex-grow flex justify-between text-secondary text-xs font-bold pr-4">
                <span>{metric}</span>
                <span>{Math.round(maxValue * 0.25)}</span>
                <span>{Math.round(maxValue * 0.5)}</span>
                <span>{Math.round(maxValue * 0.75)}</span>
                <span>{Math.round(maxValue)}</span>
              </div>
              <div className="w-24 flex-shrink-0 pl-4"></div>
            </div>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="flex justify-between items-center mt-8 pt-4 border-t border-subtle">
          <div className="flex items-center">
            {metric !== 'PB' && (
              <>
                <button 
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${isForward ? 'bg-[#eab308]' : 'bg-subtle'}`}
                  onClick={() => setIsForward(!isForward)}
                >
                  <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-card transition-transform ${isForward ? 'translate-x-4' : 'translate-x-1'}`} />
                </button>
                <span className="ml-3 text-secondary text-sm font-medium">Forward {metric}</span>
              </>
            )}
          </div>

          <div className="flex space-x-2">
            <button className="btn-interactive flex items-center px-3 py-1.5 bg-brand hover:bg-brand/90 text-white text-sm font-medium rounded-lg transition-colors shadow-sm">
              <Database className="w-4 h-4 mr-2" />
              Data
            </button>
            <button 
              onClick={() => setIsLearnModalOpen(true)}
              className="btn-interactive flex items-center px-3 py-1.5 bg-brand hover:bg-brand/90 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
            >
              <Info className="w-4 h-4 mr-2" />
              Learn
            </button>
            <button className="btn-interactive flex items-center px-2 py-1.5 bg-brand hover:bg-brand/90 text-white rounded-lg transition-colors shadow-sm">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Audit Summary */}
        <div className="mt-6 flex items-start space-x-3 bg-transparent">
          <CheckCircle2 className="w-6 h-6 text-bullish flex-shrink-0 mt-0.5" />
          <p className="text-secondary text-sm leading-relaxed">
            <span className="text-bullish font-medium">{metricLabel} vs Peers:</span> MBB is good value based on its {metricLabel} ({targetValue}x) compared to the peer average ({currentData.peer_avg.toFixed(1)}x).
          </p>
        </div>
      </div>

      {/* Learn Modal */}
      {isLearnModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-card rounded-xl w-full max-w-2xl overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-subtle">
              <h3 className="text-2xl font-serif font-bold text-primary">Preferred Ratio vs Peers</h3>
              <button onClick={() => setIsLearnModalOpen(false)} className="text-secondary hover:text-secondary">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 text-primary space-y-6 text-base leading-relaxed">
              <p>Peers are the companies that are most similar to the company we are valuing. Arriving at a relevant list of peers includes things like what products they make or services they provide, but also things like their size, growth rates and structure of their income statement and balance sheets.</p>
              <p>Selecting a group of peers is a difficult task, requiring years of experience. Our peers algorithm gives you the power of that experience by selecting peers, using a range of data points.</p>
              <p className="pt-2">For a more detailed breakdown of how we compare stocks to their industry, please check out our <a href="#" className="text-[#d97706] hover:text-[#b45309] underline decoration-[#d97706]/30 underline-offset-4 transition-colors">Help Centre</a>.</p>
            </div>
            <div className="p-4 border-t border-subtle flex justify-end">
              <button 
                onClick={() => setIsLearnModalOpen(false)}
                className="px-4 py-2 bg-[#fde047] hover:bg-[#facc15] text-primary font-medium rounded-md transition-colors"
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
          <div className="bg-card rounded-xl w-full max-w-2xl overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-subtle">
              <h3 className="text-xl font-bold text-primary">Edit Peers</h3>
              <button onClick={() => setIsEditPeersModalOpen(false)} className="text-secondary hover:text-secondary">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <p className="text-sm font-bold text-primary mb-4">Change peers for HOSE:MBB</p>
              
              <div className="space-y-3 mb-6">
                {currentData.peers.filter(p => !p.is_target).map((peer, idx) => (
                  <div key={idx} className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-yellow-600" />
                    <input 
                      type="text" 
                      defaultValue={peer.name}
                      className="w-full pl-10 pr-10 py-2.5 border border-subtle rounded-lg text-sm text-secondary focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-secondary">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              
              <button className="text-yellow-600 text-sm font-medium hover:text-yellow-700">
                Reset to Default
              </button>
            </div>
            
            <div className="p-4 border-t border-subtle flex justify-end space-x-3 bg-base">
              <button 
                onClick={() => setIsEditPeersModalOpen(false)}
                className="px-4 py-2 bg-card border border-subtle hover:bg-subtle text-secondary text-sm font-medium rounded-md transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => setIsEditPeersModalOpen(false)}
                className="px-6 py-2 bg-[#fcd34d] hover:bg-[#fbbf24] text-primary text-sm font-medium rounded-md transition-colors"
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
