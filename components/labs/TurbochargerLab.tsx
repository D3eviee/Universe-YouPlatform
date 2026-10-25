'use client';
import { useState, useEffect, useRef } from 'react';
import { Settings, Wind, ThermometerSnowflake, Power, Gauge, Zap } from 'lucide-react';

type TabMode = 'flow' | 'cooling' | 'lag';
type TurboMode = 'classic' | 'modern';

const ANIMATION_STYLES = `
  @keyframes flow-dash {
    to { stroke-dashoffset: -100; }
  }
  .path-flow {
    fill: none;
    stroke-width: 3.5;
    stroke-dasharray: 8 10;
    animation: flow-dash linear infinite;
  }
  .path-bg {
    fill: none;
    stroke-width: 24;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  .turbine-spin {
    animation: spin linear infinite;
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes piston-pump {
    0% { transform: translateY(0); }
    100% { transform: translateY(-16px); }
  }
  .piston {
    animation: piston-pump alternate infinite;
  }
  
  /* Smoke Animation */
  @keyframes smoke-puff {
    0% { transform: translate(0px, 0px) scale(0.3); opacity: 0.9; fill: #fb923c; } 
    40% { opacity: 0.6; fill: #94a3b8; } 
    100% { transform: translate(35px, -15px) scale(2.8); opacity: 0; fill: #64748b; }
  }
  .smoke-particle {
    animation: smoke-puff linear infinite;
  }
`;

