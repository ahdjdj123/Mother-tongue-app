import React from 'react';

export const UzbekSkylineGraphic: React.FC<{ className?: string }> = ({ className = 'w-48 h-28' }) => {
  return (
    <div className={`relative flex items-end justify-center ${className}`}>
      <svg
        viewBox="0 0 320 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-contain"
      >
        {/* Soft clouds & birds */}
        <path
          d="M30 35 Q40 30 50 35 Q60 25 75 32 Q85 32 90 38 L25 38 Z"
          fill="#3B82F6"
          fillOpacity="0.08"
        />
        <path
          d="M210 25 Q220 20 230 25 Q240 15 255 22 Q265 22 270 28 L205 28 Z"
          fill="#3B82F6"
          fillOpacity="0.08"
        />
        {/* Birds */}
        <path
          d="M100 20 Q104 16 108 20 Q112 16 116 20"
          stroke="#60A5FA"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M118 14 Q121 11 124 14 Q127 11 130 14"
          stroke="#93C5FD"
          strokeWidth="1"
          strokeLinecap="round"
        />

        {/* Trees */}
        <circle cx="20" cy="98" r="12" fill="#10B981" fillOpacity="0.8" />
        <circle cx="32" cy="102" r="8" fill="#059669" fillOpacity="0.8" />
        <circle cx="280" cy="98" r="14" fill="#10B981" fillOpacity="0.8" />
        <circle cx="295" cy="102" r="9" fill="#059669" fillOpacity="0.8" />

        {/* Tashkent TV Tower silhouette */}
        <path
          d="M60 110 L63 50 L65 50 L68 110 Z"
          fill="#2563EB"
          fillOpacity="0.85"
        />
        <circle cx="64" cy="65" r="5" fill="#1D4ED8" />
        <path d="M64 25 L64 50" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" />
        <polygon points="61,35 67,35 64,28" fill="#1D4ED8" />

        {/* Left Minaret */}
        <rect x="105" y="45" width="8" height="65" rx="1" fill="#3B82F6" />
        <path d="M103 45 L115 45 L109 38 Z" fill="#1D4ED8" />
        <circle cx="109" cy="35" r="2" fill="#3B82F6" />

        {/* Registan / Madrasa Arch Center */}
        <rect x="125" y="60" width="70" height="50" rx="2" fill="#2563EB" />
        {/* Portal arch */}
        <path
          d="M140 110 L140 80 Q160 65 180 80 L180 110 Z"
          fill="#DBEAFE"
          className="dark:fill-slate-900"
        />
        <path
          d="M145 110 L145 83 Q160 72 175 83 L175 110 Z"
          fill="#1E40AF"
        />
        {/* Madrasa Top Facade Detail */}
        <rect x="123" y="55" width="74" height="6" fill="#1D4ED8" />

        {/* Grand Dome */}
        <path
          d="M200 80 C200 55 240 55 240 80 Z"
          fill="#0284C7"
        />
        <path
          d="M220 50 L220 56"
          stroke="#0369A1"
          strokeWidth="2"
        />
        <circle cx="220" cy="48" r="2" fill="#0284C7" />
        <rect x="195" y="80" width="50" height="30" fill="#38BDF8" fillOpacity="0.9" />

        {/* Right Minaret */}
        <rect x="250" y="40" width="9" height="70" rx="1" fill="#2563EB" />
        <path d="M248 40 L261 40 L254.5 32 Z" fill="#1D4ED8" />
        <circle cx="254.5" cy="29" r="2" fill="#2563EB" />

        {/* Ground line */}
        <line x1="0" y1="110" x2="320" y2="110" stroke="#2563EB" strokeWidth="2" strokeOpacity="0.3" />
      </svg>
    </div>
  );
};
