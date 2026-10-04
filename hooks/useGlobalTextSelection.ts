'use client'
import { useEffect } from 'react';
import useArticleEditorStore from '@/store/ArticleEditorStore';

export const useGlobalTextSelection = () => {
  const setActiveSelectionBlockId = useArticleEditorStore(s => s.setActiveSelectionBlockId);

  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      
      if (!selection || selection.isCollapsed || selection.toString().trim().length === 0) {
        setActiveSelectionBlockId(null);
        return;
      }

      const node = selection.anchorNode;
      if (!node) return;

      const element = node.nodeType === Node.TEXT_NODE ? node.parentElement : (node as HTMLElement);
      const blockWrapper = element?.closest('[data-block-id]');
      
      if (blockWrapper) {
        setActiveSelectionBlockId(blockWrapper.getAttribute('data-block-id'));
      } else {
        setActiveSelectionBlockId(null);
      }
    };

    document.addEventListener('selectionchange', handleSelection);
    return () => document.removeEventListener('selectionchange', handleSelection);
  }, [setActiveSelectionBlockId]);
};