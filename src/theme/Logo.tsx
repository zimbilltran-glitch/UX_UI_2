import React from 'react';

export const FinSangLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Rounded square background */}
    <rect width="100" height="100" rx="20" fill="var(--bg-card)" stroke="var(--border-subtle)" strokeWidth="4" />
    {/* Hexagon logo */}
    <path 
      d="M50 20L80 37.5V72.5L50 90L20 72.5V37.5L50 20Z" 
      stroke="var(--color-bullish)" 
      strokeWidth="6" 
      strokeLinejoin="round" 
    />
    <path 
      d="M50 20V55M50 55L80 37.5M50 55L20 37.5M50 55L50 90" 
      stroke="var(--color-bullish)" 
      strokeWidth="6" 
      strokeLinejoin="round" 
    />
  </svg>
);
