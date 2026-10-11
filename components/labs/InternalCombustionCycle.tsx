'use client';
import { useState, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';

const ENGINE_TEXTS = [
  {
    title: '1. Suck (Intake)',
    text: 'First the piston is drawing in an air and fuel mix by moving down the inside of the cylinder and creating a vacuum. This is then filled by the air and fuel mix, which arrives through an inlet valve.',
  },
  {
    title: '2. Squeeze (Compression)',
    text: 'Second the bottom of the stroke of the piston inside the cylinder, the inlet valve closes, so that when the piston moves back up inside the cylinder, the air and fuel mix is squashed. By compressing the air and fuel mix in this way, it becomes more volatile.',
  },
  {
    title: '3. Bang (Combustion)',
    text: 'The third step takes place when right at the top of the stroke inside the cylinder, a spark plug ignites the compressed air and fuel mix, causing an explosion. This explosion immediately propels the piston back down the cylinder.',
  },
  {
    title: '4. Blow (Exhaust)',
    text: 'On the return stroke back up the cylinder, the exhaust valve opens and burned fuel gases are released. This cylinder - now empty can begin the cycle again.',
  }
];

export default function InternalCombustionCycle(){
  const [step, setStep] = useState(0);
  const [rotation, setRotation] = useState(180);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setStep((prev) => (prev + 1) % 4);
        setRotation((prev) => prev + 180);
      }, 2500); // 2.5 sekundy na fazę (pozwala doczytać tekst i zobaczyć akcję)
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleManualStep = (idx: number) => {
    setIsPlaying(false);
    setStep(idx);
    setRotation(180 + idx * 180);
  };

  // Konfiguracja "mechaniczna" dla każdej z faz
  const phasesData = [
    { pistonY: 280, valveLeft: 20, valveRight: 0, color: '#bae6fd' }, // 0: Suck
    { pistonY: 130, valveLeft: 0, valveRight: 0, color: '#3b82f6' },  // 1: Squeeze
    { pistonY: 280, valveLeft: 0, valveRight: 0, color: '#ea580c' },  // 2: Bang
    { pistonY: 130, valveLeft: 0, valveRight: 20, color: '#9ca3af' }, // 3: Blow
  ];

  const currentMechanics = phasesData[step];
  const currentText = ENGINE_TEXTS[step];

  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-4xl p-6 tablet:p-12 flex flex-col laptop:flex-row gap-8 shadow-sm border border-gray-100">
      
      {/* SEKCJA ANIMACJI WEKTOROWEJ (SVG) */}
      <div className="flex-1 w-full bg-[#f8fafc] rounded-3xl p-6 border border-gray-200 shadow-inner flex justify-center items-center">
        <svg viewBox="0 0 400 520" className="w-full max-w-[320px] h-auto drop-shadow-lg">
          <defs>
            <linearGradient id="pistonGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#9ca3af" />
              <stop offset="50%" stopColor="#f3f4f6" />
              <stop offset="100%" stopColor="#9ca3af" />
            </linearGradient>
            
            {/* Groty strzałek */}
            <marker id="arrow-blue" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" />
            </marker>
            <marker id="arrow-gray" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#6b7280" />
            </marker>
          </defs>

          {/* GAZY (Mieszanka wypełniająca cylinder na bieżąco za tłokiem) */}
          <rect 
            x="128" y="120" width="144" height={currentMechanics.pistonY - 120} 
            fill={currentMechanics.color} 
            style={{ transition: 'all 1s ease-in-out' }} 
          />

          {/* BŁYSK ZAPŁONU (Wyzwalany tylko w kroku 2) */}
          {step === 2 && (
            <>
              <circle key={`ping-${rotation}`} cx="200" cy="135" r="25" fill="#facc15" className="animate-ping" style={{ transformOrigin: '200px 135px' }} />
              <circle key={`core-${rotation}`} cx="200" cy="135" r="15" fill="#ffffff" className="animate-pulse" />
            </>
          )}

          {/* STRZAŁKI PRZEPŁYWU POWIETRZA */}
          <path d="M 70 60 Q 135 60 135 100" stroke="#3b82f6" strokeWidth="8" fill="none" markerEnd="url(#arrow-blue)" style={{ transition: 'opacity 0.3s', opacity: step === 0 ? 1 : 0 }} />
          <path d="M 265 100 Q 265 60 330 60" stroke="#6b7280" strokeWidth="8" fill="none" markerEnd="url(#arrow-gray)" style={{ transition: 'opacity 0.3s', opacity: step === 3 ? 1 : 0 }} />

          {/* KORPUS SILNIKA (Blok i Głowica) */}
          <path d="M 120 400 L 120 120 L 150 120 L 150 40 L 90 40" stroke="#374151" strokeWidth="16" strokeLinejoin="round" strokeLinecap="round" fill="none" />
          <path d="M 280 400 L 280 120 L 250 120 L 250 40 L 310 40" stroke="#374151" strokeWidth="16" strokeLinejoin="round" strokeLinecap="round" fill="none" />
          <path d="M 120 400 A 80 80 0 0 0 280 400" stroke="#374151" strokeWidth="16" fill="none" /> {/* Dół karteru */}
          
          {/* Świeca zapłonowa */}
          <path d="M 180 120 L 220 120 L 220 30 L 180 30 Z" fill="#374151" />
          <rect x="192" y="120" width="16" height="10" fill="#d1d5db" /> 

          {/* ZAWÓR SSĄCY (Lewy) */}
          <g style={{ transform: `translateY(${currentMechanics.valveLeft}px)`, transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' }}>
            <line x1="165" y1="20" x2="165" y2="120" stroke="#9ca3af" strokeWidth="6" strokeLinecap="round" />
            <line x1="150" y1="120" x2="180" y2="120" stroke="#9ca3af" strokeWidth="10" strokeLinecap="round" />
          </g>

          {/* ZAWÓR WYDECHOWY (Prawy) */}
          <g style={{ transform: `translateY(${currentMechanics.valveRight}px)`, transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' }}>
            <line x1="235" y1="20" x2="235" y2="120" stroke="#9ca3af" strokeWidth="6" strokeLinecap="round" />
            <line x1="220" y1="120" x2="250" y2="120" stroke="#9ca3af" strokeWidth="10" strokeLinecap="round" />
          </g>

          {/* TŁOK I KORBOWÓD */}
          <g style={{ transform: `translateY(${currentMechanics.pistonY}px)`, transition: 'transform 1s ease-in-out' }}>
            {/* Korbowód podpięty do tłoka */}
            <rect x="188" y="60" width="24" height="200" fill="#6b7280" rx="12" />
            {/* Tłok */}
            <rect x="132" y="0" width="136" height="70" rx="6" fill="url(#pistonGrad)" stroke="#4b5563" strokeWidth="4" />
            <line x1="132" y1="15" x2="268" y2="15" stroke="#4b5563" strokeWidth="3" />
            <line x1="132" y1="25" x2="268" y2="25" stroke="#4b5563" strokeWidth="3" />
            <circle cx="200" cy="40" r="12" fill="#374151" />
          </g>

          {/* WAŁ KORBOWY (Obraca się bez końca na podstawie stanu rotation) */}
          <g style={{ transform: `translate(200px, 420px) rotate(${rotation}deg)`, transition: 'transform 1s ease-in-out' }}>
            <circle cx="0" cy="0" r="60" fill="#cbd5e1" stroke="#4b5563" strokeWidth="8" />
            <circle cx="0" cy="-35" r="15" fill="#374151" />
            <path d="M -40 20 A 50 50 0 0 0 40 20 L 0 0 Z" fill="#94a3b8" />
          </g>

        </svg>
      </div>

      {/* SEKCJA TEKSTOWA I KONTROLKI */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="mb-10 min-h-[220px]">
          <h3 className="text-xs font-bold tracking-[0.2em] text-spanish-gray uppercase mb-3">
            Internal Combustion Cycle
          </h3>
          <h2 className="text-3xl tablet:text-4xl font-serif font-semibold text-dark-black mb-6">
            {currentText.title}
          </h2>
          <p className="text-dark-gray font-light text-base leading-relaxed">
            {currentText.text}
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {/* Pasek Nawigacji (Timeline) */}
          <div className="flex gap-2 w-full">
            {ENGINE_TEXTS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleManualStep(idx)}
                className="relative h-2 flex-1 rounded-full overflow-hidden bg-gray-200 cursor-pointer group"
                aria-label={`Go to phase ${idx + 1}`}
              >
                <div 
                  className={`absolute top-0 left-0 h-full w-full transition-transform duration-700 ${
                    step === idx ? 'translate-x-0 bg-dark-black' : '-translate-x-full bg-gray-400 group-hover:-translate-x-1/2'
                  }`}
                />
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-fit flex items-center justify-center gap-3 py-3 px-8 border-[0.5px] border-dark-black text-dark-black font-medium text-sm rounded-2xl hover:bg-dark-black hover:text-white transition-colors cursor-pointer"
          >
            {isPlaying ? ( <> <Pause size={18} strokeWidth={2} /> Pause Sequence </>) : ( <> <Play size={18} strokeWidth={2} /> Play Auto-Animation </> )}
          </button>
        </div>
      </div>
    </div>
  );
}