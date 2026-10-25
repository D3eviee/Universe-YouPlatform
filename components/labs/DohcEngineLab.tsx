'use client';
import { useState, useEffect, useRef } from 'react';
import { Settings, Zap, Power, GitCommit } from 'lucide-react';

const ANIMATION_STYLES = `
  @keyframes cam-spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  @keyframes piston-move {
    0%, 50%, 100% { transform: translateY(0); }
    25%, 75% { transform: translateY(60px); }
  }
  @keyframes valve-in {
    0%, 25%, 100% { transform: translateY(0); }
    12.5% { transform: translateY(12px); }
  }
  @keyframes valve-ex {
    0%, 75%, 100% { transform: translateY(0); }
    87.5% { transform: translateY(12px); }
  }
  @keyframes spark-ignite {
    0%, 48%, 55%, 100% { opacity: 0; transform: scale(0.5); }
    50% { opacity: 1; transform: scale(1.2); }
  }
  @keyframes gas-in {
    0%, 25%, 100% { opacity: 0; }
    12.5% { opacity: 0.6; }
  }
  @keyframes gas-ex {
    0%, 75%, 100% { opacity: 0; }
    87.5% { opacity: 0.6; }
  }
  /* Efekt "Valve Float" (Pływanie zaworów przy zbyt wysokich obrotach w SOHC) */
  @keyframes valve-float {
    0% { transform: translateY(8px); }
    50% { transform: translateY(12px); }
    100% { transform: translateY(8px); }
  }
  .tech-line {
    fill: none;
    stroke: #1e293b;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  .tech-line-thin {
    fill: none;
    stroke: #64748b;
    stroke-width: 1;
    stroke-dasharray: 4 4;
  }
`;

