import React, { useState, useEffect } from 'react';
import { Smartphone, Tablet, Monitor, Maximize2, Minimize2 } from 'lucide-react';

export function DeviceSimulator({ children }: { children: React.ReactNode }) {
  const [device, setDevice] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [scale, setScale] = useState(1);
  const [isActualMobile, setIsActualMobile] = useState(false);

  // Check if we are inside the simulator iframe or on a real mobile device
  const isIframe = window.self !== window.top;
  const urlParams = new URLSearchParams(window.location.search);
  const isSimulatorDisabled = urlParams.get('simulator') === 'false';

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsActualMobile(true);
        return;
      } else {
        setIsActualMobile(false);
      }

      const padding = 100; // Space for controls and margins
      const availableHeight = window.innerHeight - padding;
      const availableWidth = window.innerWidth - 40;
      
      let targetHeight = device === 'mobile' ? 812 : 1024;
      let targetWidth = device === 'mobile' ? 375 : 768;
      
      const scaleY = availableHeight / targetHeight;
      const scaleX = availableWidth / targetWidth;
      
      setScale(Math.min(scaleX, scaleY, 1));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [device]);

  // If we are inside the iframe or simulator is disabled, just render the app
  if (isIframe || isSimulatorDisabled || isActualMobile) {
    return <div className="w-full h-screen overflow-hidden">{children}</div>;
  }

  if (device === 'desktop') {
    return (
      <div className="relative h-screen w-full overflow-hidden">
        {/* Floating Simulator Controls */}
        <div className="fixed bottom-4 right-4 z-50 bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-lg rounded-full px-4 py-2 flex items-center gap-2">
          <span className="text-xs font-bold text-secondary mr-2 hidden sm:inline-block">Preview:</span>
          <button onClick={() => setDevice('mobile')} className="p-2 rounded-full hover:bg-[var(--border-subtle)] text-secondary hover:text-primary transition-colors" title="Mobile View">
            <Smartphone size={18} />
          </button>
          <button onClick={() => setDevice('tablet')} className="p-2 rounded-full hover:bg-[var(--border-subtle)] text-secondary hover:text-primary transition-colors" title="Tablet View">
            <Tablet size={18} />
          </button>
          <button onClick={() => setDevice('desktop')} className="p-2 rounded-full bg-brand/10 text-brand transition-colors" title="Desktop View">
            <Monitor size={18} />
          </button>
        </div>
        {children}
      </div>
    );
  }

  const iframeUrl = new URL(window.location.href);
  iframeUrl.searchParams.set('simulator', 'false');

  return (
    <div className="min-h-screen w-full bg-neutral-900 flex flex-col items-center justify-center p-4 sm:p-8 transition-colors duration-500">
      {/* Simulator Controls */}
      <div className="mb-6 bg-neutral-800 border border-neutral-700 shadow-xl rounded-full px-4 py-2 flex items-center gap-2 z-50">
        <span className="text-xs font-bold text-neutral-400 mr-2">Preview Mode:</span>
        <button 
          onClick={() => setDevice('mobile')} 
          className={`p-2 rounded-full transition-colors ${device === 'mobile' ? 'bg-blue-500/20 text-blue-400' : 'text-neutral-400 hover:text-white hover:bg-neutral-700'}`}
          title="Mobile View (375px)"
        >
          <Smartphone size={18} />
        </button>
        <button 
          onClick={() => setDevice('tablet')} 
          className={`p-2 rounded-full transition-colors ${device === 'tablet' ? 'bg-blue-500/20 text-blue-400' : 'text-neutral-400 hover:text-white hover:bg-neutral-700'}`}
          title="Tablet View (768px)"
        >
          <Tablet size={18} />
        </button>
        <button 
          onClick={() => setDevice('desktop')} 
          className={`p-2 rounded-full transition-colors ${(device as string) === 'desktop' ? 'bg-blue-500/20 text-blue-400' : 'text-neutral-400 hover:text-white hover:bg-neutral-700'}`}
          title="Desktop View (Full)"
        >
          <Monitor size={18} />
        </button>
        <div className="w-px h-6 bg-neutral-700 mx-2"></div>
        <button 
          onClick={() => setIsFullscreen(!isFullscreen)} 
          className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors"
          title="Toggle Scale"
        >
          {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
        </button>
      </div>

      {/* Device Frame */}
      <div 
        className={`relative bg-[var(--bg-base)] overflow-hidden shadow-2xl transition-all duration-500 ease-in-out flex flex-col ${
          device === 'mobile' 
            ? 'w-[375px] h-[812px] rounded-[3rem] border-[12px] border-neutral-800' 
            : 'w-[768px] h-[1024px] rounded-[2rem] border-[12px] border-neutral-800'
        }`}
        style={{
          transform: isFullscreen ? 'scale(1)' : `scale(${scale})`,
          transformOrigin: 'top center',
          marginBottom: isFullscreen ? 0 : `-${(1 - scale) * (device === 'mobile' ? 812 : 1024)}px`
        }}
      >
        {/* Fake Notch for Mobile */}
        {device === 'mobile' && (
          <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-50 pointer-events-none">
            <div className="w-32 h-6 bg-neutral-800 rounded-b-2xl"></div>
          </div>
        )}
        
        {/* App Content inside iframe */}
        <div className="flex-1 w-full h-full overflow-hidden relative rounded-[2rem]">
          <iframe 
            src={iframeUrl.toString()} 
            className="w-full h-full border-0"
            title="Device Simulator"
          />
        </div>
      </div>
      
      <div className="mt-8 text-neutral-500 text-sm font-medium">
        {device === 'mobile' ? 'iPhone 13 Pro (375 x 812)' : 'iPad Mini (768 x 1024)'}
      </div>
    </div>
  );
}
