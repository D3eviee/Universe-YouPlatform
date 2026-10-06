import dynamic from 'next/dynamic';

const ProportionalDotGrid = dynamic(() => import('@/components/labs/ProportionalDotGrid'), {
  loading: () => <div className="h-125 w-full bg-gray-50 animate-pulse border-[0.5px] border-spanish-gray my-10" />
});
 
const InternalCombustionCycle = dynamic(() => import('@/components/labs/InternalCombustionCycle'), {
  loading: () => <div className="h-125 w-full bg-gray-50 animate-pulse border-[0.5px] border-spanish-gray my-10" />
});

export const ClientLab = ({ data }: { data: any }) => {
    const { moduleName, props } = data;
    
    switch (moduleName) {
        case "ProportionalDotGrid":
            return <ProportionalDotGrid {...props} />
        case "InternalCombustionCycle":
            return <InternalCombustionCycle />
        default:
            console.warn(`This commponent cannot be rendered - ${moduleName}`);
            return null;
  }
}