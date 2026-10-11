'use client';
import { useState } from 'react';

type LayoutMode = 'transverse' | 'longitudinal';

export const EnginePackagingLab = () => {
  const [activeTab, setActiveTab] = useState<LayoutMode>('transverse');

  // --- ENGINE LAYOUT MODEL --- 
  const renderPowertrainBlueprint = (type: 'transverse' | 'longitudinal') => {
    const isTransverse = type === 'transverse';
    
    return (
      <div className="relative flex flex-col items-center justify-center transition-all duration-700 ease-in-out w-full tablet:max-w-80 h-[360px]">
        
        {/* --- CAR OUTLINE & CAD GRID --- */}
        <div className="absolute inset-x-6 inset-y-4 border-[1.5px] border-slate-300/80 rounded-[45px] pointer-events-none z-0 bg-slate-50/30 overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.03)]">
           <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        </div>

        {/* --- CABIN --- */}
        <div className="absolute top-[8%] w-32.5 h-18.75 border-[1.5px] border-slate-300 rounded-[20px] flex items-center justify-center z-0 bg-white/60 backdrop-blur-md shadow-sm">
           <span className="text-[10px] tracking-[0.2em] text-slate-400 uppercase font-bold">Cabin</span>
        </div>

        {/* --- ENGINE SYSTEM ---*/}
        {isTransverse ? (
          // TRANSVERSE 
          <div className="absolute bottom-[20%] translate-y-1/2 flex flex-row items-center justify-center gap-1.5 z-10 transition-transform duration-700">
            
            <div className="w-8 h-8 bg-amber-400 border border-amber-500 rounded-md flex items-center justify-center z-30 shadow-md">
              <span className="text-[7px] font-bold text-amber-900">DIFF</span>
            </div>

            <div className="w-14 h-12 bg-slate-500 border border-slate-600 rounded-md flex items-center justify-center shadow-md">
              <span className="text-white text-[7px] font-semibold tracking-wider uppercase">Gearbox</span>
            </div>

            <div className="w-24 h-14 bg-red-500 border border-red-600 rounded-md flex flex-col justify-center items-center shadow-lg relative overflow-hidden">
              <div className="absolute inset-x-1 top-1 flex justify-between opacity-30">
                {[...Array(6)].map((_, i) => <div key={`l-${i}`} className="w-1.5 h-1 bg-white rounded-full" />)}
              </div>
              <span className="text-white text-[11px] font-bold tracking-widest">V12</span>
              <div className="absolute inset-x-1 bottom-1 flex justify-between opacity-30">
                {[...Array(6)].map((_, i) => <div key={`r-${i}`} className="w-1.5 h-1 bg-white rounded-full" />)}
              </div>
            </div>
          </div>
        ) : (
          // LONGITUDINAL
          <div className="absolute bottom-[20%] translate-y-4 flex flex-col items-center z-10 transition-transform duration-700">

            <div className="h-24 w-16 bg-red-500 border border-red-600 rounded-md flex flex-col justify-center items-center shadow-lg relative overflow-hidden z-20">
              <div className="absolute inset-y-1.5 left-1.5 flex flex-col justify-between opacity-30">
                {[...Array(6)].map((_, i) => <div key={`l-${i}`} className="w-1 h-1.5 bg-white rounded-full" />)}
              </div>
              <span className="text-white text-[11px] font-bold tracking-widest rotate-90">V12</span>
              <div className="absolute inset-y-1.5 right-1.5 flex flex-col justify-between opacity-30">
                {[...Array(6)].map((_, i) => <div key={`r-${i}`} className="w-1 h-1.5 bg-white rounded-full" />)}
              </div>
            </div>

            <div className="h-14 w-12 bg-slate-500 border border-slate-600 rounded-md flex items-center justify-center shadow-md -mt-1.5 z-10">
              <span className="text-white text-[7px] font-semibold tracking-wider uppercase rotate-90">Gearbox</span>
            </div>

            <div className="w-8 h-8 bg-amber-400 border border-amber-500 rounded-md flex items-center justify-center z-30 -mt-1.5 shadow-md">
              <span className="text-[7px] font-bold text-amber-900 rotate-90">DIFF</span>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="px-4 py-6 font-sans mx-auto bg-light-gray rounded-4xl flex flex-col md:flex-row gap-3 border-[0.5px] border-dark-gray/20 w-[86.5%] tablet:w-143 laptop:w-162 laptop:text-lg">
      {/* --- CONTENT AND CONTROLS--- */}
      <div className="flex flex-col flex-1 w-full md:w-1/2 justify-center">
        
        {/* HEADING */}
        <div className="flex flex-col mb-5">
          <h3 className="text-2xl font-medium text-dark-black leading-none mb-2">Engine Layout</h3>
          <p className="text-sm text-dark-gray leading-relaxed">Powertrain packaging comparison</p>
        </div>

        {/* TABS CONTROLS */}
        <div className="bg-white border-[0.5px] border-hover/30 rounded-2xl p-1 flex flex-row mb-4">
         <button
            onClick={() => setActiveTab('longitudinal')}
            className={`flex-1 py-2.5 text-xs font-base tracking-wider rounded-xl transition-all duration-300 cursor-pointer ${
              activeTab === 'longitudinal' 
                ? 'bg-dark-black text-white shadow-md' : 'text-dark-gray hover:bg-slate-50 hover:text-dark-black'
            }`}
          >
            Longitudinal
          </button>
          <button
            onClick={() => setActiveTab('transverse')}
            className={`flex-1 py-2.5 text-xs font-base tracking-wider rounded-xl transition-all duration-300 cursor-pointer ${
              activeTab === 'transverse' 
                ? 'bg-dark-black text-white shadow-md' : 'text-dark-gray hover:bg-slate-50 hover:text-dark-black'
            }`}
          >
            Transverse
          </button>
        </div>

        {/* EXPLANATION TABS */}
        <div className="bg-white border-[0.5px] border-dark-gray/30 rounded-3xl p-6 flex flex-col gap-2 shadow-inner relative overflow-hidden flex-1">
          {activeTab === 'transverse' && (
            <>
              <h3 className="text-base laptop:text-lg font-semibold text-dark-black">Transverse Mid-Engine</h3>
              <p className="text-dark-gray font-normal text-xs laptop:text-sm leading-relaxed">
                The engine is mounted perpendicular to the vehicle's longitudinal axis. By integrating the engine block with the differential and gearbox into a single compact unit, engineers can <strong>drastically shorten the wheelbase</strong>. Placed directly behind the driver, significantly improves weight distribution and handling.
              </p>
            </>
          )}
          {activeTab === 'longitudinal' && (
            <>
              <h3 className="text-base laptop:text-lg font-semibold text-dark-black">Longitudinal Mid-Engine</h3>
              <p className="text-dark-gray font-normal text-xs laptop:text-sm leading-relaxed">
                The traditional configuration, where the engine (which is naturally long) and gearbox are aligned along the vehicle's central axis. Mechanically simpler, it <strong>forces a significant extension of the bodywork</strong> and wheelbase to accommodate the entire powertrain ahead of the rear axle.
              </p>
            </>
          )}
        </div>
      </div>

      {/* --- VISUALIZATION --- */}
      <div className="flex flex-col flex-1 w-full md:w-1/2">
        <div className="bg-white border-[0.5px] border-dark-gray/30 rounded-4xl  pt-2 flex flex-col items-center justify-center shadow-inner relative overflow-hidden h-full min-h-95">
            {activeTab === 'longitudinal' && renderPowertrainBlueprint('longitudinal')}
            {activeTab === 'transverse' && renderPowertrainBlueprint('transverse')}
        </div>
      </div>
    </div>
  );
}