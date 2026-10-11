'use client';

import { useState } from 'react';
import { Play, RotateCcw } from 'lucide-react';

type LayoutMode = 'FR' | 'MR' | 'RR';

const LAYOUTS = {
  FR: {
    id: 'FR',
    name: 'Klasyczny (Front-Engine)',
    bias: '55% Przód / 45% Tył',
    handling: 'Podsterowność (Płużenie)',
    description: 'Przy skręcie przednie opony nie wytrzymują naporu masy silnika. Mimo skręconych kół auto bezwładnie ignoruje zakręt, wyjeżdżając szeroko na zewnątrz (Understeer).',
    enginePosition: 'top-2',
    cogPosition: 'top-[30%]',
    color: '#3b82f6',
    // Ścieżka wyrzuca auto na zewnątrz zakrętu
    path: 'M 350 500 L 350 300 Q 350 80 200 10 L -20 -50',
  },
  MR: {
    id: 'MR',
    name: 'Centralny (Mid-Engine)',
    bias: '45% Przód / 55% Tył',
    handling: 'Neutralność (Idealna Linia)',
    description: 'Rozwiązanie z Miury. Masa skupiona w centrum sprawia, że auto idealnie słucha kierownicy, gładko pokonując zakręt optymalnym, wyścigowym torem.',
    enginePosition: 'top-1/2 -translate-y-1/2',
    cogPosition: 'top-1/2 -translate-y-1/2',
    color: '#10b981',
    // Ścieżka idealnie wyprofilowana
    path: 'M 350 500 L 350 300 Q 350 100 150 100 L -50 100',
  },
  RR: {
    id: 'RR',
    name: 'Tylny (Rear-Engine)',
    bias: '35% Przód / 65% Tył',
    handling: 'Nadsterowność (Poślizg)',
    description: 'Ciężki tył zachowuje się w zakręcie jak wahadło. Siła odśrodkowa wyrywa tylną oś, powodując głęboki uślizg (Drift), a bez kontry – całkowity obrót (Spin).',
    enginePosition: 'bottom-2',
    cogPosition: 'bottom-[20%]',
    color: '#ef4444',
    // Ścieżka gwałtownie zacieśniająca do środka
    path: 'M 350 500 L 350 300 Q 300 200 150 180 L 20 220',
  }
};

