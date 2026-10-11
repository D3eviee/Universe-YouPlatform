'use client';

import { useState, useEffect } from 'react';
import { Settings, Wind, Flame, Gauge, ArrowRightLeft, Activity } from 'lucide-react';

type TabMode = 'flow' | 'sequential' | 'transition';
type ThrottleMode = 'low' | 'mid' | 'high';

export default function SequentialTwinTurboLab (){
  const [activeTab, setActiveTab] = useState<TabMode>('flow');
  
  // Trzy stany przepustnicy zamiast prostego "przytrzymaj"
  const [throttleMode, setThrottleMode] = useState<ThrottleMode>('low');
  
  // Symulacja fizyki
  const [rpm, setRpm] = useState(1000);
  const [primaryBoost, setPrimaryBoost] = useState(0);
  const [secondaryBoost, setSecondaryBoost] = useState(0);

  // Próg otwarcia drugiej turbiny
  const SECONDARY_TURBO_THRESHOLD = 4000;

  useEffect(() => {
    const interval = setInterval(() => {
      
      // 1. Fizyka Silnika (RPM dąży do docelowej wartości dla danego trybu)
      setRpm(prevRpm => {
        let targetRpm = 1000;
        if (throttleMode === 'low') targetRpm = 1800;
        if (throttleMode === 'mid') targetRpm = 3800; // Tuż przed otwarciem drugiego turbo!
        if (throttleMode === 'high') targetRpm = 6800;

        const engineInertia = 0.08; // Płynne wejście na obroty
        return prevRpm + (targetRpm - prevRpm) * engineInertia;
      });

      // 2. Turbina Główna (Primary)
      setPrimaryBoost(prev => {
        const target = rpm > 1200 ? Math.min(((rpm - 1200) / 2600) * 50, 50) : 0;
        return prev + (target - prev) * 0.1;
      });

      // 3. Turbina Pomocnicza (Secondary) - wchodzi DOPIERO powyżej 4000
      setSecondaryBoost(prev => {
        const target = rpm > SECONDARY_TURBO_THRESHOLD ? ((rpm - SECONDARY_TURBO_THRESHOLD) / 2800) * 50 : 0;
        return prev + (target - prev) * 0.08;
      });

    }, 50);

    return () => clearInterval(interval);
  }, [throttleMode, rpm]);

  const totalBoost = Math.max(0, Math.min(100, primaryBoost + secondaryBoost));
  const rpmPercent = (rpm - 1000) / 6000;
  
  const primaryActive = rpm > 1200;
  const secondaryActive = rpm > SECONDARY_TURBO_THRESHOLD;

  const primaryFlowSpeed = primaryActive ? Math.max(0.2, 2 - (primaryBoost / 50 * 1.8)) : 0;
  const secondaryFlowSpeed = secondaryActive ? Math.max(0.2, 2 - (secondaryBoost / 50 * 1.8)) : 0;
  const exhaustFlowSpeed = Math.max(0.2, 2 - (rpmPercent * 1.5));

  return (
    <div className="px-4 py-6 font-sans mx-auto bg-light-gray rounded-4xl flex flex-col md:flex-row gap-6 border-[0.5px] border-dark-gray/20 w-[86.5%] tablet:w-143 laptop:w-162 laptop:text-lg">
      
      {/* --- LEWA KOLUMNA: TREŚCI I KONTROLKI --- */}
      <div className="flex flex-col flex-1 w-full md:w-1/2 justify-center">
        
        <div className="flex flex-col mb-5">
          <h3 className="text-2xl font-medium text-dark-black leading-none mb-2">Sekwencyjne Twin-Turbo</h3>
          <p className="text-sm text-dark-gray leading-relaxed">Architektura rodem z Porsche 959</p>
        </div>

        <div className="bg-white border-[0.5px] border-hover/30 rounded-2xl p-1 flex flex-row flex-wrap mb-4">
         <button
            onClick={() => setActiveTab('flow')}
            className={`flex-1 py-2 text-[11px] font-base tracking-wider rounded-xl transition-all duration-300 cursor-pointer ${
              activeTab === 'flow' ? 'bg-dark-black text-white shadow-md' : 'text-dark-gray hover:bg-slate-50 hover:text-dark-black'
            }`}
          >
            Układ
          </button>
          <button
            onClick={() => setActiveTab('sequential')}
            className={`flex-1 py-2 text-[11px] font-base tracking-wider rounded-xl transition-all duration-300 cursor-pointer ${
              activeTab === 'sequential' ? 'bg-dark-black text-white shadow-md' : 'text-dark-gray hover:bg-slate-50 hover:text-dark-black'
            }`}
          >
            Sekwencja
          </button>
          <button
            onClick={() => setActiveTab('transition')}
            className={`flex-1 py-2 text-[11px] font-base tracking-wider rounded-xl transition-all duration-300 cursor-pointer ${
              activeTab === 'transition' ? 'bg-dark-black text-white shadow-md' : 'text-dark-gray hover:bg-slate-50 hover:text-dark-black'
            }`}
          >
            Brak Laga
          </button>
        </div>

        <div className="bg-white border-[0.5px] border-dark-gray/30 rounded-3xl p-6 flex flex-col gap-2 shadow-inner relative overflow-hidden flex-1 min-h-[160px] mb-4">
          {activeTab === 'flow' && (
            <>
              <div className="flex items-center gap-2 mb-1">
                <ArrowRightLeft size={18} className="text-dark-black" />
                <h3 className="text-base laptop:text-lg font-semibold text-dark-black">Podział Spalin</h3>
              </div>
              <p className="text-dark-gray font-normal text-xs laptop:text-sm leading-relaxed">
                Zamiast jednej wielkiej turbiny, układ posiada dwie mniejsze. Zawór w układzie wydechowym (na środku) decyduje, czy spaliny zasilają tylko lewą turbinę, czy rozdzielają się na obie jednocześnie.
              </p>
            </>
          )}
          {activeTab === 'sequential' && (
            <>
              <div className="flex items-center gap-2 mb-1">
                <Gauge size={18} className="text-blue-500" />
                <h3 className="text-base laptop:text-lg font-semibold text-dark-black">Dwa Etapy (Staging)</h3>
              </div>
              <p className="text-dark-gray font-normal text-xs laptop:text-sm leading-relaxed">
                Poniżej 4000 RPM pracuje <strong>tylko Główna Turbina</strong>. Przebicie granicy 4000 RPM otwiera zawór i budzi do życia <strong>Pomocniczą Turbinę</strong>, dodając drugie 50% potężnego ciśnienia.
              </p>
            </>
          )}
          {activeTab === 'transition' && (
            <>
              <div className="flex items-center gap-2 mb-1">
                <Wind size={18} className="text-amber-500" />
                <h3 className="text-base laptop:text-lg font-semibold text-dark-black">Zawsze w Gotowości</h3>
              </div>
              <p className="text-dark-gray font-normal text-xs laptop:text-sm leading-relaxed">
                Tryb "Gotowość" to kwintesencja tego inżynieryjnego cudu. Główna turbina jest na pełnych obrotach pompując maksymalne 50%, podczas gdy druga czeka uśpiona. Brak laga przy wdepnięciu gazu w podłogę.
              </p>
            </>
          )}
        </div>

        {/* --- 3 OPCJE PRZEPUSTNICY --- */}
        <div className="flex flex-col gap-2 w-full">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Activity size={14} className="text-slate-400" />
            <span className="text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase">Obciążenie Silnika (Gaz)</span>
          </div>
          
          {/* Opcja 1: Wolno */}
          <button
            onClick={() => setThrottleMode('low')}
            className={`w-full py-3 px-4 rounded-2xl flex items-center justify-between transition-all duration-300 border ${
              throttleMode === 'low' 
                ? 'bg-white border-blue-400 shadow-md scale-[1.02]' 
                : 'bg-white/50 border-slate-200 text-slate-500 hover:bg-white hover:border-slate-300'
            }`}
          >
            <span className={`text-sm font-semibold ${throttleMode === 'low' ? 'text-blue-600' : 'text-slate-500'}`}>1. Spokojna Jazda</span>
            <span className="text-[10px] font-mono font-medium opacity-60">~1800 RPM</span>
          </button>

          {/* Opcja 2: Gotowość */}
          <button
            onClick={() => setThrottleMode('mid')}
            className={`w-full py-3 px-4 rounded-2xl flex items-center justify-between transition-all duration-300 border ${
              throttleMode === 'mid' 
                ? 'bg-white border-amber-400 shadow-md scale-[1.02]' 
                : 'bg-white/50 border-slate-200 text-slate-500 hover:bg-white hover:border-slate-300'
            }`}
          >
            <span className={`text-sm font-semibold ${throttleMode === 'mid' ? 'text-amber-500' : 'text-slate-500'}`}>2. Gotowość (Pre-Spool)</span>
            <span className="text-[10px] font-mono font-medium opacity-60">~3800 RPM</span>
          </button>

          {/* Opcja 3: Full */}
          <button
            onClick={() => setThrottleMode('high')}
            className={`w-full py-3 px-4 rounded-2xl flex items-center justify-between transition-all duration-300 border ${
              throttleMode === 'high' 
                ? 'bg-red-500 border-red-600 shadow-md scale-[1.02] text-white' 
                : 'bg-white/50 border-slate-200 text-slate-500 hover:bg-white hover:border-slate-300'
            }`}
          >
            <span className={`text-sm font-semibold ${throttleMode === 'high' ? 'text-white' : 'text-slate-500'}`}>3. Pełna Moc (Otwarty na full)</span>
            <span className="text-[10px] font-mono font-medium opacity-80">~6800 RPM</span>
          </button>
        </div>

      </div>

      {/* --- PRAWA KOLUMNA: WIZUALIZACJA --- */}
      <div className="flex flex-col flex-1 w-full md:w-1/2">
        <div className="bg-white border-[0.5px] border-dark-gray/30 rounded-4xl p-6 flex flex-col items-center shadow-inner relative overflow-hidden h-full min-h-[460px]">
            
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

            {/* KONTENER WIZUALIZACJI */}
            <div className="relative w-full h-[320px] mt-4 scale-95 tablet:scale-100 origin-top">
              
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
                  stroke-width: 16;
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

              {/* GRUBE RURY (TŁO) */}
              <svg viewBox="0 0 400 320" className="absolute inset-0 w-full h-full z-0 pointer-events-none drop-shadow-sm">
                
                {/* Spaliny z silnika w górę do rozdzielacza */}
                <path d="M 200 240 L 200 160" className="path-bg stroke-red-500/30" />
                
                {/* Rozdzielacz -> Primary Turbo (Lewa) */}
                <path d="M 200 160 L 120 160 L 120 110" className="path-bg stroke-red-500/30" />
                
                {/* Rozdzielacz -> Secondary Turbo (Prawa - aktywna tylko powyżej 4000RPM) */}
                <path d="M 200 160 L 280 160 L 280 110" className={`path-bg transition-colors duration-500 ${secondaryActive ? 'stroke-red-500/30' : 'stroke-slate-300/30'}`} />

                {/* Primary Intake -> Intercooler */}
                <path d="M 90 60 L 90 20 L 180 20 L 180 60" className="path-bg stroke-cyan-400/40" />
                
                {/* Secondary Intake -> Intercooler */}
                <path d="M 310 60 L 310 20 L 220 20 L 220 60" className={`path-bg transition-colors duration-500 ${secondaryActive ? 'stroke-cyan-400/40' : 'stroke-slate-300/20'}`} />
                
                {/* Z Intercoolera do silnika */}
                <path d="M 200 100 L 200 140" className="path-bg stroke-blue-500/40" />
              </svg>

              {/* ANIMOWANE LINIE PRZEPŁYWU */}
              <svg viewBox="0 0 400 320" className="absolute inset-0 w-full h-full z-10 pointer-events-none">
                
                {/* Spaliny (Główne) */}
                <path d="M 200 240 L 200 160" className="path-flow stroke-red-600" style={{ animationDuration: `${exhaustFlowSpeed}s` }} />
                
                {/* Spaliny do Primary */}
                <path d="M 200 160 L 120 160 L 120 110" className="path-flow stroke-red-500" style={{ animationDuration: `${exhaustFlowSpeed}s` }} />
                
                {/* Spaliny do Secondary (Tylko jeśli aktywne) */}
                {secondaryActive && (
                  <path d="M 200 160 L 280 160 L 280 110" className="path-flow stroke-red-500" style={{ animationDuration: `${exhaustFlowSpeed}s` }} />
                )}

                {/* Powietrze z Primary */}
                {primaryActive && (
                  <path d="M 90 60 L 90 20 L 180 20 L 180 60" className="path-flow stroke-cyan-300" style={{ animationDuration: `${primaryFlowSpeed}s` }} />
                )}

                {/* Powietrze z Secondary */}
                {secondaryActive && (
                  <path d="M 310 60 L 310 20 L 220 20 L 220 60" className="path-flow stroke-cyan-300" style={{ animationDuration: `${secondaryFlowSpeed}s` }} />
                )}
                
                {/* Powietrze do Silnika (Suma) */}
                <path d="M 200 100 L 200 140" className="path-flow stroke-blue-400" style={{ animationDuration: `${Math.min(primaryFlowSpeed, secondaryFlowSpeed || 99)}s` }} />
              </svg>

              {/* --- KOMPONENTY FIZYCZNE --- */}
              
              {/* ZAWÓR STERUJĄCY (Control Valve na środku wydechu) */}
              <div className="absolute top-[150px] left-[185px] w-[30px] h-[20px] bg-slate-800 border-2 border-slate-600 rounded-md z-20 flex items-center justify-center shadow-lg transition-transform duration-300">
                <div className={`w-[20px] h-[3px] bg-red-400 rounded-full transition-transform duration-500 origin-center ${secondaryActive ? 'rotate-0' : 'rotate-45'}`} />
              </div>
              <div className="absolute top-[148px] left-[225px] text-[8px] font-bold text-slate-500 uppercase tracking-widest leading-tight">
                Control<br/>Valve
              </div>

              {/* 1. PRIMARY TURBO (Lewa) */}
              <div className="absolute top-[60px] left-[70px] w-[60px] h-[50px] bg-white/80 backdrop-blur-md border-[2px] border-blue-200 rounded-2xl flex items-center justify-center z-20 shadow-md">
                <Settings className={`text-blue-500 transition-all ${primaryActive ? 'turbine-spin' : ''}`} size={28} style={{ animationDuration: `${primaryFlowSpeed}s` }} />
              </div>
              <div className="absolute top-[115px] left-[70px] text-[8px] font-bold text-blue-500 uppercase tracking-widest text-center w-[60px]">
                Primary<br/>Turbo
              </div>

              {/* 2. SECONDARY TURBO (Prawa) */}
              <div className={`absolute top-[60px] left-[270px] w-[60px] h-[50px] bg-white/80 backdrop-blur-md border-[2px] rounded-2xl flex items-center justify-center z-20 shadow-md transition-colors duration-500 ${secondaryActive ? 'border-amber-400' : 'border-slate-200'}`}>
                <Settings className={`transition-all ${secondaryActive ? 'text-amber-500 turbine-spin' : 'text-slate-400 opacity-50'}`} size={28} style={{ animationDuration: secondaryActive ? `${secondaryFlowSpeed}s` : '0s' }} />
              </div>
              <div className={`absolute top-[115px] left-[265px] text-[8px] font-bold uppercase tracking-widest text-center w-[70px] transition-colors duration-500 ${secondaryActive ? 'text-amber-500' : 'text-slate-400'}`}>
                Secondary<br/>Turbo
              </div>

              {/* 3. INTERCOOLER (Centralny, na górze) */}
              <div className="absolute top-[60px] left-[160px] w-[80px] h-[40px] bg-gradient-to-b from-blue-50 to-cyan-50 border-[2px] border-cyan-400 rounded-lg flex flex-col items-center justify-evenly z-20 shadow-md overflow-hidden">
                 <div className="w-full h-[1.5px] bg-cyan-400/50" />
                 <div className="w-full h-[1.5px] bg-cyan-400/50" />
                 <div className="w-full h-[1.5px] bg-cyan-400/50" />
                 <div className="w-full h-[1.5px] bg-cyan-400/50" />
              </div>

              {/* 4. SILNIK */}
              <div className="absolute top-[220px] left-[160px] w-[80px] h-[70px] z-20">
                <div className="absolute inset-0 bg-slate-700 border-2 border-slate-600 rounded-lg shadow-xl flex flex-col items-center justify-center">
                  <Flame className="text-orange-500 transition-opacity duration-300" size={24} style={{ opacity: 0.2 + (rpmPercent * 0.8) }} />
                  <span className="text-[10px] font-bold tracking-widest text-white/70 mt-1">ENGINE</span>
                </div>
              </div>

            </div>

            {/* TELEMETRIA NA DOLE */}
            <div className="w-full flex gap-4 mt-6">
              
              {/* RPM */}
              <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-3 flex flex-col relative overflow-hidden">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Obroty Silnika</span>
                <div className="flex items-end gap-1">
                  <span className="font-mono text-xl font-semibold text-dark-black">{Math.round(rpm)}</span>
                  <span className="text-xs text-slate-500 mb-0.5">rpm</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full mt-2 overflow-hidden flex">
                  <div className="h-full bg-slate-500 transition-all duration-75" style={{ width: `${rpmPercent * 100}%` }} />
                </div>
                {/* Znacznik 4000 RPM (Zawór) */}
                <div className="absolute bottom-3 left-[66%] w-[2px] h-3 bg-red-400" />
                <span className={`absolute bottom-6 left-[61%] text-[7px] font-bold tracking-wider transition-colors duration-300 ${secondaryActive ? 'text-red-500' : 'text-slate-400'}`}>VALVE</span>
              </div>

              {/* BOOST */}
              <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-3 flex flex-col relative overflow-hidden">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Boost</span>
                <div className="flex items-end gap-1">
                  <span className="font-mono text-xl font-semibold text-red-500">{totalBoost.toFixed(1)}</span>
                  <span className="text-xs text-slate-500 mb-0.5">%</span>
                </div>
                
                {/* Pasek postępu z podziałem na turbiny */}
                <div className="w-full h-1.5 bg-slate-200 rounded-full mt-2 overflow-hidden flex">
                  {/* Wkład Primary Turbo (Niebieski) */}
                  <div className="h-full bg-blue-400 transition-all duration-75" style={{ width: `${primaryBoost}%` }} />
                  {/* Wkład Secondary Turbo (Bursztynowy) */}
                  <div className="h-full bg-amber-400 transition-all duration-75" style={{ width: `${secondaryBoost}%` }} />
                </div>

                {/* Powiadomienia w czasie rzeczywistym zależne od wybranego trybu */}
                <span className={`absolute top-3 right-3 text-[8px] font-bold px-1.5 py-0.5 rounded-md border transition-all duration-300 ${
                  throttleMode === 'mid' && !secondaryActive ? 'text-amber-600 bg-amber-50 border-amber-300' : 
                  secondaryActive ? 'text-red-600 bg-red-50 border-red-300 animate-pulse' : 'text-slate-400 border-slate-200'
                }`}>
                  {secondaryActive ? 'TWIN TURBO ACTIVE!' : throttleMode === 'mid' ? 'STANDBY MODE' : 'LOW BOOST'}
                </span>
              </div>
            </div>

        </div>
      </div>

    </div>
  );
}