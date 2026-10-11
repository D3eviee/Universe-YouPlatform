import dynamic from 'next/dynamic';

const TurbochargerLab = dynamic(() => import('@/components/labs/TurbochargerLab'), {
  loading: () => <div className="h-125 w-full bg-gray-50 animate-pulse border-[0.5px] border-spanish-gray my-10" />
});
 
const SequentialTwinTurboLab = dynamic(() => import('@/components/labs/SequentialTwinTurboLab'), {
  loading: () => <div className="h-125 w-full bg-gray-50 animate-pulse border-[0.5px] border-spanish-gray my-10" />
});

const InternalCombustionCycle = dynamic(() => import('@/components/labs/InternalCombustionCycle'), {
  loading: () => <div className="h-125 w-full bg-gray-50 animate-pulse border-[0.5px] border-spanish-gray my-10" />
});

export const ClientPredefinedLab = ({ data }: {data: { moduleName: string }}) => {
  switch (data.moduleName) {
    case 'SequentialTwinTurboLab':
      return <SequentialTwinTurboLab />;
    case 'TurbochargerLab':
      return <TurbochargerLab />;
    case 'InternalCombustionCycle':
      return <InternalCombustionCycle />;
    default:
      console.warn(`This commponent cannot be rendered - ${data.moduleName}`);
      return null; 
  }
}
