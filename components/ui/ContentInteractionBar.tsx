import { Bookmark, HeartPlus, MessageSquare, Share } from "lucide-react"

export const ContentInteractionBar = () => {
  return (
    <div className="fixed flex flex-col gap-4 top-70 left-100">
        <div className="flex flex-col justify-center items-center gap-0.5">
            <HeartPlus size={24} strokeWidth={1.5}/>
            <p className="font-light text-xs">0</p>
        </div>

        <div className="flex flex-col justify-center items-center gap-0.5">
            <MessageSquare size={24} strokeWidth={1.5}/>
            <p className="font-light text-xs">0</p>
        </div>

        <div className="flex flex-col justify-center items-center gap-0.5">
            <Bookmark size={24} strokeWidth={1.5}/>
            <p className="font-light text-xs">0</p>
        </div>

        <div className="flex flex-col justify-center items-center gap-0.5">
            <Share size={24} strokeWidth={1.5}/>
        </div>
    </div>
  )
}