export default function TurbochargerLab() {
  const [activeTab, setActiveTab] = useState<TabMode>('flow');
  const [turboMode, setTurboMode] = useState<TurboMode>('classic');
  const [isPressing, setIsPressing] = useState(false);
  
  // Symulacja fizyki
  const [rpm, setRpm] = useState(1000);
  const [boost, setBoost] = useState(0);

  // Dynamiczne dopasowanie skali schematu
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const observer = new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect;
      
      // Sprawdzamy, czy jesteśmy na telefonie/tablecie (< 1024px) czy na komputerze
      const isMobile = window.innerWidth < 1024;
      
      // Na mobilkach pełna skala (1.0), na laptopach zmniejszona (0.75) - tak jak chciałeś
      const multiplier = isMobile ? 1 : 0.75;
      
      const newScale = (width / 480) * multiplier;
      setScale(Math.min(Math.max(newScale, 0.4), 1.0));
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      // 1. Fizyka silnika
      setRpm(prevRpm => {
        const targetRpm = isPressing ? 7000 : 1000;
        const engineInertia = isPressing ? 0.12 : 0.05; 
        return prevRpm + (targetRpm - prevRpm) * engineInertia;
      });

      // 2. Fizyka turbiny
      setBoost(prevBoost => {
        const boostThreshold = turboMode === 'classic' ? 2500 : 1500;
        const targetBoost = rpm > boostThreshold ? ((rpm - boostThreshold) / (7000 - boostThreshold)) * 100 : 0;
        const turboInertia = turboMode === 'classic' ? 0.03 : 0.25; 
        return prevBoost + (targetBoost - prevBoost) * turboInertia;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isPressing, rpm, turboMode]);

  const boostPercent = Math.max(0, Math.min(100, boost));
  const rpmPercent = (rpm - 1000) / 6000;
  
  // Prędkości przepływu
  const exhaustFlowSpeed = 2 - (rpmPercent * 1.5);
  const intakeFlowSpeed = 2 - (boostPercent / 100 * 1.8);
  const pistonSpeed = 60 / rpm;

  return (
    <div className="bg-light-gray tablet:rounded-3xl mx-auto flex flex-col  py-6 px-4 tablet:p-8  gap-6 border-[0.5px] border-spanish-gray/30 w-99 tablet:w-xl laptop:w-163 mb-6">
      {/* TOP CONTENT */}
      <div className="flex flex-col w-full justify-center">
        {/* --- HEADING --- */}
        <div className="flex flex-col">
          <h3 className="text-2xl font-medium text-dark-black">Inside the Turbo</h3>
          <p className="text-sm text-dark-gray leading-relaxed">Discover how forced induction powers the engine</p>
        </div>
          
        {/* --- CONTENT SELECTOR --- */}
        <div className="bg-white border-[0.5px] border-spanish-gray/60 rounded-2xl p-1 flex flex-row my-4">
          <button
            onClick={() => setActiveTab('flow')}
            className={`w-full p-2.5 text-xs font-normal tracking-wider rounded-xl transition-all duration-150 cursor-pointer ${
            activeTab === 'flow' ? 'bg-dark-black text-white' : 'text-dark-gray hover:bg-light-gray hover:text-dark-black'}`}
          >
            Airflow
          </button>
          
          <button
            onClick={() => setActiveTab('cooling')}
            className={`w-full p-2 text-xs font-normal tracking-wider rounded-xl transition-all duration-150 cursor-pointer ${
              activeTab === 'cooling' ? 'bg-dark-black text-white' : 'text-dark-gray hover:bg-light-gray hover:text-dark-black'}`}
          >
            Cooling
          </button>
            
          <button
            onClick={() => setActiveTab('lag')}
            className={`w-full p-2 text-xs font-normal tracking-wider rounded-xl transition-all duration-150 cursor-pointer ${
              activeTab === 'lag' ? 'bg-dark-black text-white' : 'text-dark-gray hover:bg-light-gray hover:text-dark-black'}`}
            >
              Turbo Lag
          </button>
        </div>
          
        {/* EXPLANATIONS */}
        <div className="bg-white border-[0.5px] border-spanish-gray/60 rounded-2xl p-6 flex flex-col shadow-inner mb-4">
          {activeTab === 'flow' && (
            <>
              <div className="flex items-center gap-2 mb-2">
                <Settings size={18} className="text-dark-black" />
                <h3 className="text-base lg:text-lg font-semibold text-dark-black">Exhaust Energy</h3>
              </div>
              <p className="text-dark-gray font-normal text-sm leading-relaxed">
                Turbochargers are driven by waste exhaust gases produced by the engine. These gases power the turbo turbine that is connected through a shaft to the compressor and makes compressor to turn and sucks dense air back into the cylinders  
              </p>
          </>
          )}
          {activeTab === 'cooling' && (
            <>
              <div className="flex items-center gap-2">
                <ThermometerSnowflake size={18} className="text-blue-500" />
                <h3 className="text-base lg:text-lg font-semibold text-dark-black">Intercooler</h3>
              </div>
              <p className="text-dark-gray font-normal text-sm leading-relaxed">
                Compressing air naturally heats it up, reducing its density. The intercooler acts as a radiator, cooling the pressurized air before it enters the engine, allowing more oxygen into each cylinder for a bigger combustion.
              </p>
            </>
          )}
          {activeTab === 'lag' && (
            <>
              <div className="flex items-center gap-2">
                <Wind size={18} className="text-amber-500" />
                <h3 className="text-base lg:text-lg font-semibold text-dark-black">Evolution & Turbo Lag</h3>
              </div>
              <p className="text-dark-gray font-normal text-sm leading-relaxed">
                Older turbos took time to spool up from idle (turbo lag). Modern Twin-Scroll technology utilizes pulse-tuned exhaust manifolds to deliver instant boost.
              </p>
            </>
          )}
        </div>
          
        {/* TECHNOLOGY SWITCH */}
        <div className="bg-aqua-light/10 p-1.5 rounded-2xl flex flex-row border-[0.5] border-spanish-gray/40">
          <button
            onClick={() => { setTurboMode('classic'); setBoost(0); setRpm(1000); setIsPressing(false); }}
            className={`w-full flex items-center justify-center gap-2 text-xs font-semibold tracking-wide rounded-xl py-2.5 transition-all duration-150 cursor-pointer  
              ${turboMode === 'classic' ? 'bg-white text-dark-black shadow-inner': 'text-aqua-dark/90 hover:text-aqua-dark'}`}
          >
            <Gauge size={14} className={turboMode === 'classic' ? 'text-amber-500' : 'text-slate-400'} /> Classic (Lag)
          </button>
          <button
            onClick={() => { setTurboMode('modern'); setBoost(0); setRpm(1000); setIsPressing(false); }}
            className={`w-full flex items-center justify-center gap-2 text-xs font-semibold tracking-wide rounded-xl py-2.5 transition-all duration-150 cursor-pointer 
              ${turboMode === 'modern' ?'bg-white text-dark-black shadow-inner': 'text-aqua-dark/90 hover:text-aqua-dark'}`}
          >
            <Zap size={14} className={turboMode === 'modern' ? 'text-blue-500' : 'text-slate-400'} /> Modern (Instant)
          </button>
        </div>
      </div>

      {/* DOWN SCHEME */}
      <div className="flex flex-col flex-1 w-full">
        {/* VISUALIZATION */}
        <div className="bg-white border-[0.5px] border-dark-gray/30 rounded-3xl p-6 flex flex-col shadow-inner relative h-full min-h-112">
          {/* --- BG LINES ---  */}
          <div className="absolute inset-0 opacity-20 pointer-events-none rounded-4xl" style={{ backgroundImage: 'linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          
          <div ref={containerRef} className="w-full flex-1 flex justify-center items-center min-h-63 transition-all duration-200" style={{ minHeight: `${340 * scale}px` }}>
            <div className="relative w-120 h-85 shrink-0 origin-center" style={{ transform: `scale(${scale})` }}>
              <style>{ANIMATION_STYLES}</style>
              
              {/* FLOW LINES (BACKGROUNDS) */}
              <svg viewBox="0 0 480 340" className="absolute inset-0 w-full h-full z-0 pointer-events-none drop-shadow-sm">
                {/* Air In -> Compressor */}
                <path d="M 10 110 L 125 110" className="path-bg stroke-blue-200/50" />
                {/* Compressor -> Intercooler */}
                <path d="M 125 110 L 125 260 Q 125 280 145 280 L 160 280" className="path-bg stroke-cyan-300/40" />
                {/* Intercooler -> Engine Block (Straight Horizontal Line) */}
                <path d="M 260 280 L 360 280" className="path-bg stroke-cyan-400/50" />
                {/* Engine Block -> Turbine (Clean L-shape from side to bottom) */}
                <path d="M 360 200 L 275 200 Q 255 200 255 180 L 255 110" className="path-bg stroke-red-500/30" />
                {/* Turbine -> Exhaust Out */}
                <path d="M 255 110 L 255 40 Q 255 20 275 20 L 440 20" className="path-bg stroke-orange-300/40" />
                {/* Shaft connecting rotors */}
                <path d="M 125 110 L 255 110" fill="none" stroke="#475569" strokeWidth="4" className="opacity-80" />
              </svg>

              {/* FLOW LINES (FRONT) & SMOKE PARTICLES */}
              <svg viewBox="0 0 480 340" className="absolute inset-0 w-full h-full z-10 pointer-events-none">
                <path d="M 10 110 L 125 110" className="path-flow stroke-blue-400" style={{ animationDuration: `${intakeFlowSpeed}s` }} />
                <path d="M 125 110 L 125 260 Q 125 280 145 280 L 160 280" className="path-flow stroke-cyan-500" style={{ animationDuration: `${intakeFlowSpeed}s` }} />
                
                {/* Intercooler to Engine */}
                <path d="M 260 280 L 360 280" className="path-flow stroke-cyan-600" style={{ animationDuration: `${intakeFlowSpeed}s` }} />
                {/* Engine to Turbine */}
                <path d="M 360 200 L 275 200 Q 255 200 255 180 L 255 110" className="path-flow stroke-red-600" style={{ animationDuration: `${exhaustFlowSpeed}s` }} />
                  
                {/* Turbine to Tailpipe */}
                <path d="M 255 110 L 255 40 Q 255 20 275 20 L 440 20" className="path-flow stroke-orange-400" style={{ animationDuration: `${exhaustFlowSpeed}s` }} />
                
                {/* Smoke Generator */}
                <g transform="translate(440, 20)">
                  <circle cx="0" cy="0" r="5" className="smoke-particle" style={{ animationDuration: `${exhaustFlowSpeed * 1.2}s`, animationDelay: '0s' }} />
                  <circle cx="0" cy="0" r="3" className="smoke-particle" style={{ animationDuration: `${exhaustFlowSpeed * 1.2}s`, animationDelay: `${exhaustFlowSpeed * 0.4}s` }} />
                  <circle cx="0" cy="0" r="6" className="smoke-particle" style={{ animationDuration: `${exhaustFlowSpeed * 1.2}s`, animationDelay: `${exhaustFlowSpeed * 0.8}s` }} />
                </g>
              </svg>

              {/* --- COMPRESSOR --- */}
              <div className="absolute top-15 left-20 w-22.5 h-25 border-[3px] border-slate-300/80 bg-white/60 backdrop-blur-md rounded-l-full rounded-tr-[40px] rounded-br-[10px] flex items-center justify-center z-20 shadow-md">
                <Settings className="text-blue-500 turbine-spin scale-[1.6]" size={32} style={{ animationDuration: `${intakeFlowSpeed * 0.4}s` }} />
              </div>

              {/* BEARING */}
              <div className="absolute top-20 left-42.5 w-10 h-15 border-y-[3px] border-slate-300/80 bg-slate-100 z-10 flex flex-col justify-evenly py-2">
                <div className="w-full h-px bg-slate-300" />
                <div className="w-full h-px bg-slate-300" />
              </div>
              
              {/* --- TURBINE --- */}
              <div className="absolute top-15 left-52.5 w-22.5 h-25 border-[3px] border-slate-300/80 bg-white/60 backdrop-blur-md rounded-r-full rounded-tl-[40px] rounded-bl-[10px] flex items-center justify-center z-20 shadow-md">
                <Settings className="text-red-500 turbine-spin scale-[1.6]" size={32} style={{ animationDuration: `${exhaustFlowSpeed * 0.4}s` }} />
              </div>
              
              {/* --- ENGINE --- */}
              <div className="absolute top-45 left-90 w-20 h-30 bg-slate-200 border-[3px] border-slate-400 rounded-xl flex flex-col justify-end p-2 z-20 shadow-lg overflow-hidden">
                <div className="flex w-full h-full gap-1 items-end justify-between border-b-2 border-slate-400 pb-1">
                  {[0, 1, 2, 3].map((i) => (
                    <div key={i} className="flex-1 h-10 bg-slate-400 rounded-sm relative">
                      <div 
                        className="absolute w-full h- bg-slate-700 rounded-sm top-0 piston" 
                        style={{ animationDuration: `${pistonSpeed}s`, animationDelay: `${i * (pistonSpeed / 2)}s` }} 
                      />
                    </div>
                  ))}
                </div>
                <div className="absolute top-2 left-0 w-full text-center text-xs font-bold text-slate-500 uppercase tracking-widest">Engine</div>
              </div>
              
              {/* INTERCOOLER */}
              <div className="absolute top-65 left-40 w-25 h-10 bg-white border-2 border-cyan-400 rounded-lg flex flex-col items-center justify-evenly z-20 shadow-md overflow-hidden">
                <div className="w-full h-[1.5px] bg-cyan-400/50" />
                <div className="w-full h-[1.5px] bg-cyan-400/50" />
                <div className="w-full h-[1.5px] bg-cyan-400/50" />
                <div className="w-full h-[1.5px] bg-cyan-400/50" />
              </div>
              
              {/* --- LABELS --- */}
              <div className="absolute top-16 -left-6 text-xs font-semibold text-slate-500 uppercase tracking-widest leading-tight">Air<br/>drawn in</div>
              <div className="absolute top-10 left-18 text-xs font-semibold text-dark-gray uppercase tracking-widest">Compressor</div>
              <div className="absolute top-50 left-10 text-xs font-semibold text-blue-500 uppercase tracking-widest flex items-center gap-1">Impeller</div>
              <div className="absolute top-54 left-64 text-xs font-semibold text-red-500 uppercase tracking-widest leading-tight">Hot Exhaust</div>
              <div className="absolute -top-5 right-10 text-xs font-semibold text-slate-500 uppercase tracking-widest leading-tight text-right">Tailpipe /<br/>Exhaust Out</div>
              <div className="absolute top-25 right-26 text-xs font-semibold text-slate-500 uppercase tracking-widest flex items-center gap-1">Turbine</div>
              <div className="absolute top-60 left-40 text-xs font-semibold text-cyan-600 uppercase tracking-widest">Intercooler</div>
              <div className="absolute top-77 right-27 text-xs font-semibold text-cyan-700 uppercase tracking-wide text-center w-30 leading-tight">Cold dense air forced into cylinders</div>
            </div>
          </div>
        </div>
        
        {/* TELEMETRY */}
        <div className="w-full flex flex-row gap-4 relative z-30 shrink-0 mt-4">
          {/* ENGINE REVS */}
          <div className="flex-1 bg-white border-[0.5px] border-spanish-gray/30 rounded-2xl p-3 tablet:p-4 flex flex-col shadow-xs">
            <span className="text-[10px] font-bold text-dark-gray uppercase tracking-widest mb-1">Engine Speed (RPM)</span>
            <div className="flex items-end gap-1">
              <span className="text-xl tablet:text-2xl font-semibold text-dark-black">{Math.round(rpm)}</span>
              <span className="text-sm text-dark-black font-light mb-0.5">rpm</span>
            </div>
            <div className="w-full h-1.5 bg-aqua-dark/40 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-aqua-dark transition-all duration-75" style={{ width: `${rpmPercent * 100}%` }} />
            </div>
          </div>
          
          {/* TURBO BOOST */}
          <div className="flex-1 bg-white border-[0.5px] border-spanish-gray/30 rounded-2xl p-3 tablet:p-4 flex flex-col shadow-xs">
            <span className="text-[10px] font-bold text-dark-gray uppercase tracking-widest mb-1">Turbo Boost</span>
              <div className="flex items-end gap-1">
                <span className="text-xl tablet:text-2xl font-semibold text-red-500">{boostPercent.toFixed(1)}</span>
                <span className="text-sm text-dark-black font-light mb-0.5">%</span>
              </div>
              <div className="w-full h-1.5 bg-red-200 rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-red-500 transition-all duration-75" style={{ width: `${boostPercent}%` }} />
              </div>
              
              {isPressing && rpm > 3000 && boostPercent < (turboMode === 'classic' ? 70 : 90) && (
                <span className={`absolute top-3 right-3 tablet:top-4 tablet:right-4 text-[8px] font-bold px-1.5 py-0.5 rounded-md border ${
                  turboMode === 'classic' ? 'text-red-400 bg-red-50 border-red-200 animate-pulse' : 'text-aqua-dark bg-blue-50 border-aqua-light'
              }`}>
                {turboMode === 'classic' ? 'SPOOLING' : 'INSTANT BOOST'}
              </span>
            )}
          </div>
        </div>
          
          {/* --- BUTTON TO GAS UP --- */}
        <div className="w-full flex flex-col items-center mt-4 shrink-0">
          <button
            onMouseDown={() => setIsPressing(true)}
            onMouseUp={() => setIsPressing(false)}
            onMouseLeave={() => setIsPressing(false)}
            onTouchStart={() => setIsPressing(true)}
            onTouchEnd={() => setIsPressing(false)}
            className={`w-full py-3 px-2.5 z-30 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 select-none cursor-pointer
              ${isPressing ? 'bg-aqua-dark text-white shadow-inner scale-[0.95]' : 'bg-dark-black text-white shadow-md hover:bg-black/80 hover:-translate-y-0.5'}`}
          >
            <Power size={20} className={isPressing ? 'animate-pulse' : ''} />
            <span className="font-bold tracking-widest text-sm uppercase">{isPressing ? 'Full Throttle Active' : 'Step on the gas'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}