export const CarHandlingLab = () => {
  const [layout, setLayout] = useState<LayoutMode>('MR');
  const [isPlaying, setIsPlaying] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const activeData = LAYOUTS[layout];

  const handlePlay = () => {
    setIsPlaying(false);
    setTimeout(() => {
      setIsPlaying(true);
      setAnimationKey(prev => prev + 1);
    }, 30);
  };

  const changeLayout = (mode: LayoutMode) => {
    setLayout(mode);
    setIsPlaying(false);
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-4 font-sans">
      
      <div className="bg-white border border-gray-200 rounded-3xl p-6 tablet:p-8 flex flex-col">
        <h2 className="text-2xl tablet:text-3xl font-serif font-semibold text-dark-black mb-1">
          Dynamika w Zakręcie (Środek Ciężkości)
        </h2>
        <p className="text-dark-gray font-light text-sm">
          Zaobserwuj, jak zmiana balansu masy wpływa na bezwładność auta przy dużej prędkości.
        </p>
      </div>

      {/* ZAKŁADKI (TABS) */}
      <div className="bg-white border border-gray-200 rounded-full p-1.5 flex flex-col tablet:flex-row shadow-sm">
        {(Object.keys(LAYOUTS) as LayoutMode[]).map((mode) => (
          <button
            key={mode}
            onClick={() => changeLayout(mode)}
            className={`flex-1 py-3 text-sm font-medium rounded-full transition-all cursor-pointer ${
              layout === mode ? 'bg-dark-black text-white shadow-md' : 'text-dark-gray hover:bg-slate-100'
            }`}
          >
            {LAYOUTS[mode].name}
          </button>
        ))}
      </div>

      <div className="flex flex-col laptop:flex-row gap-4">
        
        {/* LEWA STRONA: ANIMACJA I TOR */}
        <div className="flex-1 bg-[#f8fafc] border border-gray-200 rounded-3xl overflow-hidden relative shadow-inner min-h-[500px] flex items-center justify-center">
          
          {/* FIZYKA CSS (Motion Path + Niezależne obroty) */}
          <style>{`
            /* 1. Perfekcyjnie gładki ruch po wektorowej ścieżce */
            .drive-path {
              animation: followPath 3.2s cubic-bezier(0.3, 0.0, 0.2, 1) forwards;
              offset-rotate: auto 90deg; /* Auto dostosowuje kąt do krzywizny toru */
            }
            @keyframes followPath {
              0%   { offset-distance: 0%; }
              100% { offset-distance: 100%; }
            }

            /* 2. Rotacje karoserii (Slip angle - uślizg względem toru) */
            .slip-MR { animation: slip-MR-anim 3.2s cubic-bezier(0.3, 0.0, 0.2, 1) forwards; }
            .slip-FR { animation: slip-FR-anim 3.2s cubic-bezier(0.3, 0.0, 0.2, 1) forwards; }
            .slip-RR { animation: slip-RR-anim 3.2s cubic-bezier(0.3, 0.0, 0.2, 1) forwards; }

            @keyframes slip-MR-anim {
              0%, 100% { transform: rotate(0deg); } /* Czysta jazda */
            }
            @keyframes slip-FR-anim {
              0%, 45% { transform: rotate(0deg); }
              70% { transform: rotate(-30deg); } /* Obrót w stronę zakrętu, podczas gdy auto sunie prosto */
              100% { transform: rotate(-40deg); }
            }
            @keyframes slip-RR-anim {
              0%, 45% { transform: rotate(0deg); }
              60% { transform: rotate(-60deg); } /* Gwałtowne puszczenie tyłu */
              80% { transform: rotate(-130deg); } /* Głęboki drift */
              100% { transform: rotate(-170deg); } /* Spin */
            }

            /* 3. Praca kół kierowniczych */
            .steer-MR { animation: steer-MR-anim 3.2s cubic-bezier(0.3, 0.0, 0.2, 1) forwards; }
            .steer-FR { animation: steer-FR-anim 3.2s cubic-bezier(0.3, 0.0, 0.2, 1) forwards; }
            .steer-RR { animation: steer-RR-anim 3.2s cubic-bezier(0.3, 0.0, 0.2, 1) forwards; }

            @keyframes steer-MR-anim {
              0%, 35% { transform: rotate(0deg); }
              55%, 80% { transform: rotate(-25deg); } /* Czysty skręt */
              100% { transform: rotate(0deg); }
            }
            @keyframes steer-FR-anim {
              0%, 35% { transform: rotate(0deg); }
              55%, 100% { transform: rotate(-35deg); } /* Paniczne dokręcanie do oporu */
            }
            @keyframes steer-RR-anim {
              0%, 35% { transform: rotate(0deg); }
              45% { transform: rotate(-20deg); } /* Inicjacja zakrętu */
              60%, 100% { transform: rotate(40deg); } /* GŁĘBOKA KONTRA w prawo! */
            }

            /* Pojawianie się alertu */
            .alert-show {
              animation: pop-in 0.4s 1.8s cubic-bezier(0.3, 0.0, 0.2, 1) both;
            }
            @keyframes pop-in {
              0% { opacity: 0; transform: scale(0.8); }
              100% { opacity: 1; transform: scale(1); }
            }
          `}</style>

          <div className="relative w-[500px] h-[500px]">
            {/* Tło */}
            <div className="absolute inset-0 opacity-20 pointer-events-none" 
                 style={{ backgroundImage: 'linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)', backgroundSize: '25px 25px' }} />

            {/* ELEMENTY DROGI (SVG) - Minimalistyczne */}
            <svg viewBox="0 0 500 500" className="absolute inset-0 w-full h-full pointer-events-none">
              <path d="M 425 550 L 425 300 Q 425 25 150 25 L -50 25 L -50 175 Q 275 175 275 300 L 275 550" fill="#e2e8f0" opacity="0.3" />
              <path d="M 425 550 L 425 300 Q 425 25 150 25 L -50 25" fill="none" stroke="#94a3b8" strokeWidth="2" />
              <path d="M 275 550 L 275 300 Q 275 175 150 175 L -50 175" fill="none" stroke="#94a3b8" strokeWidth="2" />
              
              {/* Tarka krawężnika */}
              <path d="M 273 185 Q 185 185 185 273" fill="none" stroke="#ef4444" strokeWidth="10" strokeDasharray="16 16" opacity="0.8" />
              <path d="M 273 185 Q 185 185 185 273" fill="none" stroke="#ffffff" strokeWidth="10" strokeDasharray="0 16 16 0" opacity="0.8" />

              {/* JEDNA LINIA - Aktualna ścieżka dla wybranego układu */}
              <path 
                d={activeData.path} 
                fill="none" 
                stroke={activeData.color} 
                strokeWidth="3" 
                strokeDasharray="8 8" 
                opacity="0.4"
                style={{ transition: 'stroke 0.4s ease' }}
              />
            </svg>

            {/* MODEL SAMOCHODU */}
            <div 
              key={animationKey}
              className={`absolute top-0 left-0 z-10 ${isPlaying ? 'drive-path' : ''}`}
              style={{ 
                offsetPath: `path('${activeData.path}')`,
                offsetDistance: '0%', // Pozycja startowa
                marginLeft: '-18px', // Centrowanie bryły
                marginTop: '-36px'
              }}
            >
              {/* Wewnętrzny kontener obsługujący kąt uślizgu */}
              <div className={`relative w-[36px] h-[72px] bg-white border-2 border-slate-400 rounded-xl shadow-xl flex flex-col items-center ${isPlaying ? `slip-${layout}` : ''}`}>
                
                {/* PRZEDNIE KOŁA (Niezależna animacja skrętu/kontry) */}
                <div className={`absolute -left-1.5 top-2 w-[7px] h-[15px] bg-slate-900 rounded-sm origin-center ${isPlaying ? `steer-${layout}` : ''}`} />
                <div className={`absolute -right-1.5 top-2 w-[7px] h-[15px] bg-slate-900 rounded-sm origin-center ${isPlaying ? `steer-${layout}` : ''}`} />
                
                {/* Tylne koła */}
                <div className="absolute -left-1.5 bottom-2.5 w-[7px] h-[16px] bg-slate-900 rounded-sm" />
                <div className="absolute -right-1.5 bottom-2.5 w-[7px] h-[16px] bg-slate-900 rounded-sm" />

                {/* Szyby */}
                <div className="absolute top-[35%] w-[82%] h-[25%] bg-slate-100 border border-slate-300 rounded-md opacity-80" />

                {/* SILNIK V12 (Ruchomy ciężar) */}
                <div 
                  className={`absolute w-[20px] h-[24px] rounded-md shadow-inner transition-all duration-700 ease-in-out z-10 flex items-center justify-center ${activeData.enginePosition}`}
                  style={{ backgroundColor: activeData.color }}
                >
                  <span className="text-[7px] font-bold text-white tracking-tighter">V12</span>
                </div>

                {/* ŚRODEK CIĘŻKOŚCI (CoG) */}
                <div className={`absolute w-3 h-3 rounded-full border-2 border-dark-black flex items-center justify-center transition-all duration-700 ease-in-out z-20 bg-white/90 ${activeData.cogPosition}`}>
                  <div className="w-1.5 h-1.5 bg-dark-black rounded-full" />
                </div>
              </div>
            </div>

            {/* ALERT UI (Pokazuje się w momencie utraty przyczepności) */}
            {isPlaying && layout !== 'MR' && (
              <div className="absolute top-[30%] left-[30%] pointer-events-none alert-show z-30">
                <div className={`text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg font-mono tracking-wide ${layout === 'FR' ? 'bg-blue-500/90' : 'bg-red-500/90'}`}>
                  {layout === 'FR' ? '⚠️ UTRATA PRZYCZEPNOŚCI PRZODU' : '🔄 OBRÓT (SPIN)'}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* PRAWA STRONA: PANEL INFORMACYJNY */}
        <div className="w-full laptop:w-[380px] bg-white border border-gray-200 rounded-3xl p-6 tablet:p-8 flex flex-col justify-between shadow-sm">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full shadow-md transition-colors duration-500" style={{ backgroundColor: activeData.color }} />
              <h2 className="text-xl font-serif font-semibold text-dark-black leading-tight">
                {activeData.handling}
              </h2>
            </div>

            <div className="flex flex-col gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <div className="flex flex-col border-b border-gray-200 pb-3">
                <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-spanish-gray mb-1">
                  Rozkład Masy
                </span>
                <span className="font-mono text-dark-black text-sm font-medium">
                  {activeData.bias}
                </span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-spanish-gray mb-2">
                  Zjawisko Fizyczne
                </span>
                <p className="text-dark-gray font-light text-[13px] leading-relaxed">
                  {activeData.description}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={handlePlay}
            className="mt-8 flex items-center justify-center gap-2 bg-dark-black text-white w-full py-4 rounded-2xl hover:bg-black/80 transition-colors shadow-md group cursor-pointer"
          >
            {isPlaying ? (
              <RotateCcw size={18} className="text-white/70 group-hover:text-white transition-all duration-300 group-hover:rotate-[-45deg]" />
            ) : (
              <Play size={18} className="text-white/70 group-hover:text-white transition-colors" />
            )}
            <span className="font-medium tracking-wide">
              {isPlaying ? 'Resetuj' : 'Wejdź w Zakręt'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}