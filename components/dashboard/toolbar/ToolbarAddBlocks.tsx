import { BlockType } from '@/types'
import { ToolbarButton } from './ToolbarButton'
import { ReactNode } from 'react'

const TOOLBAR_TOOLS:{type: BlockType, icon: ReactNode}[] = [
    {
        type: "paragraph",
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1887FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 6h16"/>
            <path d="M4 12h16"/>
            <path d="M4 18h9"/>
        </svg>
    },{
       type: "image",
         icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1887FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
            <circle cx="9" cy="9" r="2"/>
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
        </svg>
    },{
    type: "gallery",
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1887FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
            <path d="M18 22H4a2 2 0 0 1-2-2V6" />
            <path d="m22 13-1.296-1.296a2.41 2.41 0 0 0-3.408 0L11 18" />
            <circle cx="12" cy="8" r="2" />
            <rect width="16" height="16" x="6" y="2" rx="2" />
        </svg>
    )},{
        type: "highlight",
        icon:
        <svg xmlns="http://www.w3.org/2000/svg" width="24"  height="24" viewBox="0 0 24 24" fill="none" stroke="#1887FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4"/>
            <path d="m9 11-6 6v3h9l3-3"/>
        </svg>
    },{
        type: "quote",
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1887FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 21V3"/>
            <path d="M8 6h13"/>
            <path d="M8 12h13"/>
            <path d="M8 18h9"/>
        </svg>
    },{
        type: "equation",
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1887FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 7V4H6l6 8-6 8h12v-3"/>
        </svg>
    },{
        type: "heading",
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1887FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
            <path d="M6 4v16" />
            <path d="M18 4v16" />
            <path d="M6 12h12" />
        </svg>
    },{
        type: "sources",
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1887FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 17H7A5 5 0 0 1 7 7h2"/>
            <path d="M15 7h2a5 5 0 1 1 0 10h-2"/>
            <line x1="8" x2="16" y1="12" y2="12"/>
        </svg>
    },
    {
        type: "lab",
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1887FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a2.18 2.18 0 0 0 1.934 3.45h10.692a2.18 2.18 0 0 0 1.934-3.45l-5.069-10.127A2 2 0 0 1 14 9.527V2" />
            <path d="M8.5 2h7" />
            <path d="M14 16H6.3" />
        </svg>
    },
    {
        type: "lab-predefined",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1887FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <rect width="18" height="14" x="3" y="8" rx="2" />
                <path d="M10 8V5a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v3" />
                <path d="M18 8V5a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3" />
            </svg>
        )
    }
  ]

export const ToolbarAddBlocks = ({store}:{store: "articles" | "books"}) => {
    return (
        <div className="flex flex-row gap-3">
            { TOOLBAR_TOOLS.map(tool => (
                <ToolbarButton type={tool.type} key={tool.type} store={store}>
                    {tool.icon}
                </ToolbarButton>
            )) }
        </div>
    )
}