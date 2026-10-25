'use client';
import { useState, useEffect, useRef } from 'react';
import { Settings, Wind, Gauge, ArrowRightLeft, Activity } from 'lucide-react';

type TabMode = 'flow' | 'sequential' | 'transition';
type ThrottleMode = 'low' | 'mid' | 'high';

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
    stroke-width: 14;
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
    100% { transform: translate(0px, 35px) scale(2.8); opacity: 0; fill: #64748b; }
  }
  .smoke-particle {
    animation: smoke-puff linear infinite;
  }
`;

export default function SequentialTwinTurboLab() {
  const [activeTab, setActiveTab] = useState<TabMode>('flow');
  const [throttleMode, setThrottleMode] = useState<ThrottleMode>('low');
  
  // Symulacja fizyki
  const [rpm, setRpm] = useState(1000);
  const [primaryBoost, setPrimaryBoost] = useState(0);
  const [secondaryBoost, setSecondaryBoost] = useState(0);

  // Dynamiczne dopasowanie skali schematu
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const SECONDARY_TURBO_THRESHOLD = 4000;

  useEffect(() => {
    if (!containerRef.current) return;
    
    const observer = new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect;
      const isMobile = window.innerWidth < 1024;
      const multiplier = isMobile ? 1 : 0.75;
      
      const newScale = (width / 480) * multiplier;
      setScale(Math.min(Math.max(newScale, 0.4), 1.0));
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      // 1. Fizyka Silnika
      setRpm(prevRpm => {
        let targetRpm = 1000;
        if (throttleMode === 'low') targetRpm = 1800;
        if (throttleMode === 'mid') targetRpm = 3800;
        if (throttleMode === 'high') targetRpm = 6800;

        const engineInertia = 0.08;
        return prevRpm + (targetRpm - prevRpm) * engineInertia;
      });

      // 2. Turbina Główna (Primary)
      setPrimaryBoost(prev => {
        const target = rpm > 1200 ? Math.min(((rpm - 1200) / 2600) * 50, 50) : 0;
        return prev + (target - prev) * 0.1;
      });

      // 3. Turbina Pomocnicza (Secondary)
      setSecondaryBoost(prev => {
        const target = rpm > SECONDARY_TURBO_THRESHOLD ? ((rpm - SECONDARY_TURBO_THRESHOLD) / 2800) * 50 : 0;
        return prev + (target - prev) * 0.08;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [throttleMode, rpm]);

  const totalBoost = Math.max(0, Math.min(100, primaryBoost + secondaryBoost));
  const rpmPercent = Math.max(0, (rpm - 1000) / 6000);
  
  const primaryActive = rpm > 1200;
  const secondaryActive = rpm > SECONDARY_TURBO_THRESHOLD;

  const primaryFlowSpeed = primaryActive ? Math.max(0.2, 2 - (primaryBoost / 50 * 1.8)) : 0;
  const secondaryFlowSpeed = secondaryActive ? Math.max(0.2, 2 - (secondaryBoost / 50 * 1.8)) : 0;
  const exhaustFlowSpeed = Math.max(0.2, 2 - (rpmPercent * 1.5));
  const pistonSpeed = 60 / Math.max(rpm, 1000);

  return (
    <div className="bg-light-gray tablet:rounded-3xl mx-auto flex flex-col py-6 px-4 tablet:p-8 gap-6 border-[0.5px] border-spanish-gray/30 w-99 tablet:w-xl laptop:w-163 mb-6">
      
      {/* TOP CONTENT */}
      <div className="flex flex-col w-full justify-center">
        
        {/* --- HEADING --- */}
        <div className="flex flex-col">
          <h3 className="text-2xl font-medium text-dark-black">Sequential Twin-Turbo</h3>
          <p className="text-sm text-dark-gray leading-relaxed">Porsche 959 Architecture</p>
        </div>

        {/* --- CONTENT SELECTOR --- */}
        <div className="bg-white border-[0.5px] border-spanish-gray/60 rounded-2xl p-1 flex flex-row my-4">
         <button
            onClick={() => setActiveTab('flow')}
            className={`w-full p-2.5 text-xs font-normal tracking-wider rounded-xl transition-all duration-150 cursor-pointer ${
              activeTab === 'flow' ? 'bg-dark-black text-white' : 'text-dark-gray hover:bg-light-gray hover:text-dark-black'
            }`}
          >
            Układ
          </button>
          <button
            onClick={() => setActiveTab('sequential')}
            className={`w-full p-2.5 text-xs font-normal tracking-wider rounded-xl transition-all duration-150 cursor-pointer ${
              activeTab === 'sequential' ? 'bg-dark-black text-white' : 'text-dark-gray hover:bg-light-gray hover:text-dark-black'
            }`}
          >
            Sekwencja
          </button>
          <button
            onClick={() => setActiveTab('transition')}
            className={`w-full p-2.5 text-xs font-normal tracking-wider rounded-xl transition-all duration-150 cursor-pointer ${
              activeTab === 'transition' ? 'bg-dark-black text-white' : 'text-dark-gray hover:bg-light-gray hover:text-dark-black'
            }`}
          >
            Brak Laga
          </button>
        </div>

        {/* EXPLANATIONS */}
        <div className="bg-white border-[0.5px] border-spanish-gray/60 rounded-2xl p-6 flex flex-col shadow-inner mb-4">
          {activeTab === 'flow' && (
            <>
              <div className="flex items-center gap-2 mb-2">
                <ArrowRightLeft size={18} className="text-dark-black" />
                <h3 className="text-base lg:text-lg font-semibold text-dark-black">Podział Spalin</h3>
              </div>
              <p className="text-dark-gray font-normal text-sm leading-relaxed">
                Zamiast jednej wielkiej turbiny, układ posiada dwie mniejsze. Zawór w układzie wydechowym decyduje, czy spaliny zasilają tylko lewą turbinę, czy rozdzielają się na obie jednocześnie.
              </p>
            </>
          )}
          {activeTab === 'sequential' && (
            <>
              <div className="flex items-center gap-2 mb-2">
                <Gauge size={18} className="text-blue-500" />
                <h3 className="text-base lg:text-lg font-semibold text-dark-black">Dwa Etapy (Staging)</h3>
              </div>
              <p className="text-dark-gray font-normal text-sm leading-relaxed">
                Poniżej 4000 RPM pracuje <strong>tylko Główna Turbina</strong>. Przebicie granicy 4000 RPM otwiera zawór i budzi do życia <strong>Pomocniczą Turbinę</strong>, dodając drugie 50% potężnego ciśnienia.
              </p>
            </>
          )}
          {activeTab === 'transition' && (
            <>
              <div className="flex items-center gap-2 mb-2">
                <Wind size={18} className="text-amber-500" />
                <h3 className="text-base lg:text-lg font-semibold text-dark-black">Zawsze w Gotowości</h3>
              </div>
              <p className="text-dark-gray font-normal text-sm leading-relaxed">
                Tryb "Gotowość" to kwintesencja tego inżynieryjnego cudu. Główna turbina jest na pełnych obrotach pompując maksymalne 50%, podczas gdy druga czeka uśpiona. Brak laga przy wdepnięciu gazu w podłogę.
              </p>
            </>
          )}
        </div>

        {/* --- 3 OPCJE PRZEPUSTNICY --- */}
        <div className="flex flex-col gap-2 w-full mt-2">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Activity size={14} className="text-slate-400" />
            <span className="text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase">Obciążenie Silnika (Gaz)</span>
          </div>
          
          <div className="bg-aqua-light/10 p-1.5 rounded-2xl flex flex-col tablet:flex-row gap-1.5 border-[0.5px] border-spanish-gray/40">
            <button
              onClick={() => setThrottleMode('low')}
              className={`w-full py-2.5 px-4 rounded-xl flex items-center justify-between transition-all duration-150 cursor-pointer ${
                throttleMode === 'low' 
                  ? 'bg-white text-dark-black shadow-inner border border-spanish-gray/20' 
                  : 'text-aqua-dark/90 hover:text-aqua-dark'
              }`}
            >
              <span className={`text-xs font-semibold tracking-wide ${throttleMode === 'low' ? 'text-blue-500' : ''}`}>1. Cruising</span>
              <span className="text-[10px] font-mono opacity-60">~1800</span>
            </button>

            <button
              onClick={() => setThrottleMode('mid')}
              className={`w-full py-2.5 px-4 rounded-xl flex items-center justify-between transition-all duration-150 cursor-pointer ${
                throttleMode === 'mid' 
                  ? 'bg-white text-dark-black shadow-inner border border-spanish-gray/20' 
                  : 'text-aqua-dark/90 hover:text-aqua-dark'
              }`}
            >
              <span className={`text-xs font-semibold tracking-wide ${throttleMode === 'mid' ? 'text-amber-500' : ''}`}>2. Standby</span>
              <span className="text-[10px] font-mono opacity-60">~3800</span>
            </button>

            <button
              onClick={() => setThrottleMode('high')}
              className={`w-full py-2.5 px-4 rounded-xl flex items-center justify-between transition-all duration-150 cursor-pointer ${
                throttleMode === 'high' 
                  ? 'bg-white text-dark-black shadow-inner border border-spanish-gray/20' 
                  : 'text-aqua-dark/90 hover:text-aqua-dark'
              }`}
            >
              <span className={`text-xs font-semibold tracking-wide ${throttleMode === 'high' ? 'text-red-500' : ''}`}>3. Full Throttle</span>
              <span className="text-[10px] font-mono opacity-80">~6800</span>
            </button>
          </div>
        </div>

      </div>

      {/* DOWN SCHEME */}
      <div className="flex flex-col flex-1 w-full mt-4">
        
        {/* VISUALIZATION */}
        <div className="bg-white border-[0.5px] border-dark-gray/30 rounded-3xl p-6 flex flex-col shadow-inner relative h-full min-h-112">
          
          {/* --- BG LINES ---  */}
          <div className="absolute inset-0 opacity-20 pointer-events-none rounded-4xl" style={{ backgroundImage: 'linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          
          <div ref={containerRef} className="w-full flex-1 flex justify-center items-center transition-all duration-200" style={{ minHeight: `${360 * scale}px` }}>
            <div className="relative w-[480px] h-[360px] shrink-0 origin-center" style={{ transform: `scale(${scale})` }}>
              <style>{ANIMATION_STYLES}</style>
              
              {/* GRUBE RURY (TŁO) */}
              <svg viewBox="0 0 480 360" className="absolute inset-0 w-full h-full z-0 pointer-events-none drop-shadow-sm">
                <path d="M 260 240 L 260 210" className="path-bg stroke-red-500/30" />
                <path d="M 260 210 L 110 210 L 110 190" className="path-bg stroke-red-500/30" />
                <path d="M 260 210 L 370 210 L 370 190" className={`path-bg transition-colors duration-500 ${secondaryActive ? 'stroke-red-500/30' : 'stroke-slate-300/30'}`} />
                <path d="M 110 130 L 110 60 L 190 60" className="path-bg stroke-cyan-400/40" />
                <path d="M 370 130 L 370 60 L 290 60" className={`path-bg transition-colors duration-500 ${secondaryActive ? 'stroke-cyan-400/40' : 'stroke-slate-300/20'}`} />
                <path d="M 220 80 L 220 240" className="path-bg stroke-blue-500/40" />
                <path d="M 110 160 L 40 160 L 40 300" className="path-bg stroke-orange-300/30" />
                <path d="M 370 160 L 440 160 L 440 300" className={`path-bg transition-colors duration-500 ${secondaryActive ? 'stroke-orange-300/30' : 'stroke-slate-300/30'}`} />
              </svg>

              {/* FLOW LINES (FRONT) & SMOKE PARTICLES */}
              <svg viewBox="0 0 480 360" className="absolute inset-0 w-full h-full z-10 pointer-events-none">
                <path d="M 260 240 L 260 210" className="path-flow stroke-red-600" style={{ animationDuration: `${exhaustFlowSpeed}s` }} />
                <path d="M 260 210 L 110 210 L 110 190" className="path-flow stroke-red-500" style={{ animationDuration: `${exhaustFlowSpeed}s` }} />
                {secondaryActive && (
                  <path d="M 260 210 L 370 210 L 370 190" className="path-flow stroke-red-500" style={{ animationDuration: `${exhaustFlowSpeed}s` }} />
                )}
                {primaryActive && (
                  <path d="M 110 130 L 110 60 L 190 60" className="path-flow stroke-cyan-300" style={{ animationDuration: `${primaryFlowSpeed}s` }} />
                )}
                {secondaryActive && (
                  <path d="M 370 130 L 370 60 L 290 60" className="path-flow stroke-cyan-300" style={{ animationDuration: `${secondaryFlowSpeed}s` }} />
                )}
                <path d="M 220 80 L 220 240" className="path-flow stroke-blue-400" style={{ animationDuration: `${Math.min(primaryFlowSpeed, secondaryFlowSpeed || 99)}s` }} />
                <path d="M 110 160 L 40 160 L 40 300" className="path-flow stroke-orange-400" style={{ animationDuration: `${exhaustFlowSpeed}s` }} />
                {secondaryActive && (
                  <path d="M 370 160 L 440 160 L 440 300" className="path-flow stroke-orange-400" style={{ animationDuration: `${exhaustFlowSpeed}s` }} />
                )}

                {/* Smoke Generator */}
                <g transform="translate(40, 300)">
                  <circle cx="0" cy="0" r="5" className="smoke-particle" style={{ animationDuration: `${exhaustFlowSpeed * 1.2}s`, animationDelay: '0s' }} />
                  <circle cx="0" cy="0" r="3" className="smoke-particle" style={{ animationDuration: `${exhaustFlowSpeed * 1.2}s`, animationDelay: `${exhaustFlowSpeed * 0.4}s` }} />
                </g>
                {secondaryActive && (
                  <g transform="translate(440, 300)">
                    <circle cx="0" cy="0" r="5" className="smoke-particle" style={{ animationDuration: `${exhaustFlowSpeed * 1.2}s`, animationDelay: '0s' }} />
                    <circle cx="0" cy="0" r="3" className="smoke-particle" style={{ animationDuration: `${exhaustFlowSpeed * 1.2}s`, animationDelay: `${exhaustFlowSpeed * 0.4}s` }} />
                  </g>
                )}
              </svg>

              {/* ZAWÓR STERUJĄCY */}
              <div className="absolute top-[200px] left-[250px] w-[20px] h-[20px] bg-slate-800 border-2 border-slate-600 rounded-md z-20 flex items-center justify-center shadow-lg transition-transform duration-300">
                <div className={`w-[14px] h-[2px] bg-red-400 rounded-full transition-transform duration-500 origin-center ${secondaryActive ? 'rotate-0' : '-rotate-90'}`} />
              </div>
              <div className="absolute top-[225px] left-[260px] text-[8px] font-bold text-slate-500 uppercase tracking-widest leading-tight">
                Control<br/>Valve
              </div>

              {/* PRIMARY TURBO */}
              <div className="absolute top-[130px] left-[80px] w-[60px] h-[60px] bg-white/80 backdrop-blur-md border-[2px] border-blue-200 rounded-2xl flex items-center justify-center z-20 shadow-md">
                <Settings className={`text-blue-500 transition-all ${primaryActive ? 'turbine-spin' : ''}`} size={32} style={{ animationDuration: `${primaryFlowSpeed * 0.4}s` }} />
              </div>
              <div className="absolute top-[195px] left-[85px] text-[8px] font-bold text-blue-500 uppercase tracking-widest text-center w-[50px]">
                Primary<br/>Turbo
              </div>

              {/* SECONDARY TURBO */}
              <div className={`absolute top-[130px] left-[340px] w-[60px] h-[60px] bg-white/80 backdrop-blur-md border-[2px] rounded-2xl flex items-center justify-center z-20 shadow-md transition-colors duration-500 ${secondaryActive ? 'border-amber-400' : 'border-slate-200'}`}>
                <Settings className={`transition-all ${secondaryActive ? 'text-amber-500 turbine-spin' : 'text-slate-400 opacity-50'}`} size={32} style={{ animationDuration: secondaryActive ? `${secondaryFlowSpeed * 0.4}s` : '0s' }} />
              </div>
              <div className={`absolute top-[195px] left-[340px] text-[8px] font-bold uppercase tracking-widest text-center w-[60px] transition-colors duration-500 ${secondaryActive ? 'text-amber-500' : 'text-slate-400'}`}>
                Secondary<br/>Turbo
              </div>

              {/* INTERCOOLER */}
              <div className="absolute top-[40px] left-[190px] w-[100px] h-[40px] bg-white border-2 border-cyan-400 rounded-lg flex flex-col items-center justify-evenly z-20 shadow-md overflow-hidden">
                <div className="w-full h-[1.5px] bg-cyan-400/50" />
                <div className="w-full h-[1.5px] bg-cyan-400/50" />
                <div className="w-full h-[1.5px] bg-cyan-400/50" />
                <div className="w-full h-[1.5px] bg-cyan-400/50" />
              </div>
              <div className="absolute top-[20px] left-[200px] text-[8px] font-bold text-cyan-600 uppercase tracking-widest text-center w-[80px]">
                Intercooler
              </div>  


              <div className="absolute top-60 left-50 w-20 h-30 bg-slate-200 border-[3px] border-slate-400 rounded-xl flex flex-col justify-end p-2 z-20 shadow-lg overflow-hidden">
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
            <div className="w-full h-1.5 bg-aqua-dark/40 rounded-full mt-2 overflow-hidden flex">
              <div className="h-full bg-aqua-dark transition-all duration-75" style={{ width: `${rpmPercent * 100}%` }} />
            </div>
          </div>
          
          {/* TOTAL BOOST (JEDNOLITY CZERWONY KOLOR) */}
          <div className="flex-1 bg-white border-[0.5px] border-spanish-gray/30 rounded-2xl p-3 tablet:p-4 flex flex-col relative shadow-xs">
            <span className="text-[10px] font-bold text-dark-gray uppercase tracking-widest mb-1">Total Boost</span>
            <div className="flex items-end gap-1">
              <span className="text-xl tablet:text-2xl font-semibold text-red-500">{totalBoost.toFixed(1)}</span>
              <span className="text-sm text-dark-black font-light mb-0.5">%</span>
            </div>
            
            {/* Jednolity czerwony pasek - dokładnie jak w zwykłym turbo */}
            <div className="w-full h-1.5 bg-red-200 rounded-full mt-2 overflow-hidden flex">
              <div className="h-full bg-red-500 transition-all duration-75" style={{ width: `${totalBoost}%` }} />
            </div>
            
            <span className={`absolute top-3 right-3 tablet:top-4 tablet:right-4 text-[8px] font-bold px-1.5 py-0.5 rounded-md border transition-all duration-300 ${
              throttleMode === 'mid' && !secondaryActive ? 'text-amber-600 bg-amber-50 border-amber-300' : 
              secondaryActive ? 'text-red-600 bg-red-50 border-red-300 animate-pulse' : 'text-slate-400 border-slate-200'
            }`}>
              {secondaryActive ? 'TWIN TURBO' : throttleMode === 'mid' ? 'PRE-SPOOL' : 'LOW BOOST'}
            </span>
          </div>
        </div>
        
      </div>
    </div>
  );
}