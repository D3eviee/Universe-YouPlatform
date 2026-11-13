import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { BlockData } from "@/lib/schemas/blocks";
import type { PredefinedLabId } from "@/lib/constants/labs";

const LabPlaceholder = () => (
  <div className="h-125 w-full bg-gray-50 animate-pulse border-[0.5px] border-spanish-gray my-10" />
);

// Record<PredefinedLabId, …>: a lab in PREDEFINED_LABS without a component here is a compile error
const LABS: Record<PredefinedLabId, ComponentType> = {
  SequentialTwinTurboLab: dynamic(() => import("@/components/labs/SequentialTwinTurboLab"), { loading: LabPlaceholder }),
  CarHandlingLab: dynamic(() => import("@/components/labs/CarHandlingLab"), { loading: LabPlaceholder }),
  TurbochargerLab: dynamic(() => import("@/components/labs/TurbochargerLab"), { loading: LabPlaceholder }),
  InternalCombustionCycle: dynamic(() => import("@/components/labs/InternalCombustionCycle"), { loading: LabPlaceholder }),
  EnginePackagingLab: dynamic(() => import("@/components/labs/EnginePackagingLab"), { loading: LabPlaceholder }),
};

export const ClientPredefinedLab = ({ data }: { data: BlockData<"lab-predefined"> }) => {
  const Lab = LABS[data.moduleName as PredefinedLabId];
  return Lab ? <Lab /> : null;
};