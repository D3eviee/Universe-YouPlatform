'use client';

import { useState, useEffect } from 'react';
import { Settings, Wind, Flame, ThermometerSnowflake, Power, Gauge } from 'lucide-react';

type TabMode = 'flow' | 'cooling' | 'lag';
type TurboMode = 'classic' | 'modern';

export default function TurbochargerLab(){
  const [activeTab, setActiveTab] = useState<TabMode>('flow');
  const [turboMode, setTurboMode] = useState<TurboMode>('classic');
  
  const [isPressing, setIsPressing] = useState(false);
  
  // Symulacja fizyki
  const [rpm, setRpm] = useState(1000);
  const [boost, setBoost] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      
      // 1. Fizyka Silnika
      setRpm(prevRpm => {
        const targetRpm = isPressing ? 7000 : 1000;
        const engineInertia = isPressing ? 0.12 : 0.05; 
        return prevRpm + (targetRpm - prevRpm) * engineInertia;
      });

      // 2. Fizyka Turbiny
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
  
  // Prędkość animacji przepływu
  const exhaustFlowSpeed = 2 - (rpmPercent * 1.5);
  const intakeFlowSpeed = 2 - (boostPercent / 100 * 1.8);

  return (
    <div className="px-4 py-6 font-sans mx-auto bg-light-gray rounded-4xl flex flex-col md:flex-row gap-6 border-[0.5px] border-dark-gray/20 w-[86.5%] tablet:w-143 laptop:w-162 laptop:text-lg">
      
      {/* --- LEWA KOLUMNA: TREŚCI I KONTROLKI --- */}
      <div className="flex flex-col flex-1 w-full md:w-1/2 justify-center">
        
        <div className="flex flex-col mb-5">
          <h3 className="text-2xl font-medium text-dark-black leading-none mb-2">Zasada Działania Turbo</h3>
          <p className="text-sm text-dark-gray leading-relaxed">Przepływ gazów, ciśnienie i zjawisko opóźnienia</p>
        </div>

        <div className="bg-white border-[0.5px] border-hover/30 rounded-2xl p-1 flex flex-row flex-wrap mb-4">
         <button
            onClick={() => setActiveTab('flow')}
            className={`flex-1 py-2 text-[11px] font-base tracking-wider rounded-xl transition-all duration-300 cursor-pointer ${
              activeTab === 'flow' ? 'bg-dark-black text-white shadow-md' : 'text-dark-gray hover:bg-slate-50 hover:text-dark-black'
            }`}
          >
            Przepływ
          </button>
          <button
            onClick={() => setActiveTab('cooling')}
            className={`flex-1 py-2 text-[11px] font-base tracking-wider rounded-xl transition-all duration-300 cursor-pointer ${
              activeTab === 'cooling' ? 'bg-dark-black text-white shadow-md' : 'text-dark-gray hover:bg-slate-50 hover:text-dark-black'
            }`}
          >
            Chłodzenie
          </button>
          <button
            onClick={() => setActiveTab('lag')}
            className={`flex-1 py-2 text-[11px] font-base tracking-wider rounded-xl transition-all duration-300 cursor-pointer ${
              activeTab === 'lag' ? 'bg-dark-black text-white shadow-md' : 'text-dark-gray hover:bg-slate-50 hover:text-dark-black'
            }`}
          >
            Turbo Lag
          </button>
        </div>

        <div className="bg-white border-[0.5px] border-dark-gray/30 rounded-3xl p-6 flex flex-col gap-2 shadow-inner relative overflow-hidden flex-1 min-h-[160px] mb-4">
          {activeTab === 'flow' && (
            <>
              <div className="flex items-center gap-2 mb-1">
                <Settings size={18} className="text-dark-black" />
                <h3 className="text-base laptop:text-lg font-semibold text-dark-black">Energia Spalin</h3>
              </div>
              <p className="text-dark-gray font-normal text-xs laptop:text-sm leading-relaxed">
                Turbosprężarka napędzana jest energią wylatujących spalin. Gazy uderzają w wirnik turbiny (prawa strona), który poprzez wspólny wałek napędza koło kompresji (lewa strona), tłocząc masy powietrza do silnika.
              </p>
            </>
          )}
          {activeTab === 'cooling' && (
            <>
              <div className="flex items-center gap-2 mb-1">
                <ThermometerSnowflake size={18} className="text-blue-500" />
                <h3 className="text-base laptop:text-lg font-semibold text-dark-black">Intercooler (Chłodzenie)</h3>
              </div>
              <p className="text-dark-gray font-normal text-xs laptop:text-sm leading-relaxed">
                Fizyka gazów sprawia, że przy sprężaniu rośnie ich temperatura. Aby zmieścić jak najwięcej tlenu w cylindrze, powietrze schładzane jest w dolnym intercoolerze, stając się dużo gęstsze (ciemnoniebieski szlak).
              </p>
            </>
          )}
          {activeTab === 'lag' && (
            <>
              <div className="flex items-center gap-2 mb-1">
                <Wind size={18} className="text-amber-500" />
                <h3 className="text-base laptop:text-lg font-semibold text-dark-black">Ewolucja i "Turbo Lag"</h3>
              </div>
              <p className="text-dark-gray font-normal text-xs laptop:text-sm leading-relaxed">
                Wczesne turbiny potrzebowały czasu, by rozpędzić masywny wirnik ze stanu spoczynku (tzw. turbodziura). Dziś zoptymalizowana geometria pozwala na natychmiastową reakcję. <strong>Przełącz tryb poniżej, wciśnij gaz i poczuj różnicę.</strong>
              </p>
            </>
          )}
        </div>

        {/* PRZEŁĄCZNIK TECHNOLOGII */}
        <div className="bg-slate-200/50 p-1.5 rounded-2xl flex flex-row mb-4 border border-slate-200">
          <button
            onClick={() => { setTurboMode('classic'); setBoost(0); setRpm(1000); setIsPressing(false); }}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-semibold tracking-wide rounded-xl transition-all duration-300 ${
              turboMode === 'classic' 
                ? 'bg-white text-dark-black shadow-[0_2px_8px_rgba(0,0,0,0.08)]' 
                : 'text-slate-500 hover:text-dark-black'
            }`}
          >
            <Gauge size={14} className={turboMode === 'classic' ? 'text-amber-500' : 'text-slate-400'} />
            Klasyczne (Lag)
          </button>
          <button
            onClick={() => { setTurboMode('modern'); setBoost(0); setRpm(1000); setIsPressing(false); }}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-semibold tracking-wide rounded-xl transition-all duration-300 ${
              turboMode === 'modern' 
                ? 'bg-white text-dark-black shadow-[0_2px_8px_rgba(0,0,0,0.08)]' 
                : 'text-slate-500 hover:text-dark-black'
            }`}
          >
            <Settings size={14} className={turboMode === 'modern' ? 'text-blue-500' : 'text-slate-400'} />
            Nowoczesne (Twin-Scroll)
          </button>
        </div>

        {/* PRZEPUSTNICA */}
        <div className="flex flex-col items-center">
          <button
            onMouseDown={() => setIsPressing(true)}
            onMouseUp={() => setIsPressing(false)}
            onMouseLeave={() => setIsPressing(false)}
            onTouchStart={() => setIsPressing(true)}
            onTouchEnd={() => setIsPressing(false)}
            className={`w-full py-4 rounded-3xl flex items-center justify-center gap-3 transition-all duration-200 select-none ${
              isPressing 
                ? 'bg-red-500 text-white shadow-[inset_0_4px_12px_rgba(0,0,0,0.3)] scale-[0.98]' 
                : 'bg-dark-black text-white shadow-[0_8px_20px_rgba(0,0,0,0.2)] hover:bg-black/80 hover:shadow-[0_12px_24px_rgba(0,0,0,0.3)] hover:-translate-y-0.5'
            }`}
          >
            <Power size={20} className={isPressing ? 'animate-pulse' : ''} />
            <span className="font-bold tracking-widest text-sm">
              {isPressing ? 'GAZ W PODŁODZE!' : 'WCIŚNIJ I PRZYTRZYMAJ GAZ'}
            </span>
          </button>
        </div>

      </div>

      {/* --- PRAWA KOLUMNA: WIZUALIZACJA (Nowy Układ ze Szkicu) --- */}
      <div className="flex flex-col flex-1 w-full md:w-1/2">
        <div className="bg-white border-[0.5px] border-dark-gray/30 rounded-4xl p-6 flex flex-col items-center shadow-inner relative overflow-hidden h-full min-h-[460px]">
            
            {/* Siatka Blueprint */}
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

            {/* KONTENER WIZUALIZACJI */}
            <div className="relative w-full h-[320px] mt-4 scale-[0.95] laptop:scale-100 origin-top">
              
              <style>{`
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
              `}</style>

              {/* GRUBE RURY (TŁO) - Odwzorowanie przepływów ze zdjęcia */}
              <svg viewBox="0 0 400 320" className="absolute inset-0 w-full h-full z-0 pointer-events-none drop-shadow-sm">
                
                {/* Air Drawn In (Lewa strona -> Środek kompresora) */}
                <path d="M 10 160 Q 60 140 130 110" className="path-bg stroke-blue-200/50" />
                
                {/* Compressed Air (Z kompresora w dół, zawijas w prawo do intercoolera) */}
                <path d="M 130 110 C 130 200, 110 280, 160 280 L 250 280" className="path-bg stroke-cyan-300/40" />
                
                {/* Cooled Air (Z intercoolera do silnika w prawo i lekko w górę) */}
                <path d="M 330 280 Q 360 280 390 250" className="path-bg stroke-cyan-400/50" />
                
                {/* Exhaust In (Z góry z lewej -> uderza z zewnątrz w wirnik turbiny) */}
                <path d="M 160 10 Q 230 10 230 110" className="path-bg stroke-red-500/30" />
                
                {/* Exhaust Out (Z osi turbiny w górę i prawo) */}
                <path d="M 230 110 L 380 60" className="path-bg stroke-orange-300/40" />

                {/* Centralny wałek (Wał łączący wirniki) */}
                <path d="M 130 110 L 230 110" fill="none" stroke="#475569" strokeWidth="4" className="opacity-80" />
              </svg>

              {/* LINIE PRZEPŁYWU (ANIMOWANE) */}
              <svg viewBox="0 0 400 320" className="absolute inset-0 w-full h-full z-10 pointer-events-none">
                <path d="M 10 160 Q 60 140 130 110" className="path-flow stroke-blue-400" style={{ animationDuration: `${intakeFlowSpeed}s` }} />
                <path d="M 130 110 C 130 200, 110 280, 160 280 L 250 280" className="path-flow stroke-cyan-500" style={{ animationDuration: `${intakeFlowSpeed}s` }} />
                <path d="M 330 280 Q 360 280 390 250" className="path-flow stroke-cyan-600" style={{ animationDuration: `${intakeFlowSpeed}s` }} />
                <path d="M 160 10 Q 230 10 230 110" className="path-flow stroke-red-600" style={{ animationDuration: `${exhaustFlowSpeed}s` }} />
                <path d="M 230 110 L 380 60" className="path-flow stroke-orange-400" style={{ animationDuration: `${exhaustFlowSpeed}s` }} />
              </svg>

              {/* --- KORPUS TURBOSPRĘŻARKI --- */}
              
              {/* OBUDOWA KOMPRESORA (Zimna, Niebieskawa - Lewa) */}
              <div className="absolute top-[60px] left-[80px] w-[90px] h-[100px] border-[3px] border-slate-300/80 bg-white/60 backdrop-blur-md rounded-l-full rounded-tr-[40px] rounded-br-[10px] flex items-center justify-center z-20 shadow-md">
                {/* WIRNIK (Impeller) */}
                <Settings className="text-blue-500 turbine-spin scale-[1.6]" size={32} style={{ animationDuration: `${intakeFlowSpeed * 0.4}s` }} />
              </div>

              {/* ŁĄCZNIK (Bearing Housing / Oś centralna) */}
              <div className="absolute top-[80px] left-[150px] w-[50px] h-[60px] border-y-[3px] border-slate-300/80 bg-slate-100 z-10 flex flex-col justify-evenly py-2">
                 <div className="w-full h-px bg-slate-300" />
                 <div className="w-full h-px bg-slate-300" />
                 <div className="w-full h-px bg-slate-300" />
              </div>

              {/* OBUDOWA TURBINY (Gorąca, Czerwonawa - Prawa) */}
              <div className="absolute top-[60px] left-[180px] w-[90px] h-[100px] border-[3px] border-slate-300/80 bg-white/60 backdrop-blur-md rounded-r-full rounded-tl-[40px] rounded-bl-[10px] flex items-center justify-center z-20 shadow-md">
                {/* WIRNIK TURBINY (Fan) */}
                <Settings className="text-red-500 turbine-spin scale-[1.6]" size={32} style={{ animationDuration: `${exhaustFlowSpeed * 0.4}s` }} />
              </div>

              {/* --- INTERCOOLER (Prawy Dół) --- */}
              <div className="absolute top-[250px] left-[250px] w-[80px] h-[60px] bg-white border-[2px] border-cyan-400 rounded-lg flex flex-col items-center justify-evenly z-20 shadow-md overflow-hidden transform -skew-x-6">
                 {/* Lamele chłodnicy */}
                 <div className="w-full h-[2px] bg-cyan-400/50" />
                 <div className="w-full h-[2px] bg-cyan-400/50" />
                 <div className="w-full h-[2px] bg-cyan-400/50" />
                 <div className="w-full h-[2px] bg-cyan-400/50" />
                 <div className="w-full h-[2px] bg-cyan-400/50" />
              </div>

              {/* --- ETYKIETY (Zgodne z dostarczonym szkicem) --- */}
              <div className="absolute top-[170px] -left-[10px] text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-tight">
                Air<br/>drawn in
              </div>
              <div className="absolute top-[40px] left-[70px] text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                Compressor Housing
              </div>
              <div className="absolute top-[165px] left-[85px] text-[8px] font-bold text-blue-500 uppercase tracking-widest flex items-center gap-1">
                <div className="w-4 h-px bg-slate-300 rotate-[-45deg] origin-right" />
                Impeller
              </div>
              
              <div className="absolute top-[10px] left-[250px] text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-tight">
                Exhaust gas in
              </div>
              <div className="absolute top-[35px] right-[10px] text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-tight">
                Exhaust gas out
              </div>
              <div className="absolute top-[170px] left-[250px] text-[9px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
                Turbine Housing
                <div className="w-4 h-px bg-slate-300 rotate-[-45deg] origin-left" />
              </div>

              <div className="absolute top-[300px] left-[140px] text-[9px] font-bold text-cyan-600 uppercase tracking-widest">
                Compressed air
              </div>
              <div className="absolute top-[315px] left-[260px] text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                Intercooler
              </div>
              
              {/* Etykieta przy wyjściu do silnika */}
              <div className="absolute top-[210px] right-[-10px] text-[8px] font-bold text-cyan-700 uppercase tracking-wide text-right w-[110px] leading-tight">
                Cooled and compressed air forced into cylinders
              </div>

            </div>

            {/* TELEMETRIA NA DOLE */}
            <div className="w-full flex gap-4 mt-6">
              <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-3 flex flex-col">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Obroty Silnika (RPM)</span>
                <div className="flex items-end gap-1">
                  <span className="font-mono text-xl font-semibold text-dark-black">{Math.round(rpm)}</span>
                  <span className="text-xs text-slate-500 mb-0.5">rpm</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-slate-500 transition-all duration-75" style={{ width: `${rpmPercent * 100}%` }} />
                </div>
              </div>

              <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-3 flex flex-col relative overflow-hidden">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Doładowanie (Boost)</span>
                <div className="flex items-end gap-1">
                  <span className="font-mono text-xl font-semibold text-red-500">{boostPercent.toFixed(1)}</span>
                  <span className="text-xs text-slate-500 mb-0.5">%</span>
                </div>
                <div className="w-full h-1.5 bg-red-100 rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-red-500 transition-all duration-75" style={{ width: `${boostPercent}%` }} />
                </div>
                
                {isPressing && rpm > 3000 && boostPercent < (turboMode === 'classic' ? 70 : 90) && (
                  <span className={`absolute top-3 right-3 text-[8px] font-bold px-1.5 py-0.5 rounded-md border ${
                    turboMode === 'classic' ? 'text-amber-500 bg-amber-50 border-amber-200 animate-pulse' : 'text-blue-500 bg-blue-50 border-blue-200'
                  }`}>
                    {turboMode === 'classic' ? 'SPOOLING...' : 'INSTANT BOOST'}
                  </span>
                )}
              </div>
            </div>

        </div>
      </div>

    </div>
  );
}