export default function DohcEngineLab() {
  const [activeTab, setActiveTab] = useState('mechanics');
  const [techMode, setTechMode] = useState('sohc');
  const [isPressing, setIsPressing] = useState(false);
  
  // Symulacja fizyki silnika
  const [rpm, setRpm] = useState(1000);
  const [efficiency, setEfficiency] = useState(100);

  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);

  // Responsywność
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

  // Pętla fizyki obrotów i wydajności
  useEffect(() => {
    const interval = setInterval(() => {
      setRpm(prevRpm => {
        // DOHC kręci się do 8500, SOHC fizycznie limituje się przy 6000 (valve float)
        const maxAllowedRpm = techMode === 'dohc' ? 8500 : 6500;
        const targetRpm = isPressing ? maxAllowedRpm : 1000;
        
        // DOHC wkręca się szybciej (mniejsza masa układu rozrządu)
        const engineInertia = isPressing ? (techMode === 'dohc' ? 0.15 : 0.08) : 0.05; 
        return prevRpm + (targetRpm - prevRpm) * engineInertia;
      });

      setEfficiency(() => {
        if (techMode === 'dohc') return 100; // DOHC stabilne w całym zakresie
        // SOHC traci wydajność powyżej 4500 RPM z powodu bezwładności dźwigienek
        if (rpm > 4500) {
          return Math.max(40, 100 - ((rpm - 4500) / 2000) * 60);
        }
        return 100;
      });

    }, 50);
    return () => clearInterval(interval);
  }, [isPressing, rpm, techMode]);

  const rpmPercent = rpm / 9000;
  
  // Ogranicznik animacji, aby oko mogło cokolwiek zarejestrować
  const visualRpm = Math.min(rpm / 15, 60); 
  const strokeDuration = 60 / visualRpm; 
  const isValveFloating = techMode === 'sohc' && rpm > 5500;

  return (
    <div className="bg-slate-50 sm:rounded-3xl mx-auto flex flex-col py-6 px-4 sm:p-8 gap-6 border-[0.5px] border-slate-300 w-full max-w-4xl mb-6 shadow-sm font-sans text-slate-800">
      
      {/* TOP CONTENT */}
      <div className="flex flex-col w-full justify-center">
        {/* --- HEADING --- */}
        <div className="flex flex-col">
          <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Valvetrain Evolution</h3>
          <p className="text-sm text-slate-500 font-medium leading-relaxed">Discover how DOHC unlocked extreme engine RPMs</p>
        </div>
          
        {/* --- CONTENT SELECTOR --- */}
        <div className="bg-white border-[0.5px] border-slate-300 rounded-2xl p-1 flex flex-row my-4 shadow-sm">
          <button
            onClick={() => setActiveTab('mechanics')}
            className={`w-full p-2.5 text-xs font-bold tracking-wider rounded-xl transition-all duration-150 cursor-pointer ${
            activeTab === 'mechanics' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'}`}
          >
            Mechanics
          </button>
          
          <button
            onClick={() => setActiveTab('combustion')}
            className={`w-full p-2 text-xs font-bold tracking-wider rounded-xl transition-all duration-150 cursor-pointer ${
              activeTab === 'combustion' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'}`}
          >
            Combustion & Spark
          </button>
        </div>
          
        {/* EXPLANATIONS */}
        <div className="bg-white border-[0.5px] border-slate-300 rounded-2xl p-6 flex flex-col shadow-inner mb-4 min-h-[130px]">
          {activeTab === 'mechanics' && (
            <>
              <div className="flex items-center gap-2 mb-2">
                <Settings size={18} className="text-slate-900" />
                <h3 className="text-base lg:text-lg font-bold text-slate-900">Moving Mass & Valve Float</h3>
              </div>
              <p className="text-slate-600 font-medium text-sm leading-relaxed">
                Older SOHC systems rely on heavy rocker arms to push valves. At high RPMs, their inertia prevents valves from closing in time (Valve Float), destroying efficiency. DOHC pushes valves directly, eliminating the arms and unlocking massive RPMs.
              </p>
          </>
          )}
          {activeTab === 'combustion' && (
            <>
              <div className="flex items-center gap-2 mb-2">
                <Zap size={18} className="text-amber-500" />
                <h3 className="text-base lg:text-lg font-bold text-slate-900">Perfect Symmetry</h3>
              </div>
              <p className="text-slate-600 font-medium text-sm leading-relaxed">
                A single central camshaft blocks the middle of the cylinder head, forcing the spark plug to the side. DOHC splits the cams to the edges, creating a perfect central valley for the spark plug, ensuring a perfectly symmetrical, powerful explosion.
              </p>
            </>
          )}
        </div>
          
        {/* TECHNOLOGY SWITCH */}
        <div className="bg-indigo-50/50 p-1.5 rounded-2xl flex flex-row border-[0.5px] border-indigo-100">
          <button
            onClick={() => { setTechMode('sohc'); setRpm(1000); setIsPressing(false); }}
            className={`w-full flex items-center justify-center gap-2 text-xs font-bold tracking-wide rounded-xl py-2.5 transition-all duration-150 cursor-pointer  
              ${techMode === 'sohc' ? 'bg-white text-slate-900 shadow-sm border border-slate-200': 'text-slate-500 hover:text-slate-800'}`}
          >
            <GitCommit size={14} className={techMode === 'sohc' ? 'text-slate-500' : 'text-slate-400'} /> SOHC (Classic)
          </button>
          <button
            onClick={() => { setTechMode('dohc'); setRpm(1000); setIsPressing(false); }}
            className={`w-full flex items-center justify-center gap-2 text-xs font-bold tracking-wide rounded-xl py-2.5 transition-all duration-150 cursor-pointer 
              ${techMode === 'dohc' ?'bg-white text-slate-900 shadow-sm border border-slate-200': 'text-slate-500 hover:text-slate-800'}`}
          >
            <Settings size={14} className={techMode === 'dohc' ? 'text-indigo-600' : 'text-slate-400'} /> DOHC (Race Spec)
          </button>
        </div>
      </div>

      {/* DOWN SCHEME (SVG BLUEPRINT) */}
      <div className="flex flex-col flex-1 w-full mt-2">
        <div className="bg-white border-[0.5px] border-slate-300 rounded-3xl p-6 flex flex-col shadow-inner relative h-full min-h-[400px]">
          {/* Blueprint BG Lines */}
          <div className="absolute inset-0 opacity-20 pointer-events-none rounded-3xl" style={{ backgroundImage: 'linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          
           <div ref={containerRef} className="w-full flex-1 flex justify-center items-center min-h-[340px] transition-all duration-200" style={{ minHeight: `${340 * scale}px` }}>
            <div className="relative w-[480px] h-[450px] shrink-0 origin-center" style={{ transform: `scale(${scale})` }}>
              <style>{ANIMATION_STYLES}</style>
              
              <svg viewBox="0 0 400 450" className="absolute inset-0 w-full h-full pointer-events-none">
                
                {/* Oś symetrii cylindra */}
                <path d="M 200 20 L 200 430" className="tech-line-thin" />

                {/* --- BLOK SILNIKA --- */}
                <path d="M 120 220 L 120 400" className="tech-line" strokeWidth="3" />
                <path d="M 280 220 L 280 400" className="tech-line" strokeWidth="3" />
                <path d="M 50 180 L 120 180 Q 150 180 155 160 L 180 160 Q 200 150 220 160 L 245 160 Q 250 180 280 180 L 350 180" className="tech-line" strokeWidth="3" />

                {/* --- MIESZANKA I SPALINY --- */}
                <path d="M 60 160 L 140 160 L 150 180 L 120 200 L 200 200 L 200 160 Z" fill="rgba(59, 130, 246, 0.15)" style={{ animation: `gas-in ${strokeDuration}s linear infinite` }} />
                <path d="M 340 160 L 260 160 L 250 180 L 280 200 L 200 200 L 200 160 Z" fill="rgba(239, 68, 68, 0.15)" style={{ animation: `gas-ex ${strokeDuration}s linear infinite` }} />

                {/* --- TŁOK (PISTON) --- */}
                <g style={{ animation: `piston-move ${strokeDuration}s linear infinite` }}>
                  <path d="M 124 230 L 276 230 L 276 300 L 124 300 Z" fill="#f8fafc" className="tech-line" strokeWidth="2" />
                  <path d="M 150 300 C 150 280, 250 280, 250 300" className="tech-line" />
                  <line x1="120" y1="245" x2="280" y2="245" className="tech-line" />
                  <line x1="120" y1="255" x2="280" y2="255" className="tech-line" />
                  <circle cx="200" cy="280" r="10" fill="#e2e8f0" className="tech-line" />
                  <line x1="190" y1="290" x2="170" y2="400" className="tech-line" strokeWidth="6" strokeDasharray="20 5" />
                  <line x1="210" y1="290" x2="190" y2="400" className="tech-line" strokeWidth="6" strokeDasharray="20 5" />
                </g>

                {/* ========================================== */}
                {/* LOGIKA DOHC (DWIE KRZYWKI, CENTRALNA ŚWIECA) */}
                {/* ========================================== */}
                {techMode === 'dohc' && (
                  <g className="transition-opacity duration-300">
                    {/* Zawory */}
                    <g style={{ animation: `valve-in ${strokeDuration}s linear infinite` }}>
                      <line x1="160" y1="80" x2="160" y2="175" className="tech-line" strokeWidth="4" />
                      <path d="M 140 180 L 180 180 L 163 172 L 157 172 Z" fill="#e2e8f0" className="tech-line" />
                    </g>
                    <g style={{ animation: `valve-ex ${strokeDuration}s linear infinite` }}>
                      <line x1="240" y1="80" x2="240" y2="175" className="tech-line" strokeWidth="4" />
                      <path d="M 220 180 L 260 180 L 243 172 L 237 172 Z" fill="#e2e8f0" className="tech-line" />
                    </g>

                    {/* Świeca w centrum */}
                    <g transform="translate(200, 140)">
                      <rect x="-6" y="-30" width="12" height="30" fill="#fff" className="tech-line" />
                      <line x1="-2" y1="5" x2="-2" y2="15" className="tech-line" strokeWidth="2" />
                      <path d="M -5 18 L 2 28 L -1 24 L 5 28 L 0 18 Z" fill="#eab308" stroke="#ca8a04" strokeWidth="1" 
                            style={{ animation: `spark-ignite ${strokeDuration}s linear infinite`, transformOrigin: 'center' }} />
                    </g>

                    {/* Wałki */}
                    <g transform="translate(160, 60)">
                      <g style={{ animation: `cam-spin ${strokeDuration}s linear infinite`, animationDelay: `calc(${strokeDuration}s * -0.125)` }}>
                        <path d="M -15 0 C -15 -15, 15 -15, 15 0 C 15 10, 5 30, 0 30 C -5 30, -15 10, -15 0 Z" fill="#f8fafc" className="tech-line" strokeWidth="3" />
                        <circle cx="0" cy="0" r="4" fill="#1e293b" />
                      </g>
                    </g>
                    <g transform="translate(240, 60)">
                      <g style={{ animation: `cam-spin ${strokeDuration}s linear infinite`, animationDelay: `calc(${strokeDuration}s * -0.875)` }}>
                        <path d="M -15 0 C -15 -15, 15 -15, 15 0 C 15 10, 5 30, 0 30 C -5 30, -15 10, -15 0 Z" fill="#f8fafc" className="tech-line" strokeWidth="3" />
                        <circle cx="0" cy="0" r="4" fill="#1e293b" />
                      </g>
                    </g>
                  </g>
                )}

                {/* ========================================== */}
                {/* LOGIKA SOHC (JEDNA KRZYWKA, DŹWIGIENKI) */}
                {/* ========================================== */}
                {techMode === 'sohc' && (
                  <g className="transition-opacity duration-300">
                    {/* Zawory (Floating if RPM high) */}
                    <g style={{ animation: isValveFloating ? `valve-float 0.1s linear infinite` : `valve-in ${strokeDuration}s linear infinite` }}>
                      <line x1="160" y1="100" x2="160" y2="175" className="tech-line" strokeWidth="4" />
                      <path d="M 140 180 L 180 180 L 163 172 L 157 172 Z" fill="#e2e8f0" className="tech-line" />
                    </g>
                    <g style={{ animation: isValveFloating ? `valve-float 0.1s linear infinite` : `valve-ex ${strokeDuration}s linear infinite` }}>
                      <line x1="240" y1="100" x2="240" y2="175" className="tech-line" strokeWidth="4" />
                      <path d="M 220 180 L 260 180 L 243 172 L 237 172 Z" fill="#e2e8f0" className="tech-line" />
                    </g>

                    {/* Świeca z boku */}
                    <g transform="translate(130, 160) rotate(-45)">
                      <rect x="-6" y="-30" width="12" height="30" fill="#fff" className="tech-line" />
                      <line x1="-2" y1="5" x2="-2" y2="15" className="tech-line" strokeWidth="2" />
                      <path d="M -5 18 L 2 28 L -1 24 L 5 28 L 0 18 Z" fill="#eab308" stroke="#ca8a04" strokeWidth="1" 
                            style={{ animation: `spark-ignite ${strokeDuration}s linear infinite`, transformOrigin: 'center' }} />
                    </g>

                    {/* Centralny wałek i dźwigienki (Rocker Arms) */}
                    <g transform="translate(200, 60)">
                      <g style={{ animation: `cam-spin ${strokeDuration}s linear infinite` }}>
                        {/* Podwójna krzywka dla efektu SOHC */}
                        <path d="M -15 0 C -15 -15, 15 -15, 15 0 C 15 10, 25 25, 0 25 C -25 25, -15 10, -15 0 Z" fill="#f8fafc" className="tech-line" strokeWidth="3" />
                        <circle cx="0" cy="0" r="4" fill="#1e293b" />
                      </g>
                    </g>
                    {/* Dźwigienki */}
                    <path d="M 200 60 L 160 100" className="tech-line" strokeWidth="4" />
                    <path d="M 200 60 L 240 100" className="tech-line" strokeWidth="4" />
                    <circle cx="180" cy="80" r="4" fill="#94a3b8" />
                    <circle cx="220" cy="80" r="4" fill="#94a3b8" />
                  </g>
                )}

              </svg>
            </div>
          </div>
        </div>
        
        {/* TELEMETRY */}
        <div className="w-full flex flex-col sm:flex-row gap-4 relative z-30 shrink-0 mt-4">
          
          {/* ENGINE REVS */}
          <div className="flex-1 bg-white border-[0.5px] border-slate-300 rounded-2xl p-4 flex flex-col shadow-sm">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Engine Speed (RPM)</span>
            <div className="flex items-end gap-1">
              <span className="text-2xl sm:text-3xl font-bold font-mono text-slate-800">{Math.round(rpm)}</span>
              <span className="text-sm text-slate-500 font-bold mb-1">RPM</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
               <div className={`h-full transition-all duration-75 ${techMode === 'sohc' && rpm > 5500 ? 'bg-red-500' : 'bg-slate-800'}`} style={{ width: `${rpmPercent * 100}%` }} />
            </div>
          </div>
          
          {/* VALVETRAIN EFFICIENCY */}
          <div className="flex-1 bg-white border-[0.5px] border-slate-300 rounded-2xl p-4 flex flex-col relative shadow-sm">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Valvetrain Stability</span>
              <div className="flex items-end gap-1">
                <span className={`text-2xl sm:text-3xl font-bold font-mono ${efficiency < 80 ? 'text-red-600' : 'text-indigo-600'}`}>{Math.round(efficiency)}</span>
                <span className="text-sm text-slate-500 font-bold mb-1">%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
                <div className={`h-full transition-all duration-75 ${efficiency < 80 ? 'bg-red-500' : 'bg-indigo-500'}`} style={{ width: `${efficiency}%` }} />
              </div>
              
              {isPressing && (
                <span className={`absolute top-4 right-4 text-[9px] font-bold px-2 py-1 rounded-md border ${
                  efficiency < 80 ? 'text-red-600 bg-red-50 border-red-200 animate-pulse' : 'text-indigo-700 bg-indigo-50 border-indigo-200'
              }`}>
                {efficiency < 80 ? 'VALVE FLOAT DETECTED' : 'STABLE OPERATION'}
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
            className={`w-full py-3.5 px-4 z-30 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 select-none cursor-pointer
              ${isPressing ? 'bg-indigo-600 text-white shadow-inner scale-[0.98]' : 'bg-slate-900 text-white shadow-md hover:bg-slate-800 hover:-translate-y-0.5'}`}
          >
            <Power size={20} className={isPressing ? 'animate-pulse' : ''} />
            <span className="font-bold tracking-widest text-sm uppercase">{isPressing ? 'Full Throttle Active' : 'Step on the gas'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}