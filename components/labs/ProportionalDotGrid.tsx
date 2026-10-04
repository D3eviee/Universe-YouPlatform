'use client';
import { useState, useMemo } from 'react';
import { LabDotGrid } from '@/types'; 

export default function ProportionalDotGrid({title, description, baseName, alloyName, baseColor, alloyColor, maxPercentage, metricName, metricUnit, baseValue, maxValue, mathModel }: LabDotGrid) {
  const [percentage, setPercentage] = useState(0);

  const shuffleSequence = useMemo(() => {
    const arr = Array.from({ length: 100 }, (_, i) => i);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, []);

  const alloyIndices = new Set(shuffleSequence.slice(0, percentage));
  
  // MATH ENGINE
  const currentValue = useMemo(() => {
    const ratio = percentage / maxPercentage;
    const delta = maxValue - baseValue;
    
    let calculated = baseValue;

    switch (mathModel) {
      case 'square_root':
        calculated = baseValue + (delta * Math.sqrt(ratio));
        break;
      case 'quadratic':
        calculated = baseValue + (delta * Math.pow(ratio, 2));
        break;
      case 'inverse_square':
        calculated = baseValue + (delta * (1 - 1/Math.pow((ratio * 10) + 1, 2)));
        break;
      case 'linear':
      default:
        calculated = baseValue + (delta * ratio);
        break;
    }
    
    return calculated < 10 ? Math.round(calculated * 10) / 10 : Math.round(calculated);
  }, [percentage, maxPercentage, baseValue, maxValue, mathModel]);

  return (
    <div className="w-xl mx-auto bg-light-gray rounded-4xl p-8 my-8 flex flex-col md:flex-row gap-10 border-[0.5px] border-dark-gray/20">
      
      {/* --- ANIMATED ALLOY GRID --- */}
      <div className="flex-1 flex items-center justify-center relative">
        {/* BACKGROUND COLORED BLUR */}
        <div 
          className="absolute inset-0 rounded-3xl blur-xl transition-opacity duration-700 ease-in-out pointer-events-none"
          style={{ backgroundColor: alloyColor, opacity: (percentage / maxPercentage) * 0.15 }}
        />
        
        <div className="grid grid-cols-10 gap-1.5 relative z-10 p-5 bg-white rounded-3xl shadow-sm border border-gray-100">
          {Array.from({ length: 100 }).map((_, index) => {
            const isAlloy = alloyIndices.has(index);
            return (
              <div
                key={index}
                className="w-3 h-3 rounded-full transition-colors duration-500 ease-out"
                style={{ backgroundColor: isAlloy ? alloyColor : baseColor,transform: isAlloy ? 'scale(1.1)' : 'scale(1)',
                }}
              />
            );
          })}
        </div>
      </div>

      {/* INTERACTION ZONE */}
      <div className="flex-1 flex flex-col justify-center">
        <h3 className="text-2xl font-medium text-dark-black leading-none mb-3">{title}</h3>
        <p className="text-sm text-dark-gray leading-relaxed mb-8">{description}</p>

        {/* --- DYNAMIC STATS ---*/}
        <div className="flex items-end gap-8 mb-8">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-dark-gray uppercase tracking-widest font-light">{metricName}</span>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-light tabular-nums transition-all duration-300 text-secondary-dark">{currentValue}</span>
              <span className="text-sm text-dark-gray font-medium">{metricUnit}</span>
            </div>
          </div>
          
          <div className="w-px h-10 bg-gray-300"></div>

          <div className="flex flex-col gap-1">
            <span className="text-xs text-dark-gray uppercase tracking-widest font-light">{alloyName} added</span>
            <div className="flex items-baseline gap-1 text-dark-black">
              <span className="text-4xl font-light tabular-nums transition-all duration-300 text-secondary-dark">{percentage}</span>
              <span className="text-sm text-dark-gray font-medium">%</span>
            </div>
          </div>
        </div>

        {/* --- SCALE AND CONTROLS --- */}
        <div className="flex flex-col gap-3">
          <div className="flex justify-between text-xs font-medium text-gray-500">
            <span> {baseName}</span>
            <span>Max ({maxPercentage}% {alloyName})</span>
          </div>
          <input
            type="range"
            min="0"
            max={maxPercentage}
            value={percentage}
            onChange={(e) => setPercentage(Number(e.target.value))}
            className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-black hover:accent-gray-800 transition-colors"
          />
        </div>
      </div>
    </div>
  );        
}