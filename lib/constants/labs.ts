export const PREDEFINED_LABS = [
  { id: "SequentialTwinTurboLab", name: "Sequential Twin-Turbo" },
  { id: "CarHandlingLab", name: "Car Handling Lab" },
  { id: "TurbochargerLab", name: "Turbocharger (Flow & Lag)" },
  { id: "InternalCombustionCycle", name: "Internal Combustion Cycle" },
  { id: "EnginePackagingLab", name: "Engine Layout (V12 vs RWD)" },
] as const;

export type PredefinedLabId = (typeof PREDEFINED_LABS)[number]["id"];
export const PREDEFINED_LAB_IDS = PREDEFINED_LABS.map((l) => l.id) as [PredefinedLabId, ...PredefinedLabId[]];