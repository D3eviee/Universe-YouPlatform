import { ReactNode } from "react"

const AsideMenuContainer = ({children}:{children:ReactNode}) => {
  return (
    <aside className="h-full min-w-80 shrink-0 flex-1 flex-col gap-[0.5px] bg-secondary-dark p-3 overflow-scroll">
      {children}
    </aside>
  )
}

export default AsideMenuContainer