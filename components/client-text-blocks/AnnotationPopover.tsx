'use client';
import * as Popover from '@radix-ui/react-popover';
import { ReactNode } from 'react';

type AnnotationPopoverProps = {
  children: ReactNode;
  term: string;
  definition: string;
};

export const AnnotationPopover = ({ children, term, definition }: AnnotationPopoverProps) => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          type="button"
          className="inline-block cursor-pointer underline text-[#B47DB4] transition-colors rounded-md outline-none"
          aria-label={`See definition: ${term}`}
        >
          {children}
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          className="z-50 w-64 p-5 bg-primary rounded-3xl shadow-xs text-sm border-3 border-primary-dark"
          sideOffset={3}
          collisionPadding={16}
        >
          <div className="font-bold text-white mb-1 uppercase text-xs">{term}</div>
          <p className="text-white font-light leading-5">{definition}</p>
          <Popover.Arrow  color="#1E1E1E"/>
        </Popover.Content>
      </Popover.Portal>
      
    </Popover.Root>
  );
};

export default AnnotationPopover;