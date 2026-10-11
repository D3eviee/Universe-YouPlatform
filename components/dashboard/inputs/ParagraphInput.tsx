'use client'
import { useState } from "react"
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'
import { DeleteInputButton } from "./DeleteInputButton"
import { AddAnnotationButton } from "./AddAnnotationButton"
import { AnnotationModal } from "../AnnotationModal"
import useArticleEditorStore from "@/store/ArticleEditorStore"

type ParagraphInputProps = {
  deleteBlockFn: (id: string) => void
  onChange: (newValue: { text: string }) => void
  id: string
  value: { text: string }
}

type EditorModalState = {
  isOpen: boolean;
  mode: 'create' | 'edit';
  term: string;
  definition: string;
  savedRange: Range | null; 
  targetNode: HTMLElement | null; 
}

export const ParagraphInput = ({ deleteBlockFn, onChange, value, id }: ParagraphInputProps) => {
  const activeSelectionBlockId = useArticleEditorStore(s => s.activeSelectionBlockId);
  const hasSelection = activeSelectionBlockId === id;

  const [modal, setModal] = useState<EditorModalState>({
    isOpen: false,
    mode: 'create',
    term: '',
    definition: '',
    savedRange: null,
    targetNode: null
  });

  const handleParagraphChange = (e: ContentEditableEvent) => {
    onChange({ text: e.target.value })
  }

  const handleOpenCreateModal = () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0 || selection.toString().trim().length === 0) return

    const savedRange = selection.getRangeAt(0).cloneRange();
    const selectedText = selection.toString().trim();

    setModal({
      isOpen: true,
      mode: 'create',
      term: selectedText,
      definition: '',
      savedRange,
      targetNode: null
    });
  }

  const handleEditorClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    const markNode = target.closest('mark');

    if (!markNode) return; 

    setModal({
      isOpen: true,
      mode: 'edit',
      term: markNode.getAttribute('data-term') || '',
      definition: markNode.getAttribute('data-definition') || '',
      savedRange: null,
      targetNode: markNode
    });
  }

  const updateZustandStore = () => {
    const editorNode = document.getElementById(`editor-content-${id}`);
    if (editorNode) {
      onChange({ text: editorNode.innerHTML });
    }
  }

  const handleModalSave = (term: string, definition: string) => {
    if (modal.mode === 'create' && modal.savedRange) {
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(modal.savedRange);

      const markHtml = 
        `<mark 
          data-term="${term}" 
          data-definition="${definition}" 
          class="text-sm px-1 py-0.5 bg-[#A05A87] text-white rounded-md cursor-pointer underline"
        >${modal.savedRange.toString()}</mark>`;
      document.execCommand('insertHTML', false, markHtml);

    } else if (modal.mode === 'edit' && modal.targetNode) {
      modal.targetNode.setAttribute('data-term', term);
      modal.targetNode.setAttribute('data-definition', definition);
    }

    updateZustandStore();
    setModal({ ...modal, isOpen: false }); 
  }

  const handleModalDelete = () => {
    if (modal.mode === 'edit' && modal.targetNode) {
      const textNode = document.createTextNode(modal.targetNode.textContent || '');
      modal.targetNode.replaceWith(textNode);
      updateZustandStore();
    }
    setModal({ ...modal, isOpen: false });
  }

  return (
    <div data-block-id={id} className="w-full flex flex-col bg-primary px-2 py-6 rounded-2xl relative">
      <div className="flex flex-row justify-between items-center mb-1">
         <label className="text-gray-400 font-light tracking-wider text-xs leading-none uppercase">Paragraph</label>
         
         <div className="flex flex-row items-center gap-3">
          {hasSelection && <AddAnnotationButton onClick={handleOpenCreateModal}/> }
          <DeleteInputButton onClick={() => deleteBlockFn(id)}/>
         </div>
      </div>
       
      <ContentEditable
        id={`editor-content-${id}`} 
        html={value.text}
        disabled={false}
        onChange={handleParagraphChange}
        onClick={handleEditorClick}
        className="editor-input field-sizing-content w-full bg-transparent outline-none focus:outline-none leading-relaxed text-15 text-white"
        tagName="div"
      />

      {modal.isOpen && (
        <AnnotationModal
          mode={modal.mode}
          initialTerm={modal.term}
          initialDefinition={modal.definition}
          onClose={() => setModal({ ...modal, isOpen: false })}
          onSave={handleModalSave}
          onDelete={handleModalDelete}
        />
      )}
    </div>
  